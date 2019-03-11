<template>
  <div id="app" :class="[{'collapsed' : collapsed}, selectedTheme]">
    <div v-bind:class="myclass">
      <div>
        <b-navbar toggleable="lg" type="dark" :class="selectedTheme">
          <b-navbar-brand href="#/">Wilo</b-navbar-brand>

          <b-navbar-toggle target="nav_collapse" />

          <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav>
              <b-nav-item :class="selectedTheme" href="#/about">About Wilo</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
              <b-form-checkbox switch v-model="checked" name="check-button">
                Dark theme <b>(Enabled: {{ checked }})</b>
              </b-form-checkbox>
              <b-nav-item-dropdown right>
                <template :class="selectedTheme" slot="button-content" v-if="!authenticated"><em>Not authenticated</em></template>
                <template :class="selectedTheme" slot="button-content" v-else><em>{{user.username}}</em></template>
                <b-dropdown-item :class="selectedTheme" @click="GoToShowUser()">Profile</b-dropdown-item>
                <b-dropdown-item :class="selectedTheme" v-if="!authenticated" href="#/auth/login">Signin</b-dropdown-item>
                <b-dropdown-item :class="selectedTheme" v-else href="#/auth/logout">Signout</b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>

      <h1>WiLo</h1>

      <hr style="margin: 50px 0px;border: 1px solid #e3e3e3;">
      <router-view/>
    </div>
  <sidebar-menu v-if="authenticated" :menu="menu" :collapsed="collapsed" @collapse="onCollapse" :theme="selectedTheme" />
  </div>
</template>

<script>
const separator = {
  template: `<hr style="border-color: rgba(0, 0, 0, 0.1); margin: 20px;">`
}
export default {
  name: 'App',
  created () {
    if (localStorage.getItem('auth') != null) {
      this.authenticated = true
      this.user = JSON.parse(localStorage.getItem('user'))
    }
    if (this.authenticated) {
      for (var i in this.menu) {
        if (this.menu[i].title === 'Authentication') {
          for (var j in this.menu[i].child) {
            if (this.menu[i].child[j].title === 'Login Page') {
              this.menu[i].child[j].title = 'Logout Page'
              this.menu[i].child[j].href = '/auth/logout'
            } else if (this.menu[i].child[j].title === 'Registration Page') {
              this.menu[i].child[j].disabled = true
            }
          }
        }
      }
    } else {
      this.$router.push({ name: 'LoginPage' })
      this.myclass = 'demo'
      this.authenticated = false
    }
  },
  data () {
    return {
      user: {},
      authenticated: null,
      myclass: 'demo extended',
      mytopnav: 'topnav dark-theme',
      menu: [
        {
          header: true,
          title: 'Navigator'
        },
        {
          href: '/',
          title: 'Add a building',
          icon: 'fa fa-map'
        },
        {
          href: '/buildings',
          title: 'My Buildings',
          icon: 'fa fa-building'
        },
        {
          href: '/myfloors',
          title: 'My Floors',
          icon: 'fa fa-building'
        },
        {
          header: true,
          component: separator
        },
        {
          title: 'Admin',
          icon: 'fa fa-database',
          href: '/admin/users',
          badge: {
            text: 'new'
          },
          child: [
            {
              href: '/admin/users',
              title: 'Admin User List',
              icon: 'fa fa-user'
            },
            {
              href: '/admin/buildings',
              title: 'Admin Building List',
              icon: 'fa fa-building'
            },
            {
              href: '/admin/floors',
              title: 'Admin Floor List',
              icon: 'fa fa-map-marker'
            },
            {
              href: '/admin/anchors',
              title: 'Admin Anchor List',
              icon: 'fa fa-anchor'
            }
          ]
        },
        {
          title: 'Authentication',
          icon: 'fa fa-file',
          child: [
            {
              href: '/auth/login',
              title: 'Login Page',
              icon: 'fa fa-lock'
            },
            {
              href: '/auth/registration',
              title: 'Registration Page',
              icon: 'fa fa-lock'
            }
          ]
        }
      ],
      collapsed: false,
      themes: ['white-theme', 'dark-theme'],
      selectedTheme: 'dark-theme',
      checked: true
    }
  },
  methods: {
    onCollapse (val) {
      console.log(`collapsed ${val}`)
      this.collapsed = val
      if (this.collapsed) {
        this.myclass = 'demo'
      } else {
        this.myclass = 'demo extended'
      }
    },
    GoToShowUser () {
      this.$router.push({
        name: 'ShowUser',
        params: { id_user: this.user._id }
      })
    }
  },
  watch: {
    checked: function (val) {
      if (val) {
        this.selectedTheme = this.themes[1]
      } else {
        this.selectedTheme = this.themes[0]
      }
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600');
@import url('https://fonts.googleapis.com/css?family=Material+Icons');

body,
html {
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Source Sans Pro', sans-serif;
  background-color: #f2f4f7; //#99ebff;
}

.badge-danger {
  background-color: #ff2a2a;
  color: #fff;
}

.demo {
  padding-left: 50px;
}

.demo.extended {
  padding-left: 350px;
}

#theme-selector {
  float: right;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // margin-top: 10px;
  height: 100%;
  overflow: scroll !important;
}
.dark-theme {
  background-color: #000013!important;
  color: white!important;
}
.white-theme {
  background-color: white!important;
  color: black!important;
}
.dark-theme a {
  background-color: #000013;
  color: white!important;
}
.white-theme a {
  background-color: white;
  color: black!important;
}
.dark-theme a:hover {
  background-color: #565d5d;
  color: #ff8533!important;
}
.white-theme a:hover {
  background-color: cornsilk;
  color: black!important;
}
.dark-theme .vsm-link:hover {
  background-color: grey!important;
  color: black!important;
}
.white-theme .vsm-link:hover {
  background-color: cornsilk!important;
  color: black!important;
}
.dark-theme .jumbotron {
  background-color: grey!important;
  color: black!important;
}
.white-theme .jumbotron {
  background-color: darkgrey!important;
  color: black!important;
}
.v-sidebar-menu {
  bborder-style: solid;
  border-width: 3px;
  border-color: #ff8533;
}
.b-dropdown-item{
  background-color: black;
}
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  display: none;
  float: left;
  padding: 0!important;
  min-width: 10rem;
  margin: 0.125rem 0 0;
  font-size: 1rem;
  color: #212529;
  text-align: left;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 2px solid!important;
  border-color: #ff8533!important;
}
.table-hover tbody tr:hover {
  color: #ff8533!important;
}

</style>
