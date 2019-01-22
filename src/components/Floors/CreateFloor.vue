<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Add Floor
        <b-link :href="floorList">(Floor List)</b-link>
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
        <b-btn variant="success" @click.stop="uploadImage()">Upload Image</b-btn>
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
      floor: {},
      floorId: undefined,
      buildingId: undefined,
      floorList: ''
    }
  },
  created () {
    this.floorList = '#/building/' + this.$route.params.id_building + '/floors'
  },
  methods: {
    uploadImage () {
      alert('ciao')
    },
    onSubmit (evt) {
      evt.preventDefault()
      axios.post(`http://localhost:3000/floor`, this.floor)
        .then(response => {
          this.floorId = response.data._id
          this.buildingId = this.$route.params.id_building
          axios.get(`http://localhost:3000/building/` + this.buildingId)
            .then(response => {
              this.building = response.data
              this.building.floors.push(this.floorId)
              axios.put(`http://localhost:3000/building/` + this.buildingId, this.building)
                .then(response => {
                  this.$router.push({
                    name: 'FloorList',
                    params: { id_building: this.$route.params.id_building }
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
}
</script>
