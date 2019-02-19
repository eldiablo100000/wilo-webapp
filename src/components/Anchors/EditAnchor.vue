<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Edit Anchor
        <router-link :to="{ name: 'EditAnchor', params: { id: anchor._id } }">(Edit Anchor)</router-link>
      </h2>
      <b-form @submit="onSubmit">
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Enter Name">
          <b-form-input id="name" :state="state" v-model.trim="anchor.name"></b-form-input>
        </b-form-group>
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Enter Description">
                  <b-form-textarea id="description"
                  v-model="anchor.descryption"
                  placeholder="Enter something"
                  :rows="2"
                  :max-rows="6">{{anchor.descryption}}</b-form-textarea>
          </b-form-group>
        <b-button type="submit" variant="primary">Update</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>

import axios from 'axios'

export default {
  name: 'EditAnchor',
  data () {
    return {
      anchor: {}
    }
  },
  created () {
    axios.get(`http://localhost:3000/anchor/` + this.$route.params.id_anchor)
      .then(response => {
        this.anchor = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.put(`http://localhost:3000/anchor/` + this.$route.params.id_anchor, this.anchor)
        .then(response => {
          this.$router.push({
            name: 'ShowAnchor',
            params: { id_building: this.$route.params.id_building, id_floor: this.$route.params.id_floor, id_anchor: this.$route.params.id_anchor }
          })
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
}
</script>
