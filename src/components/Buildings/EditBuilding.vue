<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Edit Building
        <router-link :to="{ name: 'ShowBuilding', params: { id: building._id } }">(Show Building)</router-link>
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
          <b-form-input id="city" :state="state" v-model.trim="building.city"></b-form-input>
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
        <b-button type="submit" variant="primary">Update</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>

import axios from 'axios'

export default {
  name: 'EditBuilding',
  data () {
    return {
      building: {}
    }
  },
  created () {
    axios.get(`http://localhost:3000/building/` + this.$route.params.id_building)
      .then(response => {
        this.building = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.put(`http://localhost:3000/building/` + this.$route.params.id_building, this.building)
        .then(response => {
          this.$router.push({
            name: 'ShowBuilding',
            params: { id_building: this.$route.params.id_building }
          })
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
}
</script>
