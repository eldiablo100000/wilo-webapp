<template>
  <div>
    <b-row>
      <b-col cols="12">
        <h2>
          Show Building
          <b-link @click.stop="GoToBuildingList()">(Building List)</b-link>
        </h2>
        <b-jumbotron>
          <template slot="header">
            {{building.title}}
          </template>
          <template slot="lead">
            City: {{building.city}}<br>
            Number: {{building.number}}<br>
            Road: {{building.road}}<br>
            Postcode: {{building.postcode}}<br>
            Country: {{building.country}}<br>
            Floors: {{numbers}}<br>
            Description: {{building.description}}<br>
          </template>
          <!-- start map -->
          <div style="height: 70%; width: 70%; margin: 0 auto; ">
             <vl-map ref="map" v-if="showMap" data-projection="EPSG:3857" renderer="webgl">
                <vl-view :center.sync="center" :rotation.sync="rotation" :zoom.sync="zoom"  />
                <vl-layer-tile>
                   <vl-source-osm />
                </vl-layer-tile>
                <vl-layer-vector id="features" >
                   <vl-source-vector :features.sync="features" />
                </vl-layer-vector>
                <template v-for="(item, index) in features">
                   <vl-feature :key="index">
                      <vl-geom-point :coordinates="item.geometry.coordinates" :z-index="3"></vl-geom-point>
                      <vl-style-box>
                         <vl-style-icon src="static/marker.png" :scale="0.4" :anchor="[0.5, 1]"></vl-style-icon>
                      </vl-style-box>
                   </vl-feature>
                </template>
             </vl-map>
          </div>
          <!-- end map -->
          <hr class="my-4">
          <p>
            Updated Date: {{building.updated_date}}
          </p>
          <b-btn variant="success" @click.stop="addfloor(building._id)">Add Floor</b-btn>
          <b-btn variant="warning" @click.stop="floorlist(building._id)">Floor List</b-btn>

          <b-btn variant="success" @click.stop="editbuilding(building._id)">Edit</b-btn>
          <b-btn variant="danger" @click.stop="deletebuilding(building._id)">Delete</b-btn>
        </b-jumbotron>
      </b-col>
    </b-row>
  </div>
</template>

<script>
const features = [
]

export default {
  name: 'ShowBuilding',

  data () {
    return {
      building: {},
      buildingId: '',
      center: [0, 0],
      coordinates: [],
      errors: [],
      features,
      floorList: '',
      floors: [],
      geocoder: undefined,
      numbers: [],
      rotation: 0,
      showMap: true,
      state: 'required',
      user: {},
      userId: '',
      zoom: 19
    }
  },
  methods: {
    GoToBuildingList () {
      this.$router.push({
        name: 'BuildingList'
      })
    },
    addfloor (buildingid) {
      this.$router.push({
        name: 'CreateFloor',
        params: { id_building: buildingid }
      })
    },
    floorlist (buildingid) {
      this.$router.push({
        name: 'FloorList',
        params: { id_building: buildingid }
      })
    },
    editbuilding (buildingid) {
      this.$router.push({
        name: 'EditBuilding',
        params: { id_building: buildingid }
      })
    },
    deletebuilding (buildingid) {
      for (var i in this.floors) {
        for (var j in this.floors[i].anchors) {
          this.$http.delete('http://localhost:3000/api/anchor/' + this.floors[i].anchors[j])
            .then(response => {
            })
            .catch(e => {
              this.errors.push(e)
            })
        }
        this.$http.delete('http://localhost:3000/api/image/' + this.floors[i].image)
          .then(response => {
          })
          .catch(e => {
            this.errors.push(e)
          })
      }
      for (var k in this.building.floors) {
        this.$http.delete('http://localhost:3000/api/floor/' + this.building.floors[k])
          .then(response => {
          })
          .catch(e => {
            this.errors.push(e)
          })
      }
      this.$http.delete('http://localhost:3000/api/building/' + buildingid)
        .then((result) => {
          this.$http.get('http://localhost:3000/auth/user/' + this.building.id_user)
            .then(result => {
              var index = result.data.user.buildings.indexOf(buildingid)
              if (index > -1) {
                result.data.user.buildings.splice(index, 1)
                this.user = result.data.user
              }
              this.$http.put('http://localhost:3000/auth/user/' + this.building.id_user, this.user)
                .then(result => {
                  if (this.building.id_user === JSON.parse(localStorage.getItem('user'))._id) {
                    this.$router.push({
                      name: 'BuildingList'
                    })
                  } else {
                    this.$router.push({
                      name: 'AdminBuildingList'
                    })
                  }
                })
                .catch(e => {
                  this.errors.push(e)
                })
            })
            .catch(e => {
              this.errors.push(e)
            })
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  },
  created () {
    this.features = []
    this.$http.get(`http://localhost:3000/api/building/` + this.$route.params.id_building)
      .then(response => {
        if (response.data != null) {
          this.building = response.data
          var tmp = {
            id: response.data.title,
            type: 'Feature',
            properties: null,
            geometry: {
              type: 'Point',
              coordinates: response.data.coordinates
            }
          }
          this.center = response.data.coordinates
          this.features.push(tmp)
          for (var el in response.data.floors) {
            this.$http.get(`http://localhost:3000/api/floor/` + response.data.floors[el])
              .then(response => {
                this.floors.push(response.data)
                this.numbers.push(response.data.number)
              })
              .catch(e => {
                this.errors.push(e)
              })
          }
        }
      })
      .catch(e => {
        this.errors.push(e)
      })
  }
}
</script>

<style>
  .jumbotron {
    padding: 2rem;
  }
</style>
