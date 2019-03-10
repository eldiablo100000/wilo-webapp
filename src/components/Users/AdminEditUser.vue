<template>
  <div style="height: 100vh;">
    <b-row>
      <b-col cols="12">
        <h2>
          Edit User
          <router-link :to="{ name: 'AdminShowUser', params: { id: user._id } }">(Show User)</router-link>
        </h2>
        <b-form @submit="onSubmit">
          <b-form-group class="fieldsetHorizontal"
                    :label-cols="4"
                    breakpoint="md"
                    label="Enter Username"
                    style="width: 50%; margin:0 auto;">
            <b-form-input id="title" :state="state" v-model.trim="user.username"></b-form-input>
          </b-form-group>
          <b-form-group class="fieldsetHorizontal"
                    :label-cols="4"
                    breakpoint="md"
                    label="Enter Name"
                    style="width: 50%; margin:0 auto;">
            <b-form-input id="city" :state="state" v-model.trim="user.name"></b-form-input>
          </b-form-group>
          <b-form-group class="fieldsetHorizontal"
                    :label-cols="4"
                    breakpoint="md"
                    label="Enter Surname"
                    style="width: 50%; margin:0 auto;">
            <b-form-input id="city" :state="state" v-model.trim="user.surname"></b-form-input>
          </b-form-group>
          <b-form-group class="fieldsetHorizontal"
                    :label-cols="4"
                    breakpoint="md"
                    label="Is admin">
              <b>(Enabled: {{ user.is_admin }})</b>
              <b-form-checkbox switch v-model="user.is_admin" name="check-button">
          </b-form-checkbox>
        </b-form-group>

        <b-button type="submit" variant="primary">Update</b-button>
        </b-form>
      </b-col>
    </b-row>
  </div>
</template>

<script>

export default {
  name: 'AdminEditUser',

  data () {
    return {
      user: {},
      errors: []
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      this.$http.put(`http://localhost:3000/auth/user/` + this.$route.params.id_user, this.user)
        .then(response => {
          this.$router.push({
            name: 'AdminShowUser',
            params: { id_user: this.$route.params.id_user }
          })
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  },
  created () {
    this.$http.get(`http://localhost:3000/auth/user/` + this.$route.params.id_user)
      .then(response => {
        this.user = response.data.user
      })
      .catch(e => {
        this.errors.push(e)
      })
  }
}
</script>
