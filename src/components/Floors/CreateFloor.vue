<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Add Floor
        <b-link href="#/floors">(Floor List)</b-link>
      </h2>
      <b-form @submit="onSubmit">
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Enter Number">
          <b-form-input id="number" :state="state" v-model.trim="floor.number"></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Save</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>

import axios from 'axios'

export default {
  name: 'CreateFloor',
  data () {
    return {
      floor: {}
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.post(`http://localhost:3000/floor`, this.floor)
        .then(response => {
          this.$router.push({
            name: 'ShowFloor',
            params: { id: response.data._id }
          })
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
}
</script>
