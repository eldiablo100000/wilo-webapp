<template>
  <div style="height: 100vh;">
    <h2>
      Login
    </h2>
    <b-form>
      <b-form-group
        label="Username"
        label-align="center"
        style="width: 50%; margin: 0 auto; margin-top: 2%;">
        <b-form-input id="username" v-model.trim="username" autocomplete="username" ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Password"
        abel-align="center"
        style="width: 50%; margin: 0 auto; margin-top: 2%;">
        <b-form-input id="password" type="password" v-model.trim="password" autocomplete="password"></b-form-input>
      </b-form-group>
    </b-form>
    <div id="click">
        <b-button @click="login" variant="primary" style="margin-top: 2%;">Login</b-button>
        <router-link to="/auth/registration" class="btn btn-link" style="margin-top: 2%;">Register</router-link>
    </div>
  </div>
</template>

<script>
import md5 from 'js-md5'
export default{
  name: 'LoginPage',
  data () {
    return {
      errors: [],
      username: '',
      password: '',
      notPresent: true
    }
  },
  methods: {
    login () {
      this.$http.get(`http://localhost:3000/auth/user`)
        .then(response => {
          for (var el in response.data) {
            if (this.username === response.data[el].username && md5(this.password) === response.data[el].password) {
              this.notPresent = false
              this.$http.get(`http://localhost:3000/auth/user/` + response.data[el]._id)
                .then(response => {
                  localStorage.setItem('user', JSON.stringify(response.data.user))
                  localStorage.setItem('token', response.data.token)
                  localStorage.setItem('auth', response.data.auth)
                  this.$router.push({
                    name: 'BuildingList',
                    params: { id_user: response.data.user._id }
                  })
                  this.$router.go()
                })
                .catch(e => {
                  this.errors.push(e)
                })
            }
          }
          if (this.notPresent) alert('utente non registrato')
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
}

</script>
