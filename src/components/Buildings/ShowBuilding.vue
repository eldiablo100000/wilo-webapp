<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Edit Building
        <b-link href="#/building">(Building List)</b-link>
      </h2>
      <b-jumbotron>
        <template slot="header">
          {{building.title}}
        </template>
        <template slot="lead">
          Title: {{building.title}}<br>
          Description: {{building.description}}<br>
          Address: {{building.address}}<br>
          City: {{building.city}}<br>
          Floors: {{building.floors}}<br>
        </template>
        <hr class="my-4">
        <p>
          Updated Date: {{building.updated_date}}
        </p>
        <b-btn variant="success" @click.stop="addfloor(building._id)">Add Floor</b-btn>
        <b-btn variant="success" @click.stop="editbuilding(building._id)">Edit</b-btn>
        <b-btn variant="danger" @click.stop="deletebuilding(building._id)">Delete</b-btn>
      </b-jumbotron>
    </b-col>
  </b-row>
</template>

<script>

import axios from 'axios'

export default {
  name: 'ShowBuilding',
  data () {
    return {
      building: []
    }
  },
  created () {
    axios.get(`http://localhost:3000/building/` + this.$route.params.id)
      .then(response => {
        this.building = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
  },
  methods: {
    addfloor (buildingid) {
      this.$router.push({
        name: 'CreateFloor',
        params: { id: buildingid }
      })
    },
    editbuilding (buildingid) {
      this.$router.push({
        name: 'EditBuilding',
        params: { id: buildingid }
      })
    },
    deletebuilding (buildingid) {
      axios.delete('http://localhost:3000/building/' + buildingid)
        .then((result) => {
          this.$router.push({
            name: 'BuildingList'
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
