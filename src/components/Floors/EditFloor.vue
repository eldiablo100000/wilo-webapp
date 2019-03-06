<template>
  <div>
    <b-row>
      <b-col cols="12">
        <h2>
          Edit Floor
          <router-link :to="{ name: 'ShowFloor', params: { id: floor._id } }">(Show Floor)</router-link>
        </h2>
        <b-form @submit="onSubmit">
          <b-form-group id="fieldsetHorizontal"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    label="Enter Number">
            <b-form-input id="number" :state="state" v-model.trim="floorNumber"></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary">Update</b-button>
        </b-form>
        <button @click="ModifyImage"> Riposiziona Immagine </button>
      </b-col>
    </b-row>
    <div style="height: 100%; width: 100%;  ">
       <vl-map ref="map" v-if="showMap" data-projection="EPSG:3857" renderer="webgl">
          <vl-view :center.sync="center" :rotation.sync="rotation" :zoom.sync="zoom"  />
            <div class="wrapper" position="absolute">
              <div class="workspace" ref="workspace">
                <FreeTransform
                  v-if="!imgStatic"
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
                  :disable-scale="element.disableScale === false"
                  @update="update(element.id,$event)"
                  >
                  <div class="element" :style="getElementStyles(element)">
                    {{element.text}}
                  </div>
                </FreeTransform>
              </div>
            </div>
          <vl-layer-tile>
             <vl-source-osm />
          </vl-layer-tile>
          <vl-feature v-if="imgStatic && image" id="static-image">
             <vl-geom-point :coordinates="coordinates" :z-index="3"></vl-geom-point>
             <vl-style-box>
                <vl-style-icon id="image" :src="imgSrc" :opacity="0.6" :scale.sync="imgScale" :anchor="imgAnchor" :rotation.sync="imgRotation"></vl-style-icon>
             </vl-style-box>
          </vl-feature>
      </vl-map>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
import FreeTransform from 'vue-free-transform'

export default {
  name: 'EditFloor',
  components: {
    FreeTransform
  },
  data () {
    return {
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
          styles: {
            backgroundImage: undefined,
            opacity: 0.7
          }
        }
      ],
      floor: {},
      floorNumber: undefined,
      showMap: true,
      center: [0, 0],
      rotation: 0,
      zoom: undefined,
      imgStatic: true,
      image: false,
      coordinates: [],
      imgSrc: '',
      imgScale: undefined,
      realImgScale: undefined,
      imgAnchor: [0, 0],
      imgRotation: undefined,
      floorId: undefined,
      buildingId: undefined,
      precedentZoom: null,
      errors: []
    }
  },
  mounted () {
    this.offsetX = this.$refs.workspace.offsetLeft
    this.offsetY = this.$refs.workspace.offsetTop
  },
  created () {
    this.floorList = '#/building/' + this.$route.params.id_building + '/floors'
    this.floorId = this.$route.params.id_floor
    this.buildingId = this.$route.params.id_building

    axios.get(`http://localhost:3000/floor/` + this.floorId)
      .then((response) => {
        if (response.data != null) {
          this.center = response.data.center
          if (response.data.angleImage >= 270) this.elements[0].angle = response.data.angleImage - 360
          else this.elements[0].angle = response.data.angleImage
          this.elements[0].scaleX = response.data.scaleX
          this.elements[0].scaleY = response.data.scaleX
          this.elements[0].x = response.data.xImage
          this.elements[0].y = response.data.yImage
          this.elements[0].height = response.data.heightImage
          this.elements[0].width = response.data.widthImage

          this.floorNumber = response.data.number
          this.coordinates = response.data.location[0]
          this.floor = response.data
          this.zoom = response.data.zoom
          this.imgScale = response.data.scaleX
          this.realImgScale = response.data.scaleX
          this.imgRotation = response.data.angleImage * Math.PI / 180
          this.image = true
          axios.get(`http://localhost:3000/image/` + response.data.image[0])
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
    update (id, payload) {
      this.elements = this.elements.map(item => {
        if (item.id === id) {
          return {
            ...item,
            ...payload
          }
        }
        return item
      })
    },
    getElementStyles (element) {
      const styles = element.styles ? element.styles : {}
      return {
        width: `${element.width}px`,
        height: `${element.height}px`,
        ...styles
      }
    },
    ModifyImage () {
      this.imgStatic = false
      this.elements[0].styles.backgroundImage = 'url(' + this.imgSrc + ')'
    },
    onSubmit (evt) {
      evt.preventDefault()
      this.floorId = this.$route.params.id_floor
      axios.get(`http://localhost:3000/floor/` + this.floorId)
        .then(response => {
          this.floor = response.data
          this.floor.number = this.floorNumber
          if (this.elements[0].angle < 0) this.floor.angleImage = 360 - Math.abs(this.elements[0].angle)
          else this.floor.angleImage = this.elements[0].angle
          this.floor.widthImage = this.elements[0].width
          this.floor.heightImage = this.elements[0].height
          this.floor.xImage = this.elements[0].x
          this.floor.yImage = this.elements[0].y
          this.floor.scaleX = this.elements[0].scaleX
          this.floor.scaleY = this.elements[0].scaleY
          this.floor.zoom = this.zoom
          var x = (this.elements[0].x + this.elements[0].width) - (this.elements[0].width * this.elements[0].scaleX)
          var y = (this.elements[0].y + this.elements[0].height) - (this.elements[0].height * this.elements[0].scaleY)

          var a = (this.elements[0].x + (this.elements[0].width - (this.elements[0].width * this.elements[0].scaleX) / 2))
          var b = (this.elements[0].y + (this.elements[0].height - (this.elements[0].height * this.elements[0].scaleY) / 2))

          var centro = [a, b]
          this.floor.center = this.$refs.map.getCoordinateFromPixel(centro)

          var rad = this.floor.angleImage * Math.PI / 180
          var pos = [Math.cos(rad) * (x - centro[0]) - Math.sin(rad) * (y - centro[1]), Math.sin(rad) * (x - centro[0]) + Math.cos(rad) * (y - centro[1])]

          this.floor.location = this.$refs.map.getCoordinateFromPixel([(pos[0] + centro[0]), (pos[1] + centro[1])])

          axios.put(`http://localhost:3000/floor/` + this.$route.params.id_floor, this.floor)
            .then(response => {
              this.$router.push({
                name: 'ShowFloor',
                params: { id_building: this.$route.params.id_building, id_floor: this.$route.params.id_floor }
              })
            })
            .catch(e => {
              this.errors.push(e)
              console.log(e)
            })
        })
        .catch(e => {
          this.errors.push(e)
          console.log(e + '2')
        })
    }
  },
  watch: {
    zoom: function (val) {
      this.imgScale = this.realImgScale
      if (this.precedentZoom !== null && this.imgStatic) {
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

    .tr-transform__controls {
      z-index: 3;
    }
    .tr-transform__content {
        user-select: none;
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
