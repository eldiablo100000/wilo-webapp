<template>
  <div >
    <h2>
      Login
    </h2>
    <b-form>
      <b-form-group class="fieldsetHorizontal"
        :label-cols="4"
        label-cols-sd="4"
        label-cols-md="4"
        label-cols-lg="4"
        margin-right="20px"
        label="Username">
        <b-form-input id="username" v-model.trim="username" autocomplete="username" style="width: 50%"></b-form-input>
      </b-form-group>
      <b-form-group class="fieldsetHorizontal"
        :label-cols="4"
        label-cols-sd="4"
        label-cols-md="4"
        label-cols-lg="4"
        label="Password">
        <b-form-input id="password" type="password" v-model.trim="password" autocomplete="password" style="width: 50%"></b-form-input>
      </b-form-group>
    </b-form>
    <div id="click">
        <button @click="login">login</button>
        <router-link to="/auth/registration" class="btn btn-link">Register</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
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
  mounted () {
  },
  methods: {
    login () {
      axios.get(`http://localhost:3000/user`)
        .then(response => {
          for (var el in response.data) {
            if (this.username === response.data[el].username && md5(this.password) === response.data[el].password) {
              this.notPresent = false
              axios.get(`http://localhost:3000/user/` + response.data[el]._id)
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
