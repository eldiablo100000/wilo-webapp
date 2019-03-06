<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Floor List
        <b-link @click.stop="GoToCreateFloor()">(Add Floor)</b-link>
      </h2>
      <b-table :class="$parent.selectedTheme" striped hover :items="floors" :fields="fields">
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
        // _id: { label: 'ID', sortable: true, 'class': 'text-center' },
        number: { label: 'Number', sortable: true, 'class': 'text-center' },
        // id_user: { label: 'ID user', sortable: true, 'class': 'text-center' },
        // id_building: { label: 'ID building', sortable: true, 'class': 'text-center' },
        // angleImage: { label: 'AngleImage', sortable: true, 'class': 'text-center' },
        // widthImage: { label: 'WidthImage', sortable: true, 'class': 'text-center' },
        // heightImage: { label: 'HeightImage', sortable: true, 'class': 'text-center' },
        // xImage: { label: 'XImage', sortable: true, 'class': 'text-center' },
        // yImage: { label: 'YImage', sortable: true, 'class': 'text-center' },
        // scaleX: { label: 'ScaleX', sortable: true, 'class': 'text-center' },
        // scaleY: { label: 'ScaleY', sortable: true, 'class': 'text-center' },
        // location: { label: 'Location', sortable: true, 'class': 'text-center' },
        // image: { label: 'Image', sortable: true, 'class': 'text-center' },
        zoom: { label: 'Zoom', sortable: true, 'class': 'text-center' },
        updated_date: { label: 'Updated at', sortable: true, 'class': 'text-center' },
        actions: { label: 'Action', 'class': 'text-center' }
      },
      errors: [],
      floors: []
    }
  },
  created () {
    axios.get(`http://localhost:3000/building/` + this.$route.params.id_building)
      .then((response) => {
        this.floorsId = response.data.floors
        for (var el in this.floorsId) {
          axios.get(`http://localhost:3000/floor/` + this.floorsId[el])
            .then((response) => {
              if (response.data != null) {
                this.floors.push(response.data)
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
    GoToCreateFloor () {
      this.$router.push({
        name: 'CreateFloor',
        params: { id_building: this.$route.params.id_building }
      })
    },
    details (floor) {
      this.$router.push({
        name: 'ShowFloor',
        params: { id_building: this.$route.params.id_building, id_floor: floor._id }
      })
    }
  }
}
</script>
