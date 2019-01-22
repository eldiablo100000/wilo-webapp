<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Floor List
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
        number: { label: 'Number', sortable: true, 'class': 'text-center' },
        actions: { label: 'Action', 'class': 'text-center' }
      },
      anchorsId: [],
      anchors: [],
      errors: [],
      addFloor: '#/building/' + this.$route.params.id_building + '/add-floor'
    }
  },
  created () {
    axios.get(`http://localhost:3000/building/` + this.$route.params.id_building)
      .then((response) => {
        this.anchorsId = response.data.anchors
        for (var el in this.anchorsId) {
          axios.get(`http://localhost:3000/floor/` + this.anchorsId[el])
            .then((response) => {
              if (response.data != null) {
                this.anchors.push(response.data)
              }
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
        name: 'ShowAnchor',
        params: { id_building: this.$route.params.id_building, id_floor: floor._id }
      })
    }
  }
}
</script>
