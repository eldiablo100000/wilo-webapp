<template>
  <div>
    <b-row>
      <b-col cols="12">
        <h2>
          Show Floor
          <b-link :href="floorList">(Floor List)</b-link>
        </h2>
        <b-jumbotron>
          <template slot="header">
            {{floor.number}}
          </template>
          <template slot="lead">
            number: {{floor.number}}<br>
          </template>
          <hr class="my-4">
          <p>
            Updated Date: {{floor.updated_date}}
          </p>
          <b-btn variant="success" @click.stop="addanchor(floor._id)">Add Anchor</b-btn>
          <b-btn variant="success" @click.stop="anchorlist(floor._id)">Anchor list</b-btn>
          <b-btn variant="success" @click.stop="editfloor(floor._id)">Edit</b-btn>
          <b-btn variant="danger" @click.stop="deletefloor(floor._id)">Delete</b-btn>
        </b-jumbotron>
      </b-col>
    </b-row>
    <div style="height: 80%; width: 80%; margin: 0 auto;  ">
     <vl-map ref="map" v-if="showMap" data-projection="EPSG:3857" renderer="webgl">
        <vl-view :center.sync="center" :rotation.sync="rotation" :zoom.sync="zoom"  />
        <vl-layer-tile>
           <vl-source-osm />
        </vl-layer-tile>
        <vl-feature v-if="imgStatic && image" id="static-image">
           <vl-geom-point :coordinates="coordinates" :z-index="3"></vl-geom-point>
           <vl-style-box>
              <vl-style-icon id="image" :src="imgSrc" :opacity="0.6" :scale.sync="imgScale" :anchor="imgAnchor" :rotation.sync="imgRotation"></vl-style-icon>
           </vl-style-box>
        </vl-feature>

        <vl-layer-vector id="features" >
            <vl-source-vector :features.sync="features" />
          </vl-layer-vector>
          <template v-for="(item, index) in features">
            <vl-feature :key="index" >
              <vl-geom-point :coordinates="item.geometry.coordinates" :z-index="3"></vl-geom-point>
              <vl-style-box>
                <vl-style-icon src="static/marker.png" :scale="0.4" :anchor="[0.5, 1]"></vl-style-icon>
              </vl-style-box>
            </vl-feature>
          </template>
     </vl-map>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShowFloor',
  data () {
    return {
      building: {},
      center: [0, 0],
      coordinates: [],
      errors: [],
      features: [],
      floor: {},
      floorList: '',
      geocoder: undefined,
      image: false,
      imgAnchor: [0, 0],
      imgCenter: undefined,
      imgExtent: [],
      imgRotation: 0,
      imgSize: [],
      imgSrc: '',
      imgScale: undefined,
      realImgScale: undefined,
      imgStatic: true,
      rotation: 0,
      showMap: true,
      zoom: undefined,
      precedentZoom: null
    }
  },
  created () {
    this.floorList = '#/building/' + this.$route.params.id_building + '/floors'
    this.floorId = this.$route.params.id_floor
    this.$http.get(`http://localhost:3000/api/floor/` + this.floorId)
      .then((response) => {
        if (response.data != null) {
          this.imgRotation = response.data.angleImage * Math.PI / 180
          this.coordinates = response.data.location
          this.center = response.data.center
          this.floor = response.data
          this.zoom = response.data.zoom
          this.imgSize = [response.data.widthImage, response.data.heightImage]
          this.imgScale = response.data.scaleX
          this.realImgScale = response.data.scaleX
          this.image = true

          for (var i in response.data.anchors) {
            this.$http.get(`http://localhost:3000/api/anchor/` + response.data.anchors[i])
              .then(response => {
                var type = 'Point'
                var coord = null
                var marker =
                {
                  type: 'Feature',
                  id: 'feature-' + type + '-' + response.data._id,
                  properties: {},
                  geometry: {
                    type: type
                  }
                }
                coord = response.data.location
                marker.geometry.coordinates = coord
                this.features.push(marker)
              })
              .catch(e => {
                this.errors.push(e)
              })
          }
          this.$http.get(`http://localhost:3000/api/image/` + response.data.image[0])
            .then((response) => {
              if (response.data != null) {
                var tmp = response.data.path.replace('dist/', '')
                this.imgSrc = 'http://localhost:3000/' + tmp
              }
            })
            .catch(e => {
              this.errors.push(e)
            })
        }
      })
      .catch(e => {
        this.errors.push(e)
      })
  },
  methods: {
    editfloor (floorid) {
      this.$router.push({
        name: 'EditFloor',
        params: { id_floor: floorid }
      })
    },
    addanchor (floorid) {
      this.$router.push({
        name: 'CreateAnchor',
        params: { id_building: this.$route.params.id_building, id_floor: floorid }
      })
    },
    anchorlist (floorid) {
      this.$router.push({
        name: 'AnchorList',
        params: { id_building: this.$route.params.id_building, id_floor: floorid }
      })
    },
    deletefloor (floorid) {
      for (var i in this.floor.anchors) {
        this.$http.delete('http://localhost:3000/api/anchor/' + this.floor.anchors[i])
          .then(response => {
          })
          .catch(e => {
            this.errors.push(e)
          })
      }
      this.$http.delete('http://localhost:3000/api/floor/' + floorid)
        .then((result) => {
          this.$http.get('http://localhost:3000/api/building/' + this.$route.params.id_building)
            .then((result) => {
              var index = result.data.floors.indexOf(floorid)
              if (index > -1) {
                result.data.floors.splice(index, 1)
                this.building = result.data
              }
              this.$http.put('http://localhost:3000/api/building/' + this.$route.params.id_building, this.building)
                .then((result) => {
                  this.$router.push({
                    name: 'FloorList'
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
  },
  watch: {
    zoom: function (val) {
      this.imgScale = this.realImgScale
      if (this.precedentZoom !== null) {
        if (this.precedentZoom < this.zoom) {
          this.realImgScale = this.realImgScale * 2
          this.imgScale = this.imgScale * 2
        } else {
          this.imgScale = this.imgScale / 2
          this.realImgScale = this.realImgScale / 2
        }
        if (this.realImgScale < 0.00000000001) this.imgScale = 0.03
      }
      this.precedentZoom = this.zoom
    }
  }
}
</script>

<style>
  .jumbotron {
    padding: 2rem;
  }
</style>
