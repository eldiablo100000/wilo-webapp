<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Building List
        <b-link @click.stop="GoToCreateBuilding()">(Add Building)</b-link>
      </h2>
      <b-table striped hover :items="buildings" :fields="fields">
        <template slot="actions" slot-scope="row">
          <b-btn size="sm" @click.stop="details(row.item)">Details</b-btn>
        </template>
      </b-table>
      <ul v-if="errors && errors.length">
        <li v-for="error of errors" :key="error">
          {{error.message}}
        </li>
      </ul>
    </b-col>
  </b-row>
</template>

<script>

import axios from 'axios'

export default {
  name: 'BuildingList',
  data () {
    return {
      fields: {
        title: { label: 'Title', sortable: true, 'class': 'text-center' },
        address: { label: 'Address', sortable: true },
        city: { label: 'City', sortable: true, 'class': 'text-center' },
        actions: { label: 'Action', 'class': 'text-center' }
      },
      buildings: [],
      errors: []
    }
  },
  created () {
    axios.get(`http://localhost:3000/user/` + this.$cookies.get('user')._id)
      .then(response => {
        for (var el in response.data.buildings) {
          axios.get('http://localhost:3000/building/' + response.data.buildings[el])
            .then(response => {
              this.buildings.push(response.data)
            })
            .catch(e => {
              this.errors.push(e)
            })
        }
      })
      .catch(e => {
        this.errors.push(e)
      })
  },
  methods: {
    GoToCreateBuilding () {
      this.$router.push({
        name: 'CreateBuilding'
      })
    },
    details (building) {
      this.$router.push({
        name: 'ShowBuilding',
        params: { id_building: building._id }
      })
    }
  }
}
</script>
