<template>
  <div style="height: 100vh;">
    <h2>
      Logout
    </h2>
    Are you sure to log out?
    <div id="click">
        <b-button @click="logout" variant="primary" style="margin-top: 2%;">Yes</b-button>
    </div>
  </div>
</template>

<script>
export default{
  name: 'LogoutPage',
  data () {
    return {
    }
  },
  methods: {
    logout () {
      localStorage.removeItem('user')
      localStorage.removeItem('auth')
      localStorage.removeItem('token')
      this.$router.go()
    }
  }
}

</script>
