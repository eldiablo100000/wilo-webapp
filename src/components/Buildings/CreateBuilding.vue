<template>
   <div>
      <b-row>
         <b-col cols="12">
            <h2>
               Add Building
               <b-link @click.stop="GoToBuildingList()">(Building List)</b-link>
            </h2>
            <b-form @submit="onSubmit">
               <b-form-group class="fieldsetHorizontal"
                  :label-cols="4"
                  label="Enter Title">
                  <b-form-input id="title" :state="state" v-model.trim="building.title"></b-form-input>
               </b-form-group>
               <!--<b-form-group class="fieldsetHorizontal"
                  :label-cols="4"
                  breakpoint="md"
                  label="Enter Address">
                  <b-form-input id="address" :state="state" v-model.trim="building.address"></b-form-input>
                  </b-form-group>
                  <b-form-group class="fieldsetHorizontal"
                  :label-cols="4"
                  breakpoint="md"
                  label="Enter City">
                  <b-form-input  id="city" :state="state" v-model.trim="building.city"></b-form-input>
                  </b-form-group> -->
               <b-form-group class="fieldsetHorizontal"
                  :label-cols="4"
                  breakpoint="md"
                  label="Enter Address">
                  <!-- start map -->
                  <div style="height: 50%; width: 50%; margin: 0 auto; ">
                     <vl-map ref="map" v-if="showMap" data-projection="EPSG:3857" renderer="webgl">
                        <vl-view :center.sync="center" :rotation.sync="rotation" :zoom.sync="zoom"  />
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
                  <!-- end map -->
               </b-form-group>
               <b-form-group class="fieldsetHorizontal"
                  :label-cols="4"
                  breakpoint="md"
                  label="Enter Description">
                  <b-form-textarea id="description"
                     v-model="building.description"
                     placeholder="Enter something"
                     :rows="2"
                     :max-rows="6">{{building.description}}</b-form-textarea>
               </b-form-group>
               <b-button type="submit" variant="primary">Save</b-button>
            </b-form>
         </b-col>
      </b-row>
   </div>
</template>

<script>

import axios from 'axios'
import * as eventCondition from 'ol/events/condition'
import Geocoder from 'ol-geocoder'

const features = [
]

export default {
  name: 'CreateBuilding',

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
      rotation: 0,
      scaleX: undefined,
      scaleY: undefined,
      showMap: true,
      state: 'required',
      user: {},
      userId: '',
      zoom: 19,
      continuePost: undefined,
      buildingName: []
    }
  },
  methods: {
    GoToBuildingList () {
      this.$router.push({
        name: 'BuildingList'
      })
    },

    onSubmit (evt) {
      evt.preventDefault()
      this.continuePost = true
      if (this.building.title == null || this.building.title === '') {
        alert('insert a building\'s name')
        this.continuePost = false
      }
      if (this.building.coordinates == null) {
        alert('insert an valid address')
        this.continuePost = false
      }
      for (var i in this.buildingName) {
        if (this.building.title === this.buildingName[i]) {
          alert('name building already insert')
          this.continuePost = false
        }
        if (!this.continuePost) break
      }
      if (this.continuePost) {
        this.userId = JSON.parse(localStorage.getItem('user'))._id
        this.building.id_user = this.userId
        axios.post(`http://localhost:3000/building`, this.building)
          .then(response => {
            this.buildingId = response.data._id
            axios.get(`http://localhost:3000/user/` + this.userId)
              .then(response => {
                this.user = response.data.user
                this.user.buildings.push(this.buildingId)
                axios.put(`http://localhost:3000/user/` + this.userId, this.user)
                  .then(response => {
                    this.$router.push({
                      name: 'ShowBuilding',
                      params: { id_building: this.buildingId }
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
    }
  },
  created () {
    this.features = []
    this.floorList = '#/building/' + this.$route.params.id_building + '/floors'
    axios.get(`http://localhost:3000/user/` + JSON.parse(localStorage.getItem('user'))._id)
      .then(response => {
        for (var el in response.data.user.buildings) {
          axios.get('http://localhost:3000/building/' + response.data.user.buildings[el])
            .then((response) => {
              console.log(response.data)
              this.buildingName.push(response.data.title)
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
        }
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
    // this.$refs.map.$map.addControl(geocoder)
    // console.log(this.$refs.map.$map.getControls())
    this.$refs.map.$createPromise.then(() => {
      this.$refs.map.$map.addControl(this.geocoder)
      // console.log(this.$refs.map.$map.getControls())
      var that = this
      this.geocoder.on('addresschosen', function (evt) {
        // it's up to you
        console.log(evt)
        that.building.coordinates = evt.coordinate
        that.building.road = evt.address.details.road
        that.building.city = evt.address.details.city
        that.building.country = evt.address.details.country
        that.building.number = evt.address.details.houseNumber
        that.building.postcode = evt.address.details.postcode
        console.log(that.building)
      })
    })
  },
  watch: {
    features: function (val) {
      console.log(val)
    }
  }
}
</script>
