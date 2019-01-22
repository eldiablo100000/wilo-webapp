<template>
  <div id="app">
    <div style="height: 100%">
      <div class="panel">
        <button @click="selectByHover = !selectByHover">Select by {{ !selectByHover ? 'hover' : 'click' }}</button>
        <button @click="graticule = !graticule">Graticule</button>
        <button @click="image = !image">Static Image</button>

        <button @click="drawType = 'Polygon'">Draw polygon</button>
        <button @click="drawType = 'Point'">Draw point</button>

        <button @click="drawType = undefined">Stop draw</button>
        <div>
          {{ selectedFeatures }}
        </div>
      </div>

      <vl-map ref="map" v-if="showMap" data-projection="EPSG:4326" renderer="webgl">
        <vl-view :center.sync="center" :rotation.sync="rotation" :zoom.sync="zoom" />
        <!--<vl-layer-image id="xkcd" v-if="image">
          <vl-source-image-static :url="imgUrl" :size="imgSize" :extent="imgExtent" :projection="projection"
                                  :attributions="imgCopyright"></vl-source-image-static>
        </vl-layer-image>-->
        <vl-geoloc @update:position="geolocPosition = center = $event">
          <template slot-scope="geoloc">
            <vl-feature v-if="geoloc.position" id="position-feature">
              <vl-geom-point :coordinates="geoloc.position"></vl-geom-point>
              <vl-style-box>
                <vl-style-icon src="static/marker.png" :scale="0.4" :anchor="[0.5, 1]"></vl-style-icon>
              </vl-style-box>
            </vl-feature>
          </template>
        </vl-geoloc>
        <vl-graticule :show-labels="true" v-if="graticule">
          <vl-style-stroke :line-dash="[5, 10]" color="green" slot="stroke"></vl-style-stroke>
          <vl-style-text slot="lon" text-baseline="bottom">
            <vl-style-stroke color="blue" />
          </vl-style-text>
          <vl-style-text slot="lat" text-align="end">
            <vl-style-stroke color="black" />
          </vl-style-text>
        </vl-graticule>
        <vl-interaction-select :condition="selectCondition" :features.sync="selectedFeatures" />

        <vl-layer-tile>
          <vl-source-osm />
        </vl-layer-tile>

        <vl-feature id="marker">
          <vl-geom-point :coordinates="[0, 0]" />
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
        <vl-layer-vector id="draw-pane" v-if="drawType != null" :z-index="0">
          <vl-source-vector :features.sync="drawnFeatures" ident="draw-target" />
        </vl-layer-vector>
        <vl-interaction-draw :type="drawType" source="draw-target" v-if="drawType != null" />
      </vl-map>
    </div>
  </div>
</template>
<!--
<template>
  <div id="app">
    <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true" style="height: 400px">
      <vl-view :projection="projection" :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>

      <vl-layer-image id="xkcd">
        <vl-source-image-static :url="imgUrl" :size="imgSize" :extent="imgExtent" :projection="projection"
                                :attributions="imgCopyright"></vl-source-image-static>
      </vl-layer-image>
    </vl-map>
  </div>
</template>
-->

<script>
import * as eventCondition from 'ol/events/condition'
// import {createProj, addProj} from 'vuelayers/lib/ol-ext'

const features = [
  // {
  //   type: 'Feature',
  //   id: 'feature-1',
  //   properties: {},
  //   geometry: {
  //     type: 'Point',
  //     coordinates: [10, 10]
  //   }
  // }
]

const computed = {
  selectCondition () {
    return this.selectByHover ? eventCondition.pointerMove : eventCondition.singleClick
  }
}

const methods = {
  getCenter (arr) {
    var x = arr.map(function (a) { return a[0] })
    var y = arr.map(function (a) { return a[1] })
    var minX = Math.min.apply(null, x)
    var maxX = Math.max.apply(null, x)
    var minY = Math.min.apply(null, y)
    var maxY = Math.max.apply(null, y)
    return [(minX + maxX) / 2, (minY + maxY) / 2]
  }
}
// let size = [700000, 1300000]
// var extent = [0, 0, 700000, 1300000]
// // NOTE: VueLayers.olExt available only in UMD build
// // in ES build it should be imported explicitly from 'vuelayers/lib/ol-ext'
// let customProj = createProj({
//   code: 'xkcd-image',
//   units: 'pixels',
//   extent
// })
// // add it to the list of known projections
// addProj(customProj)
export default {
  name: 'app',
  computed,
  methods,
  data () {
    return {
      geolocPosition: undefined,
      zoom: 5,
      // maxZoom: 8,
      center: [0, 0],
      rotation: 0,
      features,
      selectedFeatures: [],
      graticule: false,
      image: false,
      showMap: true,
      drawType: undefined,
      drawnFeatures: [],
      selectByHover: false
      // projection: customProj.getCode(),
      // imgUrl: 'https://imgs.xkcd.com/comics/online_communities.png',
      // imgCopyright: '© <a href="http://xkcd.com/license.html">xkcd</a>',
      // imgSize: size,
      // imgExtent: extent
    }
  },
  created () {
  },
  watch: {
    drawnFeatures: function (val) {
      console.log(this.features)
      var index = val.length - 1
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
      if (type === 'Polygon') {
        coord = this.getCenter(val[index].geometry.coordinates[0])
      } else if (type === 'Point') {
        coord = val[index].geometry.coordinates
      }
      marker.geometry.coordinates = coord
      this.features.push(marker)
      // console.log(this.features)
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

  .panel {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 70vw;
    background: rgba(255, 255, 255, 0.7);
    box-shadow: 0 0 20px rgba(2, 2, 2, 0.1);
    padding: 5px;
    text-align: center;
    z-index: 1;

    > button {
      margin: 5px;
      padding: 5px 10px;
      text-transform: uppercase;
    }
  }
</style>
