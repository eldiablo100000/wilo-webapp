<template>
  <div >
    <h2>
      Logout
    </h2>
    Are you sure to log out?
    <div id="click">
        <button @click="logout">Yes</button>
    </div>
  </div>
</template>

<script>

export default{
  name: 'LogoutPage',
  data () {
    return {
      errors: [],
      username: '',
      password: ''
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
