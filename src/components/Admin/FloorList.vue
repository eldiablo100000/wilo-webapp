<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Floor List
        <b-link :href="addFloor">(Add Floor)</b-link>
      </h2>
      <b-table striped hover :items="floors" :fields="fields">
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
  name: 'FloorList',
  data () {
    return {
      fields: {
        number: { label: 'Number', sortable: true, 'class': 'text-center' },
        actions: { label: 'Action', 'class': 'text-center' },
        id_building: { label: 'Id building', sortable: true, 'class': 'text-center' }
      },
      floorsId: [],
      floors: [],
      errors: [],
      addFloor: '#/building/' + this.$route.params.id_building + '/add-floor'
    }
  },
  created () {
    axios.get(`http://localhost:3000/floor/`)
      .then((response) => {
        if (response.data != null) {
          this.floors = response.data
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
        params: { id_building: this.$route.params.id_building, id_floor: floor._id }
      })
    }
  }
}
</script>
