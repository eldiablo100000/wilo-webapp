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
  <!-- start map -->
  <div style="height: 100%; width: 100%;  ">
     <vl-map ref="map" v-if="showMap" data-projection="EPSG:4326" renderer="webgl">
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
  </div>
</template>

<script>

import axios from 'axios'
const features = [
]

export default {
  name: 'ShowFloor',
  data () {
    return {
      floor: {},
      building: [],
      errors: [],
      floorList: '',
      geocoder: undefined,
      scaleX: undefined,
      scaleY: undefined,
      // maxResolution: 5,
      zoom: 5,
      // maxZoom: 8,
      center: [0, 0],
      rotation: 0,
      features,
      showMap: true,
      image: false,
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
    this.floorList = '#/building/' + this.$route.params.id_building + '/floors'
    this.floorId = this.$route.params.id_floor
    axios.get(`http://localhost:3000/floor/` + this.floorId)
      .then((response) => {
        if (response.data != null) {
          // console.log(response.data.location)
          for (var t in response.data.location) {
            // var tmp = {
            //   id: response.data._id + t,
            //   type: 'Feature',
            //   properties: null,
            //   geometry: {
            //     type: 'Point',
            //     coordinates: response.data.location[t]
            //   }
            // }
            // // console.log(tmp)
            // this.features.push(tmp)
            this.coordinates = response.data.location[t]
            break
          }
          this.floor = response.data
          this.imgRotation = response.data.angleImage * Math.PI / 180
          this.imgScaleValue = [response.data.widthImage * response.data.scaleX, response.data.heightImage * response.data.scaleY]
          console.log('ciao')
          this.scaleX = response.data.scaleX
          this.scaleY = response.data.scaleY
          this.image = true
          axios.get(`http://localhost:3000/image/` + response.data.image[0])
            .then((response) => {
              console.log(response)
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
      axios.delete('http://localhost:3000/floor/' + floorid)
        .then((result) => {
          axios.get('http://localhost:3000/building/' + this.$route.params.id_building)
            .then((result) => {
              var index = result.data.floors.indexOf(floorid)
              if (index > -1) {
                result.data.floors.splice(index, 1)
                this.building = result.data
              }
              axios.put('http://localhost:3000/building/' + this.$route.params.id_building, this.building)
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
  }
}
</script>

<style>
  .jumbotron {
    padding: 2rem;
  }
</style>
