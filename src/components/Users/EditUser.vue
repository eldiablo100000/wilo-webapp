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
                  label="Enter Username"
                  style="width: 50%; margin: 0 auto;">
          <b-form-input id="title" :state="state" v-model.trim="user.username"></b-form-input>
        </b-form-group>
        <b-form-group class="fieldsetHorizontal"
                  :label-cols="4"
                  breakpoint="md"
                  label="Enter Name"
                  style="width: 50%; margin: 0 auto;">
          <b-form-input id="city" :state="state" v-model.trim="user.name"></b-form-input>
        </b-form-group>
        <b-form-group class="fieldsetHorizontal"
                  :label-cols="4"
                  breakpoint="md"
                  label="Enter Surname"
                  style="width: 50%; margin: 0 auto;">
          <b-form-input id="city" :state="state" v-model.trim="user.surname"></b-form-input>
        </b-form-group>
        <b-form-group class="fieldsetHorizontal"
                  :label-cols="4"
                  breakpoint="md"
                  label="Enter current password"
                  style="width: 50%; margin: 0 auto;">
          <b-form-input id="city" :state="state" v-model.trim="password" type="password"></b-form-input>
        </b-form-group>
        <b-form-group class="fieldsetHorizontal"
                  :label-cols="4"
                  breakpoint="md"
                  label="Enter new password"
                  style="width: 50%; margin: 0 auto;">
          <b-form-input id="city" :state="state" v-model.trim="newPassword" type="password"></b-form-input>
        </b-form-group>
         <b-form-group class="fieldsetHorizontal"
                  :label-cols="4"
                  breakpoint="md"
                  label="Re-enter new password"
                  style="width: 50%; margin: 0 auto;">
          <b-form-input id="city" :state="state" v-model.trim="reNewPassword" type="password"></b-form-input>
        </b-form-group>
      <b-button type="submit" variant="primary">Update</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>

import md5 from 'js-md5'

export default {
  name: 'EditUser',
  data () {
    return {
      user: {},
      errors: [],
      password: '',
      newPassword: '',
      reNewPassword: '',
      continuePost: false
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      if (this.user.password === md5(this.password)) {
        if (this.newPassword === '') alert('insert a new password')
        else if (this.newPassword !== this.reNewPassword) {
          alert('the new password is not coorrectly')
        } else {
          this.user.password = md5(this.newPassword)
          this.continuePost = true
        }
      } else {
        alert('the current password is not correctly')
      }
      if (this.continuePost) {
        this.$http.put(`http://localhost:3000/auth/user/` + this.$route.params.id_user, this.user)
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
