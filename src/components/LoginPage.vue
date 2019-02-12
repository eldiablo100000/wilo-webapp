<template>
  <div id="app">
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
        <router-link to="/register" class="btn btn-link">Register</router-link>
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
  methods: {
    login () {
      axios.get(`http://localhost:3000/user`)
        .then(response => {
          console.log(response.data)
          for (var el in response.data) {
            console.log(md5(this.password))
            console.log(response.data[el].password)
            if (this.username === response.data[el].username && md5(this.password) === response.data[el].password) {
              this.notPresent = false
              this.$router.push({
                name: 'BuildingList',
                params: { id_user: response.data[el]._id }
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
