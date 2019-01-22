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
        <vl-view :projection="projection" :center.sync="center" :rotation.sync="rotation" :zoom.sync="zoom" />
        <vl-layer-image id="xkcd" v-if="image">
          <vl-source-image-static :url="imgUrl" :size="imgSize" :extent="imgExtent" :projection="projection"
                                  :attributions="imgCopyright"></vl-source-image-static>
        </vl-layer-image>
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

        <vl-layer-vector id="features">
          <vl-source-vector :features.sync="features" />
        </vl-layer-vector>

        <vl-layer-vector id="draw-pane" v-if="drawType != null">
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
import {createProj, addProj} from 'vuelayers/lib/ol-ext'

const features = [
  {
    type: 'Feature',
    id: 'feature-1',
    properties: {},
    geometry: {
      type: 'Point',
      coordinates: [10, 10]
    }
  }
]

const computed = {
  selectCondition () {
    return this.selectByHover ? eventCondition.pointerMove : eventCondition.singleClick
  }
}

const methods = {}
let size = [11399, 7163]
let extent = [0, 0, ...size]
// create custom projection for image
// NOTE: VueLayers.olExt available only in UMD build
// in ES build it should be imported explicitly from 'vuelayers/lib/ol-ext'
let customProj = createProj({
  code: 'xkcd-image',
  units: 'pixels',
  extent
})
// add it to the list of known projections
addProj(customProj)
export default {
  name: 'app',
  computed,
  methods,
  data () {
    return {
      zoom: 2,
      // maxZoom: 8,
      center: [size[0] / 2, size[1] / 2],
      rotation: 0,
      features,
      selectedFeatures: [],
      graticule: false,
      image: false,
      showMap: true,
      drawType: undefined,
      drawnFeatures: [],
      selectByHover: false,
      projection: customProj.getCode(),
      imgUrl: 'https://imgs.xkcd.com/comics/online_communities.png',
      imgCopyright: '© <a href="http://xkcd.com/license.html">xkcd</a>',
      imgSize: size,
      imgExtent: extent
    }
  },
  created () {
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
