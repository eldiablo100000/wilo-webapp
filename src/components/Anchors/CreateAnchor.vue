<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Add Anchor
        <b-link :href="anchorList">(Anchor List)</b-link>
      </h2>
      <b-form @submit="onSubmit">
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Enter Name">
          <b-form-input id="name" :state="state" v-model.trim="anchor.name"></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Save</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>

import axios from 'axios'

export default {
  name: 'CreateAnchor',
  data () {
    return {
      anchor: {},
      anchorId: undefined,
      floorId: undefined,
      anchorList: '',
      errors: []
    }
  },
  created () {
    this.anchorList = '#/building/' + this.$route.params.id_building + '/floor/' + this.$route.params.id_floor + '/anchors'
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.post(`http://localhost:3000/anchor/`, this.anchor)
        .then(response => {
          this.anchorId = response.data._id
          this.floorId = this.$route.params.id_floor
          axios.get(`http://localhost:3000/floor/` + this.floorId)
            .then(response => {
              this.floor = response.data
              this.floor.anchors.push(this.anchorId)
              axios.put(`http://localhost:3000/floor/` + this.floorId, this.floor)
                .then(response => {
                  this.$router.push({
                    name: 'ShowAnchor',
                    params: { id_building: this.$route.params.id_building, id_floor: this.$route.params.id_floor, id_anchor: this.anchorId }
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
