<template>
  <div id="app">
    <!--<div style="height: 100%; width: 40%; float:right; padding: 10px; ">-->
    <div style="height: 100%; width: 100%;  ">
      <vl-map ref="map" v-if="showMap" data-projection="EPSG:4326" renderer="webgl">
        <vl-view :center.sync="center" :rotation.sync="rotation" :zoom.sync="zoom"  />

        <vl-layer-tile>
          <vl-source-osm />
        </vl-layer-tile>
        <vl-feature v-if="imgStatic && image" id="static-image">
          <vl-geom-point :coordinates="coordinates" :z-index="3"></vl-geom-point>
            <vl-style-box>
<<<<<<< HEAD
              <vl-style-icon class="planimetria" src="static/marker.png" :size="imgScaleValue" :anchor="imgAnchor" :rotation.sync="imgRotation" style="transform: scale(0.2)"></vl-style-icon>
=======
              <vl-style-icon :src="imgSrc" :size="imgScaleValue" :anchor="imgAnchor" :rotation.sync="imgRotation"></vl-style-icon>
>>>>>>> 8321e0f5f593f68086f9fa7beeaff97915c8121d
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
  </div>
</template>

<script>
import * as eventCondition from 'ol/events/condition'
import Geocoder from 'ol-geocoder'
import axios from 'axios'

const features = [
]

const computed = {
  selectCondition () {
    return this.selectByHover ? eventCondition.pointerMove : eventCondition.singleClick
  }
}

const methods = {
}

export default {
  name: 'app',
  computed,
  methods,
  data () {
    return {
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
    axios.get(`http://localhost:3000/building/` + this.$route.params.id_building)
      .then((response) => {
        this.floorsId = response.data.floors
        for (var el in this.floorsId) {
          axios.get(`http://localhost:3000/floor/` + this.floorsId[el])
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
<<<<<<< HEAD
                  // alert(response.data.location[t])
=======
>>>>>>> 8321e0f5f593f68086f9fa7beeaff97915c8121d
                  this.coordinates = response.data.location[t]
                  break
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
                    this.errors.push(e)
                  })
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
  mounted () {
    // now ol.Map instance is ready and we can work with it directly
    this.geocoder = new Geocoder('nominatim', {
      provider: 'osm',
      lang: 'it',
      placeholder: 'Search for ...',
      limit: 5,
      debug: true,
      autoComplete: true,
      keepOpen: true
    })
    // this.$refs.map.$map.addControl(geocoder)
    // console.log(this.$refs.map.$map.getControls())
    this.$refs.map.$createPromise.then(() => {
      this.$refs.map.$map.addControl(this.geocoder)
      // console.log(this.$refs.map.$map.getControls())
      this.geocoder.on('addresschosen', function (evt) {
        // it's up to you
        console.info(evt)
        alert('hello')
      })
    })
  },
  watch: {
    geocoder: function (val) {
      console.log(val)
    },
    imgSrc: function (val) {
      alert(val)
    }
  }
}
</script>

<style></style>
<!--
<style lang="scss" rel="stylesheet/scss">
  @import "~ol/ol";

  html, body, #app {
    width: 100%;
    height: 100%;
    margin: 0;
    box-sizing: border-box;
    font-family: Helvetica, Arial, sans-serif;
    overflow: hidden;

    * {
      box-sizing: border-box;
    }
  }
</style>
-->
