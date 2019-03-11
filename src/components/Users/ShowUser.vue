user<template>
  <div>
    <b-row>
      <b-col cols="12">
        <h2>
          Show User
        </h2>
        <b-jumbotron>
          <template slot="header">
            {{user.username}}
          </template>
          <template slot="lead">
            ID: {{user._id}}<br>
            Name: {{user.name}}<br>
            Surname: {{user.surname}}<br>
            Username: {{user.username}}<br>
            Is admin: {{user.is_admin}}
          </template>
          <hr class="my-4">
          <p>
            Updated Date: {{user.updated_date}}
          </p>

          <b-btn variant="success" @click.stop="edituser(user._id)">Edit</b-btn>
          <b-btn variant="danger" @click.stop="deleteuser(user._id)">Delete</b-btn>
        </b-jumbotron>
      </b-col>
    </b-row>
  </div>
</template>

<script>

export default {
  name: 'ShowUser',

  data () {
    return {
      user: {},
      errors: [],
      buildings: [],
      floors: [],
      anchors: [],
      images: []
    }
  },
  methods: {
    GoToUserList () {
      this.$router.push({
        name: 'UserList'
      })
    },
    edituser (userid) {
      this.$router.push({
        name: 'EditUser',
        params: { id_user: userid }
      })
    },
    deleteuser (userid) {
      for (var i in this.anchors) {
        this.$http.delete(`http://localhost:3000/api/anchor/` + this.anchors[i])
          .then(response => {
          })
          .catch(e => {
            this.errors.push(e)
          })
      }
      for (var j in this.floors) {
        this.$http.delete(`http://localhost:3000/api/floor/` + this.floors[j])
          .then(response => {
          })
          .catch(e => {
            this.errors.push(e)
          })
      }
      for (var k in this.buildings) {
        this.$http.delete(`http://localhost:3000/api/building/` + this.buildings[k])
          .then(response => {
          })
          .catch(e => {
            this.errors.push(e)
          })
      }
      for (var l in this.images) {
        this.$http.delete(`http://localhost:3000/api/image/` + this.images[l])
          .then(response => {
          })
          .catch(e => {
            this.errors.push(e)
          })
      }
      this.$http.delete(`http://localhost:3000/auth/user/` + userid)
        .then(response => {
          localStorage.setItem('auth', null)
          this.$router.push({
            name: 'LoginPage'
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
        if (response.data != null) {
          this.user = response.data.user
          for (var g in this.user.buildings) this.buildings.push(this.user.buildings[g])
          for (var i in this.buildings) {
            this.$http.get(`http://localhost:3000/api/building/` + this.buildings[i])
              .then(response => {
                for (var k in response.data.floors) this.floors.push(response.data.floors[k])
                for (var j in this.floors) {
                  this.$http.get(`http://localhost:3000/api/floor/` + this.floors[j])
                    .then(response => {
                      for (var h in response.data.anchors) this.anchors.push(response.data.anchors[h])
                      this.images.push(response.data.image)
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
      })
      .catch(e => {
        this.errors.push(e)
      })
  }
}
</script>

<style>
  .jumbotron {
    padding: 2rem;
  }
</style>
