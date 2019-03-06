<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Builds List
        <b-link href="#/add-build">(Add Build)</b-link>
      </h2>
      <b-table :class="$parent.selectedTheme" striped hover :items="builds" :fields="fields">
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
  name: 'BuildList',
  data () {
    return {
      fields: {
        title: { label: 'Build Title', sortable: true },
        actions: { label: 'Action', 'class': 'text-center' },
        address: { label: 'Address', sortable: true, 'class': 'text-center' }
      },
      builds: [],
      errors: []
    }
  },
  created () {
    axios.get(`http://localhost:3000/Build`)
      .then(response => {
        this.builds = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
  },
  methods: {
    details (build) {
      this.$router.push({
        name: 'ShowBuild',
        params: { id: build._id }
      })
    }
  }
}
</script>
