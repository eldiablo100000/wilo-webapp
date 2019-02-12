<template>
  <div>
    <b-row>
      <b-col cols="12">
        <h2>
          Show Building
          <b-link @click.stop="GoToBuildingList()">(Building List)</b-link>
        </h2>
        <b-jumbotron>
          <template slot="header">
            {{building.title}}
          </template>
          <template slot="lead">
            <!-- Title: {{building.title}}<br> -->
            Address: {{building.address}}<br>
            City: {{building.city}}<br>
            Floors: {{numbers}}<br>
            Description: {{building.description}}<br>
          </template>
          <MapComponent>
          </MapComponent>
          <hr class="my-4">
          <p>
            Updated Date: {{building.updated_date}}
          </p>
          <b-btn variant="success" @click.stop="addfloor(building._id)">Add Floor</b-btn>
          <b-btn variant="warning" @click.stop="floorlist(building._id)">Floor List</b-btn>

          <b-btn variant="success" @click.stop="editbuilding(building._id)">Edit</b-btn>
          <b-btn variant="danger" @click.stop="deletebuilding(building._id)">Delete</b-btn>
        </b-jumbotron>
      </b-col>
    </b-row>
  </div>
</template>

<script>

import axios from 'axios'
import MapComponent from '../MapComponent'

export default {
  name: 'ShowBuilding',
  components: {
    MapComponent
  },
  data () {
    return {
      building: [],
      floors: [],
      numbers: [],
      errors: [],
      user: {}
    }
  },
  created () {
    axios.get(`http://localhost:3000/building/` + this.$route.params.id_building)
      .then(response => {
        if (response.data != null) {
          this.building = response.data
          for (var el in response.data.floors) {
            axios.get(`http://localhost:3000/floor/` + response.data.floors[el])
              .then(response => {
                this.floors.push(response.data)
                this.numbers.push(response.data.number)
              })
              .catch(e => {
                this.errors.push(e)
              })
          }
        }
      })
      .catch(e => {
        this.errors.push(e)
      })
  },
  methods: {
    GoToBuildingList () {
      this.$router.push({
        name: 'BuildingList'
      })
    },
    addfloor (buildingid) {
      this.$router.push({
        name: 'CreateFloor',
        params: { id_building: buildingid }
      })
    },
    floorlist (buildingid) {
      this.$router.push({
        name: 'FloorList',
        params: { id_building: buildingid }
      })
    },
    editbuilding (buildingid) {
      this.$router.push({
        name: 'EditBuilding',
        params: { id_building: buildingid }
      })
    },
    deletebuilding (buildingid) {
      axios.delete('http://localhost:3000/building/' + buildingid)
        .then((result) => {
          axios.get('http://localhost:3000/user/' + this.$cookies.get('user')._id)
            .then(result => {
              var index = result.data.buildings.indexOf(buildingid)
              if (index > -1) {
                result.data.buildings.splice(index, 1)
                this.user = result.data
              }
              axios.put('http://localhost:3000/user/' + this.$cookies.get('user')._id, this.user)
                .then(result => {
                  this.$router.push({
                    name: 'BuildingList'
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
