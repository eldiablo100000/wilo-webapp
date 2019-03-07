<template>
  <div>
    <b-row>
      <b-col cols="12">
        <h2>
          Show Anchor
          <b-link :href="anchorList">(Anchor List)</b-link>
        </h2>
        <b-jumbotron>
          <template slot="header">
            {{anchor.name}}
          </template>
          <template slot="lead">
            name: {{anchor.name}}<br>
          </template>
          <template slot="lead">
            description: {{anchor.description}}<br>
          </template>
          <hr class="my-4">
          <p>
            Updated Date: {{anchor.updated_date}}
          </p>
          <b-btn variant="success" @click.stop="editanchor(anchor._id)">Edit</b-btn>
          <b-btn variant="danger" @click.stop="deleteanchor(anchor._id)">Delete</b-btn>
        </b-jumbotron>
      </b-col>
    </b-row>
    <div style="height: 70%; width: 70%; margin: 0 auto;  ">
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
        </vl-map>
      </div>
    </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'ShowAnchor',
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
      clickCoord: undefined

    }
  },
  created () {
    this.anchorList = '#/building/' + this.$route.params.id_building + '/floor/' + this.$route.params.id_floor + '/anchors'
    this.floorId = this.$route.params.id_floor
    this.buildingId = this.$route.params.id_building

    axios.get(`http://localhost:3000/floor/` + this.floorId)
      .then(response => {
        this.coordinates = response.data.location
        this.center = response.data.center
        this.imgRotation = response.data.angleImage * Math.PI / 180
        this.imgScale = response.data.scaleX
        this.realImgScale = response.data.scaleX
        this.image = true
        this.zoom = response.data.zoom
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
        axios.get('http://localhost:3000/anchor/' + this.$route.params.id_anchor)
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
    editanchor (anchorid) {
      this.$router.push({
        name: 'EditAnchor',
        params: { id_anchor: anchorid }
      })
    },
    deleteanchor (anchorid) {
      axios.delete('http://localhost:3000/anchor/' + anchorid)
        .then((result) => {
          axios.get('http://localhost:3000/floor/' + this.$route.params.id_floor)
            .then((result) => {
              var index = result.data.anchors.indexOf(anchorid)
              if (index > -1) {
                result.data.anchors.splice(index, 1)
                this.floor = result.data
              }
              axios.put('http://localhost:3000/floor/' + this.$route.params.id_floor, this.floor)
                .then((result) => {
                  this.$router.push({
                    name: 'AnchorList'
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
  .jumbotron {
    padding: 2rem;
  }
  .overlay {
    color: #ff8533;
    background-color: #000013;
    opacity: 0.7;
  }
</style>
