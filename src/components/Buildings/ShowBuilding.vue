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
            <!-- Title: {{building.title}}<br> -->
            City: {{building.city}}<br>
            Number: {{building.number}}<br>
            Road: {{building.road}}<br>
            Postcode: {{building.postcode}}<br>
            Country: {{building.country}}<br>
            Floors: {{numbers}}<br>
            Description: {{building.description}}<br>
          </template>
          <!-- start map -->
          <div style="height: 100%; width: 100%;  ">
             <vl-map ref="map" v-if="showMap" data-projection="EPSG:3857" renderer="webgl">
                <vl-view :center.sync="center" :rotation.sync="rotation" :zoom.sync="zoom"  />
                <vl-layer-tile>
                   <vl-source-osm />
                </vl-layer-tile>
                <vl-feature v-if="imgStatic && image" id="static-image">
                   <vl-geom-point :coordinates="coordinates" :z-index="3"></vl-geom-point>
                   <vl-style-box>
                      <vl-style-icon :src="imgSrc" :size="imgScaleValue" :anchor="imgAnchor" :rotation.sync="imgRotation"></vl-style-icon>
                   </vl-style-box>
                </vl-feature>
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

import axios from 'axios'
const features = [
]

export default {
  name: 'ShowBuilding',

  data () {
    return {
      building: [],
      floors: [],
      numbers: [],
      errors: [],
      user: {},
      userId: '',
      buildingId: '',
      checked: false,
      state: 'required',
      floorList: '',
      geocoder: undefined,
      // maxResolution: 5,
      zoom: 19,
      center: [0, 0],
      rotation: 0,
      features,
      image: false,
      showMap: true,
      scaleX: undefined,
      scaleY: undefined,
      imgSize: [],
      imgExtent: [],
      imgCenter: undefined,
      imgRotation: 0,
      imgScaleValue: 0.4,
      imgAnchor: [0, 0],
      imgStatic: true,
      coordinates: [],
      imgSrc: ''
    }
  },
  created () {
    this.features = []
    axios.get(`http://localhost:3000/building/` + this.$route.params.id_building)
      .then(response => {
        if (response.data != null) {
          this.building = response.data
          console.log(response.data)
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
            axios.get(`http://localhost:3000/floor/` + response.data.floors[el])
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
      axios.delete('http://localhost:3000/building/' + buildingid)
        .then((result) => {
          axios.get('http://localhost:3000/user/' + this.$cookies.get('user')._id)
            .then(result => {
              var index = result.data.buildings.indexOf(buildingid)
              if (index > -1) {
                result.data.buildings.splice(index, 1)
                this.user = result.data
              }
              axios.put('http://localhost:3000/user/' + this.$cookies.get('user')._id, this.user)
                .then(result => {
                  this.$router.push({
                    name: 'BuildingList'
                  })
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
  }
}
</script>

<style>
  .jumbotron {
    padding: 2rem;
  }
</style>
