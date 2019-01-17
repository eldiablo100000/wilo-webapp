<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Edit Floor
        <router-link :to="{ name: 'ShowFloor', params: { id: floor._id } }">(Show Floor)</router-link>
      </h2>
      <b-form @submit="onSubmit">
        <b-form-group id="fieldsetHorizontal"
                  horizontal
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
    axios.get(`http://localhost:3000/floor/` + this.$route.params.id)
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
      axios.put(`http://localhost:3000/floor/` + this.$route.params.id, this.floor)
        .then(response => {
          this.$router.push({
            name: 'ShowFloor',
            params: { id: this.$route.params.id }
          })
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
}
</script>
