<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Edit Floor
        <b-link href="#/floors">(Floor List)</b-link>
      </h2>
      <b-jumbotron>
        <template slot="header">
          {{floor.number}}
        </template>
        <template slot="lead">
          number: {{floor.number}}<br>
        </template>
        <hr class="my-4">
        <p>
          Updated Date: {{floor.updated_date}}
        </p>
        <b-btn variant="success" @click.stop="editfloor(floor._id)">Edit</b-btn>
        <b-btn variant="danger" @click.stop="deletefloor(floor._id)">Delete</b-btn>
      </b-jumbotron>
    </b-col>
  </b-row>
</template>

<script>

import axios from 'axios'

export default {
  name: 'ShowFloor',
  data () {
    return {
      floor: []
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
    editfloor (floorid) {
      this.$router.push({
        name: 'EditFloor',
        params: { id: floorid }
      })
    },
    deletefloor (floorid) {
      axios.delete('http://localhost:3000/floor/' + floorid)
        .then((result) => {
          this.$router.push({
            name: 'FloorList'
          })
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
}
</script>

<style>
  .jumbotron {
    padding: 2rem;
  }
</style>
