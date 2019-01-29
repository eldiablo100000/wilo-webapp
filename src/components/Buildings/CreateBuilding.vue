<template>
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
      </b-form>
    </b-col>
  </b-row>
</template>

<script>

import axios from 'axios'

export default {
  name: 'CreateBuilding',
  data () {
    return {
      building: {}
    }
  },
  watch: {
    'building.address': function (val) {
      console.log(val)
    },
    'building.city': function (val) {
      console.log(val)
    }
  },
  methods: {
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
