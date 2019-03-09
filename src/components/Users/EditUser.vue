<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Edit User
        <router-link :to="{ name: 'ShowUser', params: { id: user._id } }">(Show User)</router-link>
      </h2>
      <b-form @submit="onSubmit">
        <b-form-group class="fieldsetHorizontal"
                  :label-cols="4"
                  breakpoint="md"
                  label="Enter Username">
          <b-form-input id="title" :state="state" v-model.trim="building.username"></b-form-input>
        </b-form-group>
        <b-form-group class="fieldsetHorizontal"
                  :label-cols="4"
                  breakpoint="md"
                  label="Enter Name">
          <b-form-input id="city" :state="state" v-model.trim="building.name"></b-form-input>
        </b-form-group>
        <b-form-group class="fieldsetHorizontal"
                  :label-cols="4"
                  breakpoint="md"
                  label="Enter Surname">
          <b-form-input id="city" :state="state" v-model.trim="building.surname"></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Update</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>

export default {
  name: 'EditUser',

  data () {
    return {
      user: {},
      errors: []
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      this.$http.put(`http://localhost:3000/api/user/` + this.$route.params.id_user, this.user)
        .then(response => {
          this.$router.push({
            name: 'ShowUser',
            params: { id_user: this.$route.params.id_user }
          })
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  },
  created () {
    this.$http.get(`http://localhost:3000/api/user/` + this.$route.params.id_user)
      .then(response => {
        this.user = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
  }
}
</script>
