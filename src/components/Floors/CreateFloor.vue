<template>
  <div >
    <h2>
      Add Floor
      <b-link :href="floorList">(Floor List)</b-link>
    </h2>
    <b-form>
      <b-form-group class="fieldsetHorizontal"
        :label-cols="4"
        breakpoint="md"
        label="Enter Number">
        <b-form-input id="number" :state="state" v-model.trim="floor.number" style="width: 50%; margin: 0 auto;"></b-form-input>
      </b-form-group>
    </b-form>
    <div id="click">
      <div v-if="!image">
        <h2>Select an image</h2>
        <input type="file" @change="onFileChange">
      </div>
      <div v-else>
        <button @click="removeImage">Remove image</button>
      </div>
      <button @click="save">Save!</button>
    </div>
    <vl-map ref="map" v-if="showMap" data-projection="EPSG:3857" renderer="webgl" style="height: 500px;">
      <vl-view :center.sync="center" :rotation.sync="rotation" :zoom.sync="zoom"  />
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
      buildingId: undefined,
      center: [0, 0],
      drawnFeatures: [],
      drawType: null,
      interactionType: null,
      drz: undefined,
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
            backgroundImage: undefined,
            opacity: 0.7
          }
        }
      ],
      errors: [],
      features: [],
      floor: {},
      floorId: undefined,
      floorList: '',
      geocoder: undefined,
      geolocPosition: undefined,
      graticule: false,
      growing: 0,
      image: undefined,
      img: false,
      imgAnchor: [0, 0],
      imgCenter: undefined,
      imgExtent: [],
      imgRotation: 0,
      imgScaleValue: 0.4,
      imgSize: [],
      imgStatic: true,
      location: [],
      offsetY: 0,
      offsetX: 0,
      projection: '',
      rotate: undefined,
      rotation: 0,
      rotation1: 1,
      selectByHover: false,
      selectedFeatures: [],
      selectedImage: null,
      showMap: true,
      step: 1000000,
      zoom: 19,
      floorName: [],
      continuePost: undefined
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
        this.center = response.data.coordinates
        this.floorsId = response.data.floors
        var tmp = {
          id: response.data._id,
          type: 'Feature',
          properties: null,
          geometry: {
            type: 'Point',
            coordinates: response.data.coordinates
          }
        }
        this.features.push(tmp)

        for (var el in this.floorsId) {
          axios.get(`http://localhost:3000/floor/` + this.floorsId[el])
            .then((response) => {
              if (response.data != null) {
                this.floorName.push(response.data.number)
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
    onFileChange (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.selectedImage = e.target.files[0]
      this.createImage(files[0])
    },
    createImage (file) {
      var reader = new FileReader()
      var vm = this
      vm.image = new Image()
      reader.onload = (e) => {
        vm.image = e.target.result
      }
      reader.readAsDataURL(file)
      var _URL = window.URL || window.webkitURL
      this.resetElement(_URL.createObjectURL(file))
    },
    removeImage: function (e) {
      this.image = ''
    },
    onFileChanged (event) {
      var path = 'static/' + event.target.files[0].name
      this.selectedImage = event.target.files[0]
      this.resetElement(path)
    },
    save () {
      this.continuePost = true
      if (this.floor.number == null || this.floor.number === '') {
        alert('insert a floor number')
        this.continuePost = false
      }
      for (var i in this.floorName) {
        if (this.floor.number === this.floorName[i]) {
          alert('floor number already insert')
          this.continuePost = false
        }
        if (!this.continuePost) break
      }
      if (this.selectedImage == null) {
        alert('insert an image')
        this.continuePost = false
      }
      if (this.continuePost) {
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

        this.location = this.$refs.map.getCoordinateFromPixel([(pos[0] + centro[0]), (pos[1] + centro[1])])

        this.floor.location = this.location
        const formData = new FormData()
        formData.append('myFile', this.selectedImage, this.selectedImage.name)
        axios.post('http://localhost:3000/image', formData)
          .then(response => {
            this.floor.image = response.data._id
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
                    console.log(e)
                  })
              })
              .catch(e => {
                this.errors.push(e)
                console.log(e)
              })
          })
          .catch(e => {
            this.errors.push(e)
          })
      }
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
