<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Book List
        <b-link href="#/add-building">(Add Building)</b-link>
      </h2>
      <b-table striped hover :items="buildings" :fields="fields">
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
  name: 'BookList',
  data () {
    return {
      fields: {
        title: { label: 'Title', sortable: true, 'class': 'text-center' },
        address: { label: 'Address', sortable: true },
        actions: { label: 'Action', 'class': 'text-center' }
      },
      buildings: [],
      errors: []
    }
  },
  created () {
    axios.get(`http://localhost:3000/building`)
      .then(response => {
        this.buildings = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
  },
  methods: {
    details (building) {
      this.$router.push({
        name: 'ShowBuilding',
        params: { id: building._id }
      })
    }
  }
}
</script>
