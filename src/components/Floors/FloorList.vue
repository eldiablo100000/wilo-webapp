<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Floor List
        <b-link :href="addFloor">(Add Floor)</b-link>
      </h2>
      <b-table striped hover :items="floors" :fields="fields">
        <template slot="actions" scope="row">
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
  name: 'FloorList',
  data () {
    return {
      fields: {
        number: { label: 'Number', sortable: true, 'class': 'text-center' },
        actions: { label: 'Action', 'class': 'text-center' }
      },
      buildingId: null,
      floorsId: [],
      floors: [],
      errors: [],
      addFloor: '#/show-building/' + this.$route.params.id + '/add-floor'
    }
  },
  created () {
    this.buildingId = this.$route.params.id
    axios.get(`http://localhost:3000/building/` + this.buildingId)
      .then(response => {
        console.log(response.data)
        this.floorsId = response.data.floors
        for (var el in this.floorsId) {
          axios.get(`http://localhost:3000/floor/` + this.floorsId[el])
            .then(response => {
              this.floors.push(response.data)
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
    details (floor) {
      this.$router.push({
        name: 'ShowFloor',
        params: { id: floor._id }
      })
    }
  }
}
</script>
