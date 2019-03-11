<template>
  <div style="height: 100vh;">
    <h2>
      Registration
    </h2>
    <b-form>
      <b-form-group
        label="Name"
        style="width: 50%; margin: 0 auto; margin-top: 2%;">
        <b-form-input id="name" :state="state" v-model.trim="user.name"></b-form-input>
      </b-form-group>
      <b-form-group
        label="Surname"
        style="width: 50%; margin: 0 auto; margin-top: 2%;">
        <b-form-input id="surname" :state="state" v-model.trim="user.surname"></b-form-input>
      </b-form-group>
      <b-form-group
        label="Username"
        style="width: 50%; margin: 0 auto; margin-top: 2%;">
        <b-form-input id="username" :state="state" v-model.trim="user.username"></b-form-input>
      </b-form-group>
      <b-form-group
        label="Password"
        style="width: 50%; margin: 0 auto; margin-top: 2%;">
        <b-form-input id="password" type="password" :state="state" v-model.trim="password"></b-form-input>
      </b-form-group>
      <b-form-group
        label="Repeat Password"
        style="width: 50%; margin: 0 auto; margin-top: 2%;">
        <b-form-input id="Repeat_password" type="password" :state="state" v-model.trim="RepeatPassword"></b-form-input>
      </b-form-group>
    </b-form>
    <div id="click">
        <b-button @click="register" variant="info" style="margin-top: 2%;">Register</b-button>
    </div>
  </div>
</template>

<script>
import md5 from 'js-md5'
export default{
  name: 'RegisterPage',
  data () {
    return {
      errors: [],
      user: {},
      RepeatPassword: '',
      password: '',
      usernameOk: true
    }
  },
  created () {

  },
  methods: {
    register () {
      if (this.password !== this.RepeatPassword) alert('password errata')
      else {
        this.user.password = md5(this.password)
        this.usernameOk = true
        this.$http.get(`http://localhost:3000/auth/user`)
          .then(response => {
            for (var el in response.data) {
              if (this.user.username === response.data[el].username) {
                this.usernameOk = false
                alert('username not available')
              }
            }
            if (this.usernameOk) {
              this.user.is_admin = false
              this.$http.post('http://localhost:3000/auth/user', this.user)
                .then(response => {
                  this.$router.push({
                    name: 'BuildingList',
                    params: { id_user: response.data.user._id }
                  })
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
  }
}

</script>
