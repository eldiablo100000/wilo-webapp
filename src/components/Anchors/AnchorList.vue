<template>
  <div style="height:100vh;">
    <b-row>
      <b-col cols="12">
        <h2>
          Anchor List
          <b-link :href="addAnchor">(Add Anchor)</b-link>
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
export default {
  name: 'AnchorList',
  data () {
    return {
      fields: {
        name: { label: 'Name', sortable: true, 'class': 'text-center' },
        description: { label: 'Description', sortable: true, 'class': 'text-center' },
        location: { label: 'Location', 'class': 'text-center' },
        updated_date: { label: 'Updated at', sortable: true, 'class': 'text-center' },
        actions: { label: 'Action', 'class': 'text-center' }
      },
      anchorsId: [],
      anchors: [],
      errors: [],
      addAnchor: '#/building/' + this.$route.params.id_building + '/floor/' + this.$route.params.id_floor + '/add-anchor'
    }
  },
  created () {
    this.$http.get(`http://localhost:3000/api/floor/` + this.$route.params.id_floor)
      .then((response) => {
        this.anchorsId = response.data.anchors
        for (var el in this.anchorsId) {
          this.$http.get(`http://localhost:3000/api/anchor/` + this.anchorsId[el])
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
    details (anchor) {
      this.$router.push({
        name: 'ShowAnchor',
        params: { id_building: this.$route.params.id_building, id_floor: this.$route.params.id_floor, id_anchor: anchor._id }
      })
    }
  }
}
</script>
