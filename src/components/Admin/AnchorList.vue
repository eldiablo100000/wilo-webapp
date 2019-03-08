<template>
  <div style="height: 100vh;">
    <b-row>
      <b-col cols="12">
        <h2>
          Anchor List
        </h2>
        <b-table :class="$parent.selectedTheme" striped hover :items="anchors" :fields="fields">
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
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'AnchorList',
  data () {
    return {
      fields: {
        _id: { label: 'ID', sortable: true, 'class': 'text-center' },
        name: { label: 'Name', sortable: true, 'class': 'text-center' },
        id_user: { label: 'ID user', sortable: true, 'class': 'text-center' },
        id_building: { label: 'ID building', sortable: true, 'class': 'text-center' },
        id_floor: { label: 'ID floor', sortable: true, 'class': 'text-center' },
        description: { label: 'Name', sortable: true, 'class': 'text-center' },
        location: { label: 'Location', 'class': 'text-center' },
        updated_date: { label: 'Updated at', sortable: true, 'class': 'text-center' },
        actions: { label: 'Action', 'class': 'text-center' }
      },
      anchorsId: [],
      anchors: [],
      errors: []
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
        params: { id_building: anchor.id_building, id_floor: anchor.id_floor, id_anchor: anchor._id }
      })
    }
  }
}
</script>
