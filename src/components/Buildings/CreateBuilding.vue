<template>
   <div>
      <b-row>
         <b-col cols="12">
            <h2>
               Add Building
               <b-link @click.stop="GoToBuildingList()">(Building List)</b-link>
            </h2>
            <b-form @submit="onSubmit">
               <b-form-group
                  label="Enter Title"
                  style="width: 50%; margin: 0 auto; margin-top: 2%;">
                  <b-form-input id="title" :state="state" v-model.trim="building.title"></b-form-input>
               </b-form-group>
               <b-form-group
                  label="Enter Address"
                  style="width: 50%; margin: 0 auto; margin-top: 2%;">
                  <!-- start map -->
                  <div>
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
               <b-form-group
                  label="Enter Description"
                  style="width: 50%; margin: 0 auto; margin-top: 2%;">
                  <b-form-textarea id="description"
                     v-model="building.description"
                     placeholder="Enter something"
                     :rows="2"
                     :max-rows="6">{{building.description}}</b-form-textarea>
               </b-form-group>
               <b-button type="submit" variant="primary" style="margin-top: 2%;">Save</b-button>
            </b-form>
         </b-col>
      </b-row>
   </div>
</template>

<script>
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
        this.$http.post(`http://localhost:3000/api/building`, this.building)
          .then(response => {
            this.buildingId = response.data._id
            this.$http.get(`http://localhost:3000/auth/user/` + this.userId)
              .then(response => {
                this.user = response.data.user
                this.user.buildings.push(this.buildingId)
                this.$http.put(`http://localhost:3000/auth/user/` + this.userId, this.user)
                  .then(response => {
                    this.$router.push({
                      name: 'ShowBuilding',
                      params: { id_building: this.buildingId }
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
  created () {
    this.features = []
    this.floorList = '#/building/' + this.$route.params.id_building + '/floors'
    this.$http.get(`http://localhost:3000/auth/user/` + JSON.parse(localStorage.getItem('user'))._id)
      .then(response => {
        for (var el in response.data.user.buildings) {
          this.$http.get('http://localhost:3000/api/building/' + response.data.user.buildings[el])
            .then((response) => {
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

<style>
  .gcd-road{
    color: #ff6600;
  }
</style>
