<template>
  <div >
    <h2>
      Login
    </h2>
    <b-form>
      <b-form-group id="fieldsetHorizontal"
        horizontal
        :label-cols="4"
        breakpoint="md"
        margin-right="20px"
        label="Username">
        <b-form-input id="username" :state="state" v-model.trim="username" style="width: 50%"></b-form-input>
      </b-form-group>
      <b-form-group id="fieldsetHorizontal"
        horizontal
        :label-cols="4"
        breakpoint="md"
        label="Password">
        <b-form-input id="password" type="password" :state="state" v-model.trim="password" style="width: 50%"></b-form-input>
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
    console.log(localStorage)
  },
  methods: {
    login () {
      axios.get(`http://localhost:3000/user`)
        .then(response => {
          // console.log(response.data)
          for (var el in response.data) {
            // console.log(md5(this.password))
            // console.log(response.data[el].password)
            if (this.username === response.data[el].username && md5(this.password) === response.data[el].password) {
              this.notPresent = false
              axios.get(`http://localhost:3000/user/` + response.data[el]._id)
                .then(response => {
                  console.log(response)
                  localStorage.setItem('user', JSON.stringify(response.data.user))
                  localStorage.setItem('token', response.data.token)
                  localStorage.setItem('auth', response.data.auth)
                  console.log(localStorage)
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
