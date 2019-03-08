<template>
  <div>
    <b-row>
      <b-col cols="12">
        <h2>
          Edit Anchor
          <b-link :href="anchorList">(Anchor List)</b-link>
        </h2>
        <b-form>
          <b-form-group class="fieldsetHorizontal"
                    :label-cols="4"
                    breakpoint="md"
                    label="Enter Name">
            <b-form-input id="name" :state="state" v-model.trim="anchor.name" style="width: 50%;"></b-form-input>
          </b-form-group>
          <b-form-group class="fieldsetHorizontal"
                    :label-cols="4"
                    breakpoint="md"
                    label="Enter Description">
                    <b-form-textarea id="description"
                    v-model="anchor.description"
                    placeholder="Enter something"
                    :rows="2"
                    :max-rows="6"
                    style="width: 50%;">{{anchor.description}}</b-form-textarea>
            </b-form-group>
        </b-form>
        <b-button @click="reset" style="margin-top: 2%;" variant="warning">Change Anchor</b-button>
        <b-button @click="save" variant="primary" style="margin-top: 2%;">Update</b-button>
      </b-col>
    </b-row>
    <div style="height: 70%; width: 70%; margin: 0 auto; margin-top: 2%; ">
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
  </div>
</template>

<script>
export default {
  name: 'EditAnchor',
  data () {
    return {
      anchor: {},
      floor: {},
      errors: [],
      imgStatic: true,
      image: false,
      showMap: true,
      coordinates: undefined,
      center: [0, 0],
      rotation: 0,
      zoom: undefined,
      imgSrc: '',
      imgScale: undefined,
      imgRotation: undefined,
      features: [],
      floorId: undefined,
      buildingId: undefined,
      precedentZoom: null,
      realImgScale: undefined,
      imgAnchor: [0, 0],
      clickCoord: undefined,
      drawnFeatures: [],
      drawType: 'Point',
      interactionType: null
    }
  },
  created () {
    this.anchorList = '#/building/' + this.$route.params.id_building + '/floor/' + this.$route.params.id_floor + '/anchors'
    this.floorId = this.$route.params.id_floor
    this.buildingId = this.$route.params.id_building

    this.$http.get(`http://localhost:3000/api/floor/` + this.floorId)
      .then(response => {
        this.coordinates = response.data.location
        this.center = response.data.center
        this.imgRotation = response.data.angleImage * Math.PI / 180
        this.imgScale = response.data.scaleX
        this.realImgScale = response.data.scaleX
        this.image = true
        this.zoom = response.data.zoom
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
        this.$http.get('http://localhost:3000/api/anchor/' + this.$route.params.id_anchor)
          .then(response => {
            this.anchor = response.data
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
            this.clickCoord = coord
            this.features.push(marker)
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
      this.features = []
      this.drawnFeatures = []
      this.interactionType = 'draw'
    },
    save () {
      this.$http.put(`http://localhost:3000/api/anchor/` + this.$route.params.id_anchor, this.anchor)
        .then(response => {
          this.$router.push({
            name: 'ShowAnchor',
            params: { id_building: this.$route.params.id_building, id_floor: this.$route.params.id_floor, id_anchor: this.$route.params.id_anchor }
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
        this.features.push(marker)
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
