<template>
  <div>
    <b-row>
      <b-col cols="12">
        <h2>
          Add Building
          <b-link href="#/buildings">(Building List)</b-link>
        </h2>
        <b-form @submit="onSubmit">
          <b-form-group id="fieldsetHorizontal"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    label="Enter Title">
            <b-form-input id="title" :state="state" v-model.trim="building.title"></b-form-input>
          </b-form-group>
          <b-form-group id="fieldsetHorizontal"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    label="Enter Address">
            <b-form-input id="address" :state="state" v-model.trim="building.address"></b-form-input>
          </b-form-group>
          <b-form-group id="fieldsetHorizontal"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    label="Enter City">
            <b-form-input  id="city" :state="state" v-model.trim="building.city"></b-form-input>
          </b-form-group>
          <b-form-group id="fieldsetHorizontal"
                    horizontal
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
          <b-button v-if="checked" @click="onCheck" variant="success">Check address</b-button>
          <b-button v-if="!checked" @click="onCheck" variant="danger">Check address</b-button>
        </b-form>
      </b-col>
    </b-row>
    <MapComponent></MapComponent>
  </div>
</template>

<script>

import axios from 'axios'
import MapComponent from '../MapComponent.vue'

export default {
  name: 'CreateBuilding',
  components: {
    MapComponent
  },
  data () {
    return {
      building: {
        address: '',
        city: ''
      },
      checked: false,
      state: 'required'
    }
  },
  watch: {
    'building.address': function (val) {
      console.log(val)
      document.getElementsByClassName('gcd-gl-control')[0].className += ' gcd-gl-expanded'
      var string = val + ' ' + this.building.city
      document.getElementById('gcd-input-query').value = ''
      for (var i in string) {
        document.getElementById('gcd-input-query').value += string[i]
      }
      // setTimeout(function () { document.getElementById('gcd-input-query').focus() }, 2000)
    },
    'building.city': function (val) {
      console.log(val)
      document.getElementsByClassName('gcd-gl-control')[0].className += ' gcd-gl-expanded'
      var string = this.building.address + ' ' + val
      document.getElementById('gcd-input-query').value = ''
      for (var i in string) {
        document.getElementById('gcd-input-query').value += string[i]
      }
    }
  },
  methods: {
    sleep (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    onCheck: async function (evt) {
      evt.preventDefault()
      // document.getElementsByClassName('gcd-gl-control')[0].className += ' gcd-gl-expanded'
      // var string = this.building.address + ' ' + this.building.city
      // for (var i in string) {
      //   document.getElementById('gcd-input-query').value += string[i]
      // }
      document.getElementById('gcd-input-query').focus()
      // await this.sleep(3000)
      this.pressChar(document.getElementById('gcd-input-query'), 'a')
      // var results = document.getElementsByClassName('gcd-gl-result')
      // if (results.length > 1) {
      //   this.checked = true
      // } else { this.checked = false }
    },
    pressChar (el, keyCode) {
      try {
        var eventObj = document.createEventObject ? document.createEventObject() : document.createEvent('Events')

        if (eventObj.initEvent) {
          eventObj.initEvent('keypress', true, true)
        }

        eventObj.keyCode = keyCode
        eventObj.which = keyCode

        el.dispatchEvent ? el.dispatchEvent(eventObj) : el.fireEvent('onkeydown', eventObj)
        console.log(eventObj)
      } catch (e) {
        console.log(e)
        alert('Your browser does not support this example!')
      }
    },
    onSubmit (evt) {
      evt.preventDefault()
      axios.post(`http://localhost:3000/building`, this.building)
        .then(response => {
          this.$router.push({
            name: 'ShowBuilding',
            params: { id_building: response.data._id }
          })
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
}
</script>
