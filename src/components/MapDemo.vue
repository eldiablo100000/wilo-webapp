<template>
  <div id="app">
    <div style="height: 100%">
      <div id="click">
            <input type="file" @change="onFileChanged">
            <button @click="onUpload">Upload!</button>
        </div>
      <button class="collapsible" @click="switchPanel()">Open Collapsible</button>
      <div class="panel" id="panel">
        <button @click="selectByHover = !selectByHover">Select by {{ !selectByHover ? 'hover' : 'click' }}</button>
        <button @click="graticule = !graticule">Graticule</button>
        <br/>
        <button @click="drawType = 'Polygon'">Draw polygon</button>
        <button @click="drawType = 'Point'">Draw point</button>
        <button @click="drawType = null">Stop draw</button>
        <br/>
        <button @click="image = !image">Static Image</button>
        <button @click="imgScale(1)">+ Image</button>
        <button @click="imgScale(2)">- Image</button>
        <br/>
        <button @click="imgRotate(1); imgReload()">Anti-clockwise</button>
        <button id="reload" @click="imgReload()">Reload</button>
        <button @click="imgRotate(2); imgReload()">Clockwise</button>
        <br/>
        <button @click="imgMove('y', 1)">Up</button>
        <br/>
        <button @click="imgMove('x', 1)">Left</button>
        <button @click="imgMove('x', 2)">Right</button>
        <br/>
        <button @click="imgMove('y', 2)">Down</button>

        <div v-if="drawType == null && selectedFeatures.length > 0" style="background-color: rgba(10, 105, 169, 0.5);">
          <p><b>Type</b>: {{ selectedFeatures[0].type }}</p>
          <p><b>Id</b>: {{ selectedFeatures[0].id }}</p>
          <p><b>Geom-Type</b>: {{ selectedFeatures[0].geometry.type }}</p>
          <p><b>Geom-Coords</b>: {{ selectedFeatures[0].geometry.coordinates }}</p>
          <p><b>Geom-Props</b>: {{ selectedFeatures[0].geometry.properties }}</p>
        </div>
        <div v-if="drawType != null && drawnFeatures.length > 0" style="background-color: rgba(18, 169, 10, 0.5);">
          <p><b>Type</b>: {{ drawnFeatures[drawnFeatures.length - 1].type }}</p>
          <p><b>Id</b>: {{ drawnFeatures[drawnFeatures.length - 1].id }}</p>
          <p><b>Geom-Type</b>: {{ drawnFeatures[drawnFeatures.length - 1].geometry.type }}</p>
          <p><b>Geom-Coords</b>: {{ drawnFeatures[drawnFeatures.length - 1].geometry.coordinates }}</p>
          <p><b>Geom-Props</b>: {{ drawnFeatures[drawnFeatures.length - 1].geometry.properties }}</p>
        </div>
      </div>
      <vl-map ref="map" v-if="showMap" data-projection="EPSG:4326" renderer="webgl">
        <vl-view :center.sync="center" :rotation.sync="rotation" :zoom.sync="zoom"  />
        <vl-layer-image id="xkcd" v-if="image" :overlay="true" :opacity="0.5" >
          <vl-source-image-static :url="imgUrl" :size="imgSize" :extent="imgExtent" :projection="projection"
                                    :attributions="imgCopyright"></vl-source-image-static>
        </vl-layer-image>
        <div class="wrapper" position="absolute">
          <div class="workspace" ref="workspace">
            <FreeTransform
              v-for="element in elements"
              :key="element.id"
              :x="element.x"
              :y="element.y"
              :scale-x="element.scaleX"
              :scale-y="element.scaleY"
              :width="element.width"
              :height="element.height"
              :angle="element.angle"
              :offset-x="offsetX"
              :offset-y="offsetY"
              :disable-scale="element.disableScale === true"
              @update="update(element.id,$event)"
              >
              <div class="element" :style="getElementStyles(element)">
                {{element.text}}
              </div>
            </FreeTransform>
          </div>
        </div>

        <vl-geoloc @update:position="geolocPosition = $event">
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

        <vl-layer-tile>
          <vl-source-osm />
        </vl-layer-tile>
        <!--<vl-feature v-if="imgStatic" id="static-image">
          <vl-geom-point :coordinates="[12.4098176, 44.51205119999997]" :z-index="3"></vl-geom-point>
            <vl-style-box>
              <vl-style-icon src="static/logo.png" :scale="imgScaleValue" :anchor="imgAnchor" :rotation.sync="imgRotation"></vl-style-icon>
            </vl-style-box>
        </vl-feature>-->
       <vl-feature id="marker">
          <vl-geom-point :coordinates="[0, 0]" />
            <vl-style-box>
              <vl-style-icon src="static/logo.png" :scale="0.4" :anchor="[0.5, 1]"></vl-style-icon>
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
        <vl-layer-vector id="draw-pane" :z-index="0">
          <vl-source-vector :features.sync="drawnFeatures" ident="draw-target" />
        </vl-layer-vector>
        <vl-interaction-draw :type="drawType" source="draw-target" v-if="drawType != null" />
        <vl-interaction-select v-if="drawType == null" :condition="selectCondition" :features.sync="selectedFeatures" />
          <vl-feature v-if="selectedFeatures.length == 1" :properties="{ start: Date.now(), duration: 2500 }">
            <vl-geom-point v-if="selectedFeatures[0].geometry.type === 'Point'" :coordinates="selectedFeatures[0].geometry.coordinates" :z-index="3"></vl-geom-point>
            <vl-geom-point v-if="selectedFeatures[0].geometry.type === 'Polygon'" :coordinates="selectedFeatures[0].geometry.coordinates[0][0]" :z-index="3"></vl-geom-point>
            <vl-style-box>
              <vl-style-icon src="static/mario.png" :scale="0.1" :anchor="[0.5, 1]" ></vl-style-icon>
            </vl-style-box>
          </vl-feature>
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
import {createProj, addProj, transformPoint} from 'vuelayers/lib/ol-ext'
import FreeTransform from 'vue-free-transform'
import Geocoder from 'ol-geocoder'
// import * as ol from 'ol'

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
  // imgBigger () {
  //   this.growing = this.growing + 1
  //   this.imgSize = [Math.floor(this.imgSize[0] * 1.1), Math.floor(this.imgSize[1] * 1.1)]
  //   this.imgExtent = [this.imgExtent[0], this.imgExtent[1], this.imgExtent[2] * 1.1, this.imgExtent[3] * 1.1]
  //   console.log('bigger -> size -> ' + this.imgSize + ' ; extent -> ' + this.imgExtent + ' ; growing -> ' + this.growing)
  // },
  // imgSmaller () {
  //   this.growing = this.growing - 1
  //   this.imgSize = [Math.floor(this.imgSize[0] / 1.1), Math.floor(this.imgSize[1] / 1.1)]
  //   this.imgExtent = [this.imgExtent[0], this.imgExtent[1], this.imgExtent[2] / 1.1, this.imgExtent[3] / 1.1]
  //   console.log('smaller -> size -> ' + this.imgSize + ' ; extent -> ' + this.imgExtent + ' ; growing -> ' + this.growing)
  // },
  // imgMove (axis, direction) {
  //   var stepSized
  //   if (this.growing > 0) {
  //     stepSized = this.step * 1.1 * this.growing
  //   } else if (this.growing < 0) {
  //     stepSized = this.step / 1.1 * this.growing
  //   } else {
  //     stepSized = this.step
  //   }
  //   if (axis === 'x') {
  //     if (direction === 1) {
  //       this.imgExtent = [this.imgExtent[0] - stepSized, this.imgExtent[1], this.imgExtent[2] - stepSized, this.imgExtent[3]]
  //     } else if (direction === 2) {
  //       this.imgExtent = [this.imgExtent[0] + stepSized, this.imgExtent[1], this.imgExtent[2] + stepSized, this.imgExtent[3]]
  //     }
  //   } else if (axis === 'y') {
  //     if (direction === 1) {
  //       this.imgExtent = [this.imgExtent[0], this.imgExtent[1] + stepSized, this.imgExtent[2], this.imgExtent[3] + stepSized]
  //     } else if (direction === 2) {
  //       this.imgExtent = [this.imgExtent[0], this.imgExtent[1] - stepSized, this.imgExtent[2], this.imgExtent[3] - stepSized]
  //     }
  //   }
  //   console.log('move -> axis ' + axis + ' ; direction -> ' + direction + ' ; ext -> ' + this.imgExtent + ' ; stepSized -> ' + stepSized + ' ; growing -> ' + this.growing)
  // },
  sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  },
  imgScale (direction) {
    if (direction === 1) { // Image bigger
      this.imgScaleValue = this.imgScaleValue - 0.1
    } else if (direction === 2) { // Image smaller
      this.imgScaleValue = this.imgScaleValue + 0.1
    }
  },
  imgMove (axis, direction) {
    var stepSized = 0.1
    if (axis === 'x') {
      if (direction === 1) { // Left
        this.imgAnchor = [this.imgAnchor[0] + stepSized, this.imgAnchor[1]]
      } else if (direction === 2) { // Right
        this.imgAnchor = [this.imgAnchor[0] - stepSized, this.imgAnchor[1]]
      }
    } else if (axis === 'y') {
      if (direction === 1) { // Up
        this.imgAnchor = [this.imgAnchor[0], this.imgAnchor[1] + stepSized]
      } else if (direction === 2) { // Down
        this.imgAnchor = [this.imgAnchor[0], this.imgAnchor[1] - stepSized]
      }
    }
    console.log('move -> axis ' + axis + ' ; direction -> ' + direction + ' ; stepSized -> ' + stepSized)
  },
  async imgReload () {
    await this.sleep(1000)
    this.imgStatic = true
  },
  imgRotate (direction) {
    if (direction === 1) { // Rotation anti-clockwise
      this.imgRotation = this.imgRotation - 0.1
    } else if (direction === 2) { // Rotation clockwise
      this.imgRotation = this.imgRotation + 0.1
    }
    this.imgStatic = false
    // this.imgReload()
    document.getElementById('reload').click()
  },
  getCenter (arr) {
    var x = arr.map(function (a) { return a[0] })
    var y = arr.map(function (a) { return a[1] })
    var minX = Math.min.apply(null, x)
    var maxX = Math.max.apply(null, x)
    var minY = Math.min.apply(null, y)
    var maxY = Math.max.apply(null, y)
    return [(minX + maxX) / 2, (minY + maxY) / 2]
  },
  update (id, payload) {
    this.elements = this.elements.map(item => {
      if (item.id === id) {
        // console.log(item.x)
        console.log('X: ' + item.x + ' Y: ' + item.y + '\nWidth: ' + item.width + ' height: ' + item.height + '\nCoords: ' + this.$refs.map.getCoordinateFromPixel([item.x, item.y]))
        console.log('X: ' + (item.x + (item.width * item.scaleX)) + ' Y: ' + item.y + '\nWidth: ' + item.width + ' height: ' + item.height + '\nCoords: ' + this.$refs.map.getCoordinateFromPixel([(item.x + (item.width * item.scaleX)), item.y]))
        console.log('X: ' + (item.x + (item.width * item.scaleX)) + ' Y: ' + (item.y + (item.height * item.scaleX)) + '\nWidth: ' + item.width + ' height: ' + item.height + '\nCoords: ' + this.$refs.map.getCoordinateFromPixel([(item.x + (item.width * item.scaleX)), (item.y + (item.height * item.scaleX))]))
        console.log('X: ' + item.x + ' Y: ' + (item.y + (item.height * item.scaleX)) + '\nWidth: ' + item.width + ' height: ' + item.height + '\nCoords: ' + this.$refs.map.getCoordinateFromPixel([item.x, (item.y + (item.height * item.scaleX))]))
        console.log('\n \n')

        return {
          ...item,
          ...payload
        }
      }
      return item
    })
  },
  onFileChanged (event) {
    alert(event)
    var path = 'static/' + event.target.files[0].name
    this.resetElement(path)
  },
  onUpload () {
    console.log(this.img)
    // upload file
  },

  resetElement: async function (path) {
    var img = new Image()
    img.src = path
    await this.sleep(500)
    this.elements[0].width = img.width
    this.elements[0].height = img.height
    this.elements[0].angle = 0
    this.elements[0].text = ''
    this.elements[0].styles.backgroundImage = 'url(' + path + ')'
    this.elements[0].scaleX = 1
    this.elements[0].scaleY = 1
    this.elements[0].x = 100
    this.elements[0].y = 100
  },
  getElementStyles (element) {
    const styles = element.styles ? element.styles : {}
    return {
      width: `${element.width}px`,
      height: `${element.height}px`,
      ...styles
    }
  },
  switchPanel () {
    var panel = document.getElementById('panel')
    if (panel.style.display === 'block') {
      panel.style.display = 'none'
    } else {
      panel.style.display = 'block'
    }
  }
}

export default {
  name: 'app',
  components: {
    FreeTransform
  },
  computed,
  methods,
  data () {
    return {
      step: 1000000,
      growing: 0,
      geolocPosition: undefined,
      geocoder: undefined,
      // maxResolution: 5,
      zoom: 5,
      // maxZoom: 8,
      center: [0, 0],
      rotation: 0,
      rotation1: 1,
      features,
      selectedFeatures: [],
      graticule: false,
      image: false,
      showMap: true,
      drawType: undefined,
      drawnFeatures: [],
      selectByHover: false,
      projection: '',
      // imgUrl: '/static/logo.png',
      // imgCopyright: '© <a href="http://xkcd.com/license.html">xkcd</a>',
      imgSize: [],
      imgExtent: [],
      imgCenter: undefined,
      imgRotation: 0,
      imgScaleValue: 0.4,
      imgAnchor: [0, 0],
      imgStatic: true,

      elements: [
        {
          id: 'el-1',
          x: 100,
          y: 100,
          scaleX: 1,
          scaleY: 1,
          width: 100,
          height: 100,
          angle: 0,
          classPrefix: 'tr',
          text: 'upload image',
          styles: {
            // background: undefined, // 'linear-gradient(135deg, #0FF0B3 0%,#036ED9 100%)'
            backgroundImage: undefined, // "url('static/logo.png')"
            opacity: 0.8
          }
        }
      ],
      offsetX: 0,
      offsetY: 0
    }
  },
  created () {
  },
  mounted () {
    // now ol.Map instance is ready and we can work with it directly
    this.geocoder = new Geocoder('nominatim', {
      provider: 'osm',
      lang: 'en',
      placeholder: 'Search for ...',
      limit: 5,
      debug: false,
      autoComplete: true,
      keepOpen: true
    })
    // this.$refs.map.$map.addControl(geocoder)
    console.log(this.geocoder)
    // console.log(this.$refs.map.$map.getControls())
    this.$refs.map.$createPromise.then(() => {
      this.$refs.map.$map.addControl(this.geocoder)
      console.log(this.$refs.map.$map.getControls())
      this.geocoder.on('addresschosen', function (evt) {
        // it's up to you
        console.info(evt)
      })
    })
    this.offsetX = this.$refs.workspace.offsetLeft
    this.offsetY = this.$refs.workspace.offsetTop
  },
  watch: {
    imgSize: function (val) {
      // alert(val)
    },
    geolocPosition: function (val) {
      this.imgCenter = val
      this.center = val
      this.center1 = val
      var a = transformPoint(this.center, 'EPSG:4326', 'EPSG:3857')
      var size = 1000000
      this.imgSize = [size, size]
      this.imgExtent = [a[0], a[1], a[0] + size, a[1] + size]
      console.log(this.imgExtent)
      var tmp = this.imgExtent
      var customProj = createProj({
        code: 'xkcd-image',
        units: 'pixels',
        tmp
      })
      addProj(customProj)
      this.projection = customProj.getCode()
    },
    selectedFeatures: function (val) {
    },
    drawnFeatures: function (val) {
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

  .collapsible {
    background-color: #eee;
    color: #444;
    cursor: pointer;
    padding: 18px;
    width: 100%;
    border: none;
    text-align: left;
    outline: none;
    font-size: 15px;
  }

  .active, .collapsible:hover {
    background-color: #ccc;
  }
  .panel {
    position: absolute;
    bottom: 10px;
    left: 65%;
    transform: translateX(-65%);
    width: 70vw;
    background: rgba(255, 255, 255, 0.7);
    box-shadow: 0 0 20px rgba(2, 2, 2, 0.1);
    padding: 5px;
    text-align: center;
    z-index: 1;
    display: none;
    overflow: hidden;
    > button {
      margin: 5px;
      padding: 5px 10px;
      text-transform: uppercase;
    }
  }

  .wrapper {
      flex: 1;
  }

  .workspace {
      margin: 25px auto;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.10);
      border: 1px solid rgba(0, 0, 0, 0.10);
      background: #fff;
  }

  * {
      box-sizing: border-box;
  }

  .tr-transform__content {
      user-select: none;
      z-index: 3;
  }

  .tr-tranform__controls {
      z-index: 3;
  }
  .tr-transform__rotator {
      top: -45px;
      left: calc(50% - 7px);
  }

  .tr-transform__rotator,
  .tr-transform__scale-point {
      background: #fff;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      position: absolute;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(0, 0, 0, 0.1);
      cursor: pointer;
  }

  .tr-transform__rotator:hover,
  .tr-transform__scale-point:hover {
      background: #F1F5F8;
  }

  .tr-transform__rotator:active,
  .tr-transform__scale-point:active {
      background: #DAE1E7;
  }

  .tr-transform__scale-point {

  }

  .tr-transform__scale-point--tl {
      top: -7px;
      left: -7px;
  }

  .tr-transform__scale-point--ml {
      top: calc(50% - 7px);
      left: -7px;
  }

  .tr-transform__scale-point--tr {
      left: calc(100% - 7px);
      top: -7px;
  }

  .tr-transform__scale-point--tm {
      left: calc(50% - 7px);
      top: -7px;
  }

  .tr-transform__scale-point--mr {
      left: calc(100% - 7px);
      top: calc(50% - 7px);
  }

  .tr-transform__scale-point--bl {
      left: -7px;
      top: calc(100% - 7px);
  }

  .tr-transform__scale-point--bm {
      left: calc(50% - 7px);
      top: calc(100% - 7px);
  }

  .tr-transform__scale-point--br {
      left: calc(100% - 7px);
      top: calc(100% - 7px);
  }

  #click {
      float: top;
  }
</style>
