<template>
  <div style="height:100vh;">
    <b-row>
      <b-col cols="12">
        <h2>
          Building List
          <b-link @click.stop="GoToCreateBuilding()">(Add Building)</b-link>
        </h2>
        <b-table :class="$parent.selectedTheme" striped hover :items="buildings" :fields="fields">
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
export default {
  name: 'BuildingList',
  data () {
    return {
      fields: {
        title: { label: 'Title', sortable: true, 'class': 'text-center' },
        road: { label: 'Road', sortable: true, 'class': 'text-center' },
        number: { label: 'Number', sortable: true, 'class': 'text-center' },
        postcode: { label: 'Postcode', sortable: true, 'class': 'text-center' },
        city: { label: 'City', sortable: true, 'class': 'text-center' },
        country: { label: 'Country', sortable: true, 'class': 'text-center' },
        updated_date: { label: 'Updated at', sortable: true, 'class': 'text-center' },
        actions: { label: 'Action', 'class': 'text-center' }
      },
      buildings: [],
      errors: []
    }
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
  },
  created () {
    this.features = []
    this.$http.get(`http://localhost:3000/auth/user/` + JSON.parse(localStorage.getItem('user'))._id)
      .then(response => {
        for (var el in response.data.user.buildings) {
          this.$http.get('http://localhost:3000/api/building/' + response.data.user.buildings[el])
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
  }
}
</script>
