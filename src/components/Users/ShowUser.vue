user<template>
  <div>
    <b-row>
      <b-col cols="12">
        <h2>
          Show User
          <b-link @click.stop="GoToUserList()">(User List)</b-link>
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
          <!-- <b-btn variant="danger" @click.stop="deleteuser(user._id)">Delete</b-btn> -->
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
      errors: []
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
    }
    // deleteuser (buildingid) {
    //   for (var i in this.floors) {
    //     for (var j in this.floors[i].anchors) {
    //       this.$http.delete('http://localhost:3000/api/anchor/' + this.floors[i].anchors[j])
    //         .then(response => {/admin/user/5c83eda2eaa73822ccc57eaa
    //           console.log('Deleted user')
    //         })
    //         .catch(e => {
    //           this.errors.push(e)
    //         })
    //     }
    //   }
    //   for (var k in this.building.floors) {
    //     this.$http.delete('http://localhost:3000/api/floor/' + this.building.floors[k])
    //       .then(response => {
    //         console.log('eliminato piano')
    //       })
    //       .catch(e => {
    //         this.errors.push(e)
    //       })
    //   }
    //   this.$http.delete('http://localhost:3000/api/building/' + buildingid)
    //     .then((result) => {
    //       this.$http.get('http://localhost:3000/auth/user/' + JSON.parse(localStorage.getItem('user'))._id)
    //         .then(result => {
    //           var index = result.data.user.buildings.indexOf(buildingid)
    //           if (index > -1) {
    //             result.data.user.buildings.splice(index, 1)
    //             this.user = result.data.user
    //           }
    //           this.$http.put('http://localhost:3000/auth/user/' + JSON.parse(localStorage.getItem('user'))._id, this.user)
    //             .then(result => {
    //               this.$router.push({
    //                 name: 'BuildingList'
    //               })
    //             })
    //             .catch(e => {
    //               this.errors.push(e)
    //             })
    //         })
    //         .catch(e => {
    //           this.errors.push(e)
    //         })
    //     })
    //     .catch(e => {
    //       this.errors.push(e)
    //     })
    // }
  },
  created () {
    this.features = []
    this.$http.get(`http://localhost:3000/auth/user/` + this.$route.params.id_user)
      .then(response => {
        if (response.data != null) {
          this.user = response.data.user
          console.log(this.user.user)
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
