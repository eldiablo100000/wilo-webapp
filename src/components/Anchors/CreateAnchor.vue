<template>
  <div>
    <b-row>
      <b-col cols="12">
        <h2>
          Add Anchor
          <b-link :href="anchorList">(Anchor List)</b-link>
        </h2>
        <b-form>
          <b-form-group
            label="Enter Name"
            style="width: 50%; margin: 0 auto; margin-top: 2%;">
            <b-form-input id="name" :state="state" v-model.trim="anchor.name"></b-form-input>
          </b-form-group>
          <b-form-group
            label="Enter Description"
            style="width: 50%; margin: 0 auto; margin-top: 2%;">
            <b-form-textarea id="description"
            v-model="anchor.description"
            placeholder="Enter something"
            :rows="2"
            :max-rows="6">{{anchor.description}}</b-form-textarea>
          </b-form-group>
        </b-form>
      </b-col>
    </b-row>
    <b-button @click="reset" style="margin-top: 2%;" variant="info">Draw Anchor</b-button>
      <b-button @click="save" variant="primary" style="margin-top: 2%;">Save</b-button>
    <div style="height: 80%; width: 80%; margin: 0 auto; margin-top: 2%;">
       <vl-map ref="map" v-if="showMap" data-projection="EPSG:3857" renderer="webgl">
          <vl-view :center.sync="center" :rotation.sync="rotation" :zoom.sync="zoom"   />
          <vl-layer-tile>
             <vl-source-osm />
          </vl-layer-tile>
          <vl-feature v-if="imgStatic && image" id="static-image">
            <vl-geom-point :coordinates="coordinates" :z-index="3"></vl-geom-point>
            <vl-style-box>
              <vl-style-icon id="image" :src="imgSrc" :opacity="0.6" :scale.sync="imgScale" :anchor="imgAnchor" :rotation.sync="imgRotation"></vl-style-icon>
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
              <vl-overlay class="overlay" v-if="clickCoord" :key="index" :position="clickCoord">
                {{ clickCoord }}
                <b-button @click="clickCoord = undefined" variant="primary">Close</b-button>
              </vl-overlay>
            </vl-feature>
          </template>
          <vl-layer-vector id="draw-pane" :z-index="0">
          <vl-source-vector :features.sync="drawnFeatures" ident="draw-target" />
        </vl-layer-vector>
        <vl-interaction-draw :type="drawType" source="draw-target" v-if="interactionType == 'draw'" />
      </vl-map>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
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
      zoom: undefined,
      precedentZoom: null,
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
      realImgScale: undefined,
      coordinates: [0, 0],
      imgSrc: '',
      clickCoord: undefined,
      continuePost: undefined,
      anchorsName: []
    }
  },
  created () {
    this.anchorList = '#/building/' + this.$route.params.id_building + '/floor/' + this.$route.params.id_floor + '/anchors'
    this.floorId = this.$route.params.id_floor
    this.$http.get(`http://localhost:3000/api/floor/` + this.floorId)
      .then((response) => {
        if (response.data != null) {
          this.floor = response.data
          this.coordinates = response.data.location
          this.center = response.data.center
          this.imgRotation = response.data.angleImage * Math.PI / 180
          this.imgScale = response.data.scaleX
          this.realImgScale = response.data.scaleX
          this.image = true
          this.zoom = response.data.zoom
          this.imgSize = [response.data.widthImage, response.data.heightImage]

          for (var i in response.data.anchors) {
            this.$http.get(`http://localhost:3000/api/anchor/` + response.data.anchors[i])
              .then(response => {
                this.anchorsName.push(response.data.name)
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

          this.$http.get(`http://localhost:3000/api/image/` + response.data.image[0])
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
    reset () {
      this.newFeatures = []
      this.drawnFeatures = []
      this.interactionType = 'draw'
    },
    save () {
      this.continuePost = true
      if (this.anchor.location == null) {
        this.continuePost = false
        alert('insert an anchor')
      }
      if (this.anchor.name == null || this.anchor.name === '') {
        this.continuePost = false
        alert('insert an anchor name')
      }
      this.anchor.id_building = this.$route.params.id_building
      this.anchor.id_floor = this.$route.params.id_floor
      this.anchor.id_user = JSON.parse(localStorage.getItem('user'))._id
      this.floorId = this.$route.params.id_floor
      for (var i in this.anchorsName) {
        if (this.anchor.name === this.anchorsName[i]) {
          this.continuePost = false
          alert('anchor\'s name already insert')
          break
        }
      }
      if (this.continuePost) {
        this.$http.post(`http://localhost:3000/api/anchor/`, this.anchor)
          .then(response => {
            this.anchorId = response.data._id
            this.$http.get(`http://localhost:3000/api/floor/` + this.floorId)
              .then(response => {
                this.floor = response.data
                this.floor.anchors.push(this.anchorId)
                this.$http.put(`http://localhost:3000/api/floor/` + this.floorId, this.floor)
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
        this.clickCoord = coord
      }
    },
    zoom: function (val) {
      this.imgScale = this.realImgScale
      if (this.precedentZoom !== null) {
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
  .overlay {
    color: #ff8533;
    background-color: #000013;
    opacity: 0.7;
  }
</style>
