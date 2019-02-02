<template>
  <div id="app">
    <h2>
      Add Floor
      <b-link :href="floorList">(Floor List)</b-link>
    </h2>
    <b-form @submit="onSubmit">
      <b-form-group id="fieldsetHorizontal"
        horizontal
        :label-cols="4"
        breakpoint="md"
        label="Enter Number">
        <b-form-input id="number" :state="state" v-model.trim="floor.number"></b-form-input>
      </b-form-group>
    </b-form>
    <div id="click">
        <input type="file" @change="onFileChanged">
        <button @click="save">Save!</button>
    </div>
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
    <vl-map ref="map" v-if="showMap" data-projection="EPSG:4326" renderer="webgl">
      <vl-view :center.sync="center" :rotation.sync="rotation" :zoom.sync="zoom"  />
      <vl-layer-image id="xkcd" v-if="image" :overlay="true" :opacity="0.5" >
        <vl-source-image-static :url="imgUrl" :size="imgSize" :extent="imgExtent" :projection="projection"
                                  :attributions="imgCopyright"></vl-source-image-static>
      </vl-layer-image>

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
      <vl-feature v-if="imgStatic && image" id="static-image">
        <vl-geom-point :coordinates="[12.4098176, 44.51205119999997]" :z-index="3"></vl-geom-point>
          <vl-style-box>
            <vl-style-icon src="static/logo.png" :scale="imgScaleValue" :anchor="imgAnchor" :rotation.sync="imgRotation"></vl-style-icon>
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
      <vl-layer-vector id="draw-pane" :z-index="0">
        <vl-source-vector :features.sync="drawnFeatures" ident="draw-target" />
      </vl-layer-vector>
      <vl-interaction-draw :type="drawType" source="draw-target" v-if="drawType != null" />
      <vl-interaction-modify :type="drawType" source="draw-target" v-if="drawType != null" />
      <vl-interaction-select ref="select" v-if="drawType == null" :condition="selectCondition" :features.sync="selectedFeatures" />
        <vl-feature v-if="selectedFeatures.length == 1" :properties="{ start: Date.now(), duration: 2500 }">
          <vl-geom-point v-if="selectedFeatures[0].geometry.type === 'Point'" :coordinates="selectedFeatures[0].geometry.coordinates" :z-index="3"></vl-geom-point>
          <vl-geom-point v-if="selectedFeatures[0].geometry.type === 'Polygon'" :coordinates="selectedFeatures[0].geometry.coordinates[0][0]" :z-index="3"></vl-geom-point>
          <vl-style-box>
            <vl-style-icon src="static/mario.png" :scale="0.1" :anchor="[0.5, 1]" ></vl-style-icon>
          </vl-style-box>
        </vl-feature>
    </vl-map>
  </div>
</template>

<script>
import FreeTransform from 'vue-free-transform'
import axios from 'axios'

export default {
  name: 'ManipulateImage',
  components: {
    FreeTransform
  },
  data () {
    return {
      errors: [],
      location: [],
      floor: {},
      floorId: undefined,
      buildingId: undefined,
      floorList: '',
      step: 1000000,
      growing: 0,
      geolocPosition: undefined,
      geocoder: undefined,
      drz: undefined,
      rotate: undefined,
      // maxResolution: 5,
      zoom: 5,
      // maxZoom: 8,
      center: [0, 0],
      rotation: 0,
      rotation1: 1,
      features: [],
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
          width: 200,
          height: 200,
          angle: 0,
          classPrefix: 'tr',
          text: 'upload image',
          styles: {
            // background: undefined, // 'linear-gradient(135deg, #0FF0B3 0%,#036ED9 100%)'
            backgroundImage: undefined, // "url('static/logo.png')"
            opacity: 0.7
          }
        }
      ],
      offsetX: 0,
      offsetY: 0
    }
  },
  mounted () {
    this.offsetX = this.$refs.workspace.offsetLeft
    this.offsetY = this.$refs.workspace.offsetTop
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
                console.log(response.data.location)
                for (var t in response.data.location) {
                  var tmp = {
                    id: response.data._id + t,
                    type: 'Feature',
                    properties: null,
                    geometry: {
                      type: 'Point',
                      coordinates: response.data.location[t]
                    }
                  }
                  console.log(tmp)
                  this.features.push(tmp)
                }
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
  watch: {
    drawnFeatures: function (val) {
      console.log(val)
    },
    features: function (val) {
      console.log(val)
    }
  },
  methods: {
    update (id, payload) {
      this.elements = this.elements.map(item => {
        if (item.id === id) {
          // console.log('x: ' + item.x + ' y: ' + item.y + ' width: ' + item.width * item.scaleX + ' height: ' + item.height * item.scaleY + ' angle: ' + item.angle)
          // console.log('X: ' + item.x + ' Y: ' + item.y + '\nWidth: ' + item.width + ' height: ' + item.height + '\nCoords: ' + this.$refs.map.getCoordinateFromPixel([item.x, item.y]))
          // console.log('X: ' + (item.x + (item.width * item.scaleX)) + ' Y: ' + item.y + '\nWidth: ' + item.width + ' height: ' + item.height + '\nCoords: ' + this.$refs.map.getCoordinateFromPixel([(item.x + (item.width * item.scaleX)), item.y]))
          // console.log('X: ' + (item.x + (item.width * item.scaleX)) + ' Y: ' + (item.y + (item.height * item.scaleX)) + '\nWidth: ' + item.width + ' height: ' + item.height + '\nCoords: ' + this.$refs.map.getCoordinateFromPixel([(item.x + (item.width * item.scaleX)), (item.y + (item.height * item.scaleX))]))
          // console.log('X: ' + item.x + ' Y: ' + (item.y + (item.height * item.scaleX)) + '\nWidth: ' + item.width + ' height: ' + item.height + '\nCoords: ' + this.$refs.map.getCoordinateFromPixel([item.x, (item.y + (item.height * item.scaleX))]))
          // console.log('\n \n')
          this.location[0] = this.$refs.map.getCoordinateFromPixel([item.x, item.y])
          this.location[1] = this.$refs.map.getCoordinateFromPixel([(item.x + (item.width * item.scaleX)), item.y])
          this.location[2] = this.$refs.map.getCoordinateFromPixel([(item.x + (item.width * item.scaleX)), (item.y + (item.height * item.scaleX))])
          this.location[3] = this.$refs.map.getCoordinateFromPixel([item.x, (item.y + (item.height * item.scaleX))])
          return {
            ...item,
            ...payload
          }
        }
        return item
      })
    },
    onFileChanged (event) {
      var path = 'static/' + event.target.files[0].name
      this.resetElement(path)
    },
    save () {
      this.floor.angleImage = this.elements[0].angle
      this.floor.widthImage = this.elements[0].width
      this.floor.heightImage = this.elements[0].height
      this.floor.xImage = this.elements[0].x
      this.floor.yImage = this.elements[0].y
      this.floor.scaleX = this.elements[0].scaleX
      this.floor.scaleY = this.elements[0].scaleY
      this.location[4] = this.location[0]

      console.log(this.location)
      this.floor.location = this.location
      console.log(this.floor)

      this.floor.id_building = this.$route.params.id_building
      axios.post(`http://localhost:3000/floor`, this.floor)
        .then(response => {
          this.floorId = response.data._id
          this.buildingId = this.$route.params.id_building
          axios.get(`http://localhost:3000/building/` + this.buildingId)
            .then(response => {
              this.building = response.data
              this.building.floors.push(this.floorId)
              axios.put(`http://localhost:3000/building/` + this.buildingId, this.building)
                .then(response => {
                  this.$router.push({
                    name: 'FloorList',
                    params: { id_building: this.$route.params.id_building }
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
          console.log(e)
        })
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
    sleep (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    getElementStyles (element) {
      const styles = element.styles ? element.styles : {}
      return {
        width: `${element.width}px`,
        height: `${element.height}px`,
        ...styles
      }
    },
    onSubmit (evt) {
      evt.preventDefault()
      this.floor.id_building = this.$route.params.id_building
      axios.post(`http://localhost:3000/floor`, this.floor)
        .then(response => {
          this.floorId = response.data._id
          this.buildingId = this.$route.params.id_building
          axios.get(`http://localhost:3000/building/` + this.buildingId)
            .then(response => {
              this.building = response.data
              this.building.floors.push(this.floorId)
              axios.put(`http://localhost:3000/building/` + this.buildingId, this.building)
                .then(response => {
                  this.$router.push({
                    name: 'FloorList',
                    params: { id_building: this.$route.params.id_building }
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
    #app {
        background: #F8FAFC;
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
