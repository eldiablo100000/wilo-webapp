<template>
  <div id="app">
    <div style="height: 100%">
      <vl-map ref="map" v-if="showMap" data-projection="EPSG:4326" renderer="webgl">
        <vl-view :center.sync="center" :rotation.sync="rotation" :zoom.sync="zoom"  />

        <vl-layer-tile>
          <vl-source-osm />
        </vl-layer-tile>

       <vl-feature id="marker">
          <vl-geom-point :coordinates="[0, 0]" />
            <vl-style-box>
              <vl-style-icon src="static/logo.png" :scale="0.4" :anchor="[0.5, 1]"></vl-style-icon>
            </vl-style-box>
        </vl-feature>

      </vl-map>
    </div>
  </div>
</template>

<script>
import * as eventCondition from 'ol/events/condition'
import Geocoder from 'ol-geocoder'

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
      geocoder: undefined,
      // maxResolution: 5,
      zoom: 5,
      // maxZoom: 8,
      center: [0, 0],
      rotation: 0,
      features,
      image: false,
      showMap: true
    }
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
    }
  }
}
</script>

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
