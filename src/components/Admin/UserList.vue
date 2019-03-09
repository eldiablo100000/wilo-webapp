<template>
  <div style="height: 100vh;">
    <b-row>
      <b-col cols="12">
        <h2>
          User List
          <b-link href="#/add-user">(Add User)</b-link>
        </h2>
        <b-table :class="$parent.selectedTheme" striped hover :items="users" :fields="fields">
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
  name: 'UserList',
  data () {
    return {
      fields: {
        _id: { label: 'ID', sortable: true, 'class': 'text-center' },
        name: { label: 'Name', sortable: true, 'class': 'text-center' },
        surname: { label: 'Surname', sortable: true, 'class': 'text-center' },
        username: { label: 'Username', sortable: true, 'class': 'text-center' },
        updated_date: { label: 'Updated at', sortable: true, 'class': 'text-center' },
        actions: { label: 'Action', 'class': 'text-center' }
      },
      users: [],
      errors: []
    }
  },
  created () {
    this.$http.get(`http://localhost:3000/auth/user`)
      .then(response => {
        this.users = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
  },
  methods: {
    details (user) {
      this.$router.push({
        name: 'ShowUser',
        params: { id_user: user._id }
      })
    }
  }
}
</script>
