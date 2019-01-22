<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Show Floor
        <b-link :href="floorList">(Floor List)</b-link>
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
        <b-btn variant="success" @click.stop="addanchor(floor._id)">Add Anchor</b-btn>
        <b-btn variant="success" @click.stop="anchorlist(floor._id)">Anchor list</b-btn>
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
      floor: [],
      building: [],
      errors: []
    }
  },
  created () {
    this.floorList = '#/building/' + this.$route.params.id_building + '/floors'

    axios.get(`http://localhost:3000/floor/` + this.$route.params.id_floor)
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
        params: { id_floor: floorid }
      })
    },
    addanchor (floorid) {
      this.$router.push({
        name: 'CreateAnchor',
        params: { id_building: this.$route.params.id_building, id_floor: floorid }
      })
    },
    anchorlist (floorid) {
      this.$router.push({
        name: 'AnchorList',
        params: { id_building: this.$route.params.id_building, id_floor: floorid }
      })
    },
    deletefloor (floorid) {
      axios.delete('http://localhost:3000/floor/' + floorid)
        .then((result) => {
          axios.get('http://localhost:3000/building/' + this.$route.params.id_building)
            .then((result) => {
              var index = result.data.floors.indexOf(floorid)
              if (index > -1) {
                result.data.floors.splice(index, 1)
                this.building = result.data
              }
              axios.put('http://localhost:3000/building/' + this.$route.params.id_building, this.building)
                .then((result) => {
                  this.$router.push({
                    name: 'FloorList'
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

<style>
  .jumbotron {
    padding: 2rem;
  }
</style>
