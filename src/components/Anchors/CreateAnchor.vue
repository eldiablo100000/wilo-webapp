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
          <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Enter Description">
                  <b-form-textarea id="description"
                  v-model="anchor.descryption"
                  placeholder="Enter something"
                  :rows="2"
                  :max-rows="6">{{anchor.descryption}}</b-form-textarea>
          </b-form-group>
          <b-button type="submit" variant="primary">Save</b-button>
        </b-form>
      </b-col>
    </b-row>
    <!-- start map -->
    <button @click="reset">Disegna Ancora</button>
    <div style="height: 100%; width: 100%;  ">
       <vl-map ref="map" v-if="showMap" data-projection="EPSG:3857" renderer="webgl">
          <vl-view :center.sync="center" :rotation.sync="rotation" :zoom.sync="zoom"  />
          <vl-layer-tile>
             <vl-source-osm />
          </vl-layer-tile>
          <vl-feature v-if="imgStatic && image" id="static-image">
            <vl-geom-point :coordinates="coordinates" :z-index="3"></vl-geom-point>
            <vl-style-box>
              <vl-style-icon :src="imgSrc" :size="imgSize" :scale="imgScale" :anchor="imgAnchor" :rotation.sync="imgRotation"></vl-style-icon>
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
          <vl-layer-vector id="newFeatures" >
            <vl-source-vector :features.sync="newFeatures" />
          </vl-layer-vector>
          <template v-for="(item, index) in newFeatures">
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
          <vl-interaction-draw :type="drawType" source="draw-target" v-if="interactionType == 'draw'" />
       </vl-map>
    </div>
    <!-- end map -->
  </div>
</template>

<script>

import axios from 'axios'

// const features = []
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
      currentZoom: undefined,
      geocoder: undefined,
      scaleX: undefined,
      scaleY: undefined,
      selectedFeatures: [],
      drawnFeatures: [],
      newFeatures: [],
      drawType: 'Point',
      interactionType: null,
      // maxResolution: 5,
      zoom: undefined,
      precedentZoom: null,
      // maxZoom: 8,
      center: [0, 0],
      rotation: 0,
      features: [],
      showMap: true,
      image: false,
      imgSize: [],
      imgExtent: [],
      imgCenter: undefined,
      imgRotation: 0,
      imgScaleValue: 0.4,
      imgAnchor: [0, 0],
      imgStatic: true,
      imgScale: undefined,
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
                break
              }
              console.log(response.data)
              this.imgRotation = response.data.angleImage * Math.PI / 180
              this.imgScale = response.data.scaleX
              this.image = true
              this.zoom = response.data.zoom
              this.imgSize = [response.data.widthImage, response.data.heightImage]
              console.log(this.imgSize)

              for (var i in response.data.anchors) {
                axios.get(`http://localhost:3000/anchor/` + response.data.anchors[i])
                  .then(response => {
                    var type = 'Point'
                    var coord = null
                    var marker =
                    {
                      type: 'Feature',
                      id: 'feature-' + type + '-' + response.data._id,
                      properties: {},
                      geometry: {
                        type: type
                      }
                    }
                    coord = response.data.location
                    marker.geometry.coordinates = coord
                    this.features.push(marker)
                  })
                  .catch(e => {
                    this.errors.push(e)
                  })
              }

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
      })
      .catch(e => {
        this.errors.push(e)
      })
  },
  methods: {
    reset () {
      console.log(this.drawnFeatures)
      this.newFeatures = []
      this.drawnFeatures = []
      this.interactionType = 'draw'
    },
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
    }
  },
  watch: {
    drawnFeatures: function (val) {
      if (val.length > 0) {
        var index = val.length - 1
        var type = val[0].geometry.type
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
        this.anchor.location = coord
        marker.geometry.coordinates = coord
        this.newFeatures.push(marker)
        this.interactionType = null
      }
    },
    zoom: function (val) {
      // console.log('currentZoom') Per ridimensionare l'immagine in caso di zoom. Non funziona!!
      // console.log(this.zoom)
      // console.log(this.imgSize)
      if (this.precedentZoom !== null) {
        this.imgSize[0] = this.imgSize[0] + 10
        this.imgSize[1] = this.imgSize[1] + 10
      }
      this.precedentZoom = this.zoom
      // this.imgSize = this.imgSize * this.zoom
    }
  }
}
</script>
