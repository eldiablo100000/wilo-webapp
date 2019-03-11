<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Edit Building
        <router-link :to="{ name: 'ShowBuilding', params: { id: building._id } }">(Show Building)</router-link>
      </h2>
      <b-form @submit="onSubmit">
        <b-form-group
          label="Enter Title"
          style="width: 50%; margin: 0 auto; margin-top: 2%;">
          <b-form-input id="title" :state="state" v-model.trim="building.title"></b-form-input>
        </b-form-group>
        <b-form-group
          label="Enter City"
          style="width: 50%; margin: 0 auto; margin-top: 2%;">
          <b-form-input id="city" :state="state" v-model.trim="building.city"></b-form-input>
        </b-form-group>
        <b-form-group
          label="Enter Country"
          style="width: 50%; margin: 0 auto; margin-top: 2%;">
          <b-form-input id="city" :state="state" v-model.trim="building.country"></b-form-input>
        </b-form-group>
        <b-form-group
          label="Enter Road"
          style="width: 50%; margin: 0 auto; margin-top: 2%;">
          <b-form-input id="city" :state="state" v-model.trim="building.road"></b-form-input>
        </b-form-group>
        <b-form-group
          label="Enter Number"
          style="width: 50%; margin: 0 auto; margin-top: 2%;">
          <b-form-input id="city" :state="state" v-model.trim="building.number"></b-form-input>
        </b-form-group>
        <b-form-group
          label="Enter Postcode"
          style="width: 50%; margin: 0 auto; margin-top: 2%;">
          <b-form-input id="city" :state="state" v-model.trim="building.postcode"></b-form-input>
        </b-form-group>
        <!-- start map -->
        <div style="height: 50%; width: 50%; margin: 0 auto; margin-top: 2%; ">
           <vl-map ref="map" v-if="showMap" data-projection="EPSG:3857" renderer="webgl">
              <vl-view :center.sync="center" :rotation.sync="rotation" :zoom.sync="zoom"  />
              <vl-layer-tile>
                <vl-source-osm />
              </vl-layer-tile>
              <vl-feature v-if="imgStatic && image" id="static-image">
                 <vl-geom-point :coordinates="coordinates" :z-index="3"></vl-geom-point>
                 <vl-style-box>
                    <vl-style-icon :src="imgSrc" :size="imgScaleValue" :anchor="imgAnchor" :rotation.sync="imgRotation"></vl-style-icon>
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
           </vl-map>
        </div>
        <!-- end map -->
        <b-form-group
          label="Enter Description"
          style="width: 50%; margin: 0 auto; margin-top: 2%;">
            <b-form-textarea id="description"
              v-model="building.description"
              placeholder="Enter something"
              :rows="2"
              :max-rows="6">{{building.description}}</b-form-textarea>
        </b-form-group>
        <b-button type="submit" variant="primary" style="margin-top: 2%;">Update</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import * as eventCondition from 'ol/events/condition'
import Geocoder from 'ol-geocoder'

const features = [
]

export default {
  name: 'EditBuilding',

  data () {
    return {
      building: {},
      buildingId: '',
      center: [0, 0],
      coordinates: [],
      errors: [],
      features,
      floorList: '',
      geocoder: undefined,
      image: false,
      imgAnchor: [0, 0],
      imgRotation: 0,
      imgScaleValue: 0.4,
      imgSrc: '',
      imgStatic: true,
      rotation: 0,
      scaleX: undefined,
      scaleY: undefined,
      showMap: true,
      state: 'required',
      user: {},
      userId: '',
      zoom: 19
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      this.$http.put(`http://localhost:3000/api/building/` + this.$route.params.id_building, this.building)
        .then(response => {
          if (this.building.id_user === JSON.parse(localStorage.getItem('user'))._id) {
            this.$router.push({
              name: 'ShowBuilding',
              params: { id_building: this.$route.params.id_building }
            })
          } else {
            this.$router.push({
              name: 'AdminBuildingList'
            })
          }
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  },
  created () {
    this.features = []
    this.$http.get(`http://localhost:3000/api/building/` + this.$route.params.id_building)
      .then(response => {
        this.building = response.data
        var tmp = {
          id: response.data.title,
          type: 'Feature',
          properties: null,
          geometry: {
            type: 'Point',
            coordinates: response.data.coordinates
          }
        }
        this.center = response.data.coordinates
        this.features.push(tmp)
      })
      .catch(e => {
        this.errors.push(e)
      })
  },
  computed: {
    selectCondition () {
      return this.selectByHover ? eventCondition.pointerMove : eventCondition.singleClick
    }
  },
  mounted () {
    // now ol.Map instance is ready and we can work with it directly
    this.geocoder = new Geocoder('nominatim', {
      provider: 'osm',
      lang: 'it',
      placeholder: 'Search for ...',
      limit: 5,
      debug: true,
      autoComplete: true,
      keepOpen: true
    })
    this.$refs.map.$createPromise.then(() => {
      this.$refs.map.$map.addControl(this.geocoder)
      var that = this
      this.geocoder.on('addresschosen', function (evt) {
        that.building.coordinates = evt.coordinate
        that.building.road = evt.address.details.road
        that.building.city = evt.address.details.city
        that.building.country = evt.address.details.country
        that.building.number = evt.address.details.houseNumber
        that.building.postcode = evt.address.details.postcode
      })
    })
  }
}
</script>
