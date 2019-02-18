<template>
  <div>
    <b-row>
      <b-col cols="12">
        <h2>
          Add Anchor
          <b-link :href="anchorList">(Anchor List)</b-link>
        </h2>
        <b-form @submit="onSubmit">
          <b-form-group id="fieldsetHorizontal"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    label="Enter Name">
            <b-form-input id="name" :state="state" v-model.trim="anchor.name"></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary">Save</b-button>
        </b-form>
      </b-col>
    </b-row>
    <!-- start map -->
    <button @click="drawType = 'Point'">Draw point</button>
    <div v-if="drawType != null && drawAnchor.length > 0" style="background-color: rgba(18, 169, 10, 0.5);">
      <p><b>Type</b>: {{ drawAnchor[drawAnchor.length - 1].type }}</p>
      <p><b>Id</b>: {{ drawAnchor[drawAnchor.length - 1].id }}</p>
      <p><b>Geom-Type</b>: {{ drawAnchor[drawAnchor.length - 1].geometry.type }}</p>
      <p><b>Geom-Coords</b>: {{ drawAnchor[drawAnchor.length - 1].geometry.coordinates }}</p>
      <p><b>Geom-Props</b>: {{ drawAnchor[drawAnchor.length - 1].geometry.properties }}</p>
    </div>
    <div style="height: 100%; width: 100%;  ">
       <vl-map ref="map" v-if="showMap" data-projection="EPSG:3857" renderer="webgl">
          <vl-view :center.sync="center" :rotation.sync="rotation" :zoom.sync="zoom"  />
          <vl-layer-tile>
             <vl-source-osm />
          </vl-layer-tile>
          <vl-layer-vector id="draw-pane" :z-index="0">
          <vl-source-vector :features.sync="drawAnchor" ident="draw-target" />
        </vl-layer-vector>
          <vl-feature v-if="selectedFeatures.length == 1" :properties="{ start: Date.now(), duration: 2500 }">
            <vl-geom-point :coordinates="selectedFeatures[0].geometry.coordinates" :z-index="3"></vl-geom-point>
          </vl-feature>
          <!-- <vl-geoloc @update:position="geolocPosition = $event">
            <template slot-scope="geoloc">
              <vl-feature v-if="geoloc.position" id="position-feature">
                <vl-geom-point :coordinates="geoloc.position"></vl-geom-point>
                <vl-style-box>
                  <vl-style-icon src="static/marker.png" :scale="0.4" :anchor="[0.5, 1]"></vl-style-icon>
                </vl-style-box>
              </vl-feature>
            </template>
          </vl-geoloc> -->
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
  name: 'CreateAnchor',

  data () {
    return {
      anchor: {},
      anchorId: undefined,
      floor: {},
      floorId: undefined,
      anchorList: '',
      errors: [],
      floorList: '',
      geocoder: undefined,
      scaleX: undefined,
      scaleY: undefined,
      selectedFeatures: [],
      drawAnchor: [],
      // maxResolution: 5,
      zoom: 20,
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
      coordinates: [0, 0],
      imgSrc: ''
    }
  },
  created () {
    this.anchorList = '#/building/' + this.$route.params.id_building + '/floor/' + this.$route.params.id_floor + '/anchors'
    this.floorId = this.$route.params.id_floor
    axios.get(`http://localhost:3000/building/` + this.$route.params.id_building)
      .then(response => {
        this.center = response.data.coordinates
        // console.log(this.center)
        axios.get(`http://localhost:3000/floor/` + this.floorId)
          .then((response) => {
            if (response.data != null) {
              console.log(response.data.location)
              this.floor = response.data
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
                // break
              }
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
                  console.log('catch 1')
                  this.errors.push(e)
                })
            }
          })
          .catch(e => {
            console.log('catch 2')
            this.errors.push(e)
          })
      })
      .catch(e => {
        console.log('catch 3')
        this.errors.push(e)
      })
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      this.anchor.id_building = this.$route.params.id_building
      this.anchor.id_floor = this.$route.params.id_floor
      axios.post(`http://localhost:3000/anchor/`, this.anchor)
        .then(response => {
          this.anchorId = response.data._id
          this.floorId = this.$route.params.id_floor
          axios.get(`http://localhost:3000/floor/` + this.floorId)
            .then(response => {
              this.floor = response.data
              this.floor.anchors.push(this.anchorId)
              axios.put(`http://localhost:3000/floor/` + this.floorId, this.floor)
                .then(response => {
                  this.$router.push({
                    name: 'ShowAnchor',
                    params: { id_building: this.$route.params.id_building, id_floor: this.$route.params.id_floor, id_anchor: this.anchorId }
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
    },
    watch: {
      drawAnchor: function (val) {
        var index = val.length - 1
        console.log(val[index])
        var type = val[index].geometry.type
        var coord = null
        var marker =
        {
          type: 'Feature',
          id: 'feature-' + type + '-' + index,
          properties: {},
          geometry: {
            type: type
          }
        }
        coord = val[index].geometry.coordinates
        marker.geometry.coordinates = coord
        this.features.push(marker)
      }
    }
  }
}
</script>
