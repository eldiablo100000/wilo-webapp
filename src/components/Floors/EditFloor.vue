<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Edit Floor
        <router-link :to="{ name: 'ShowFloor', params: { id: floor._id } }">(Show Floor)</router-link>
      </h2>
      <b-form @submit="onSubmit">
        <b-form-group class="fieldsetHorizontal"
                  :label-cols="4"
                  breakpoint="md"
                  label="Enter Number">
          <b-form-input id="number" :state="state" v-model.trim="floor.number"></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Update</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>

import axios from 'axios'

export default {
  name: 'EditFloor',
  data () {
    return {
      floor: {}
    }
  },
  created () {
    axios.get(`http://localhost:3000/floor/` + this.$route.params.id_floor)
      .then(response => {
        this.floor = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.put(`http://localhost:3000/floor/` + this.$route.params.id_floor, this.floor)
        .then(response => {
          this.$router.push({
            name: 'ShowFloor',
            params: { id_building: this.$route.params.id_building, id_floor: this.$route.params.id_floor }
          })
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
}
</script>
