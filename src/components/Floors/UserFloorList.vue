<template>
  <div style="height:100vh;">
    <b-row>
      <b-col cols="12">
        <h2>
          Floor List
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
  </div>
</template>

<script>
export default {
  name: 'UserFloorList',
  data () {
    return {
      fields: {
        number: { label: 'Number', sortable: true, 'class': 'text-center' },
        id_building: { label: 'ID building', sortable: true, 'class': 'text-center' },
        zoom: { label: 'Zoom', sortable: true, 'class': 'text-center' },
        updated_date: { label: 'Updated at', sortable: true, 'class': 'text-center' },
        actions: { label: 'Action', 'class': 'text-center' }
      },
      errors: [],
      floors: []
    }
  },
  created () {
    this.$http.get(`http://localhost:3000/auth/user/` + JSON.parse(localStorage.getItem('user'))._id)
      .then(response => {
        for (var el in response.data.user.buildings) {
          this.$http.get('http://localhost:3000/api/building/' + response.data.user.buildings[el])
            .then(response => {
              for (var el in response.data.floors) {
                this.$http.get(`http://localhost:3000/api/floor/` + response.data.floors[el])
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
        params: { id_building: floor.id_building, id_floor: floor._id }
      })
    }
  }
}
</script>
