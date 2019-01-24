<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Anchor List
        <b-link :href="addAnchor">(Add Anchor)</b-link>
      </h2>
      <b-table striped hover :items="anchors" :fields="fields">
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
  name: 'AnchorList',
  data () {
    return {
      fields: {
        name: { label: 'Name', sortable: true, 'class': 'text-center' },
        actions: { label: 'Action', 'class': 'text-center' },
        id_building: { label: 'Id building', sortable: true, 'class': 'text-center' },
        id_floor: { label: 'Id floor', sortable: true, 'class': 'text-center' }
      },
      anchorsId: [],
      anchors: [],
      errors: [],
      addAnchor: '#/building/' + this.$route.params.id_building + '/floor/' + this.$route.params.id_floor + '/add-anchor'
    }
  },
  created () {
    axios.get(`http://localhost:3000/anchor/`)
      .then((response) => {
        if (response.data != null) {
          this.anchors = response.data
        }
      })
      .catch(e => {
        this.errors.push(e)
      })
  },
  methods: {
    details (anchor) {
      this.$router.push({
        name: 'ShowAnchor',
        params: { id_building: this.$route.params.id_building, id_floor: this.$route.params.id_floor, id_anchor: anchor._id }
      })
    }
  }
}
</script>
