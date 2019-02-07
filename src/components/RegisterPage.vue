<template>
  <div id="app">
    <h2>
      Registration
    </h2>
    <b-form>
       <b-form-group id="fieldsetHorizontal"
        horizontal
        :label-cols="4"
        breakpoint="md"
        label="Name">
        <b-form-input id="name" :state="state" v-model.trim="user.name" style="width: 50%"></b-form-input>
      </b-form-group>
      <b-form-group id="fieldsetHorizontal"
        horizontal
        :label-cols="4"
        breakpoint="md"
        label="Surname">
        <b-form-input id="surname" :state="state" v-model.trim="user.surname" style="width: 50%"></b-form-input>
      </b-form-group>
      <b-form-group id="fieldsetHorizontal"
        horizontal
        :label-cols="4"
        breakpoint="md"
        label="Username">
        <b-form-input id="username" :state="state" v-model.trim="user.username" style="width: 50%"></b-form-input>
      </b-form-group>
      <b-form-group id="fieldsetHorizontal"
        horizontal
        :label-cols="4"
        breakpoint="md"
        label="Password">
        <b-form-input id="password" :state="state" v-model.trim="user.password" style="width: 50%"></b-form-input>
      </b-form-group>
      <b-form-group id="fieldsetHorizontal"
        horizontal
        :label-cols="4"
        breakpoint="md"
        label="Repeat Password">
        <b-form-input id="Repeat_password" :state="state" v-model.trim="RepeatPassword" style="width: 50%"></b-form-input>
      </b-form-group>
    </b-form>
    <div id="click">
        <button @click="register">Register</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default{
  name: 'RegisterPage',
  data () {
    return {
      errors: [],
      user: {},
      RepeatPassword: '',
      usernameOk: true
    }
  },
  created () {

  },
  methods: {
    register () {
      if (this.user.password !== this.RepeatPassword) alert('password errata')
      else {
        this.usernameOk = true
        axios.get(`http://localhost:3000/user`)
          .then(response => {
            console.log(response.data)
            for (var el in response.data) {
              if (this.user.username === response.data[el].username) {
                this.usernameOk = false
                alert('username già occupato')
              }
            }
            if (this.usernameOk) {
              axios.post('http://localhost:3000/user', this.user)
                .then(response => {
                  console.log(response.data)
                  this.$router.push({
                    name: 'BuildingList',
                    params: { id_user: response.data._id }
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
