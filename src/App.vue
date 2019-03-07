<template>
  <div id="app" :class="[{'collapsed' : collapsed}, selectedTheme]">
    <div v-bind:class="myclass">
      <div>
        <b-navbar toggleable="lg" type="dark" :class="selectedTheme">
          <b-navbar-brand href="#">Wilo</b-navbar-brand>

          <b-navbar-toggle target="nav_collapse" />

          <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav>
              <b-nav-item :class="selectedTheme" href="#">About Wilo</b-nav-item>
              <!-- <b-nav-item :class="selectedTheme" href="#">Link</b-nav-item>
              <b-nav-item :class="selectedTheme" href="#" disabled>Disabled</b-nav-item> -->
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <!-- <b-form-select :class="selectedTheme" v-model="selectedTheme" :options="themes" /> -->
              <b-form-checkbox switch v-model="checked" name="check-button">
                Dark theme <b>(Enabled: {{ checked }})</b>
              </b-form-checkbox>
              <!-- <b-nav-form>
                <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search" />
                <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
              </b-nav-form> -->

              <!-- <b-nav-item-dropdown text="Lang" right>
                <b-dropdown-item href="#">EN</b-dropdown-item>
                <b-dropdown-item href="#">ES</b-dropdown-item>
                <b-dropdown-item href="#">RU</b-dropdown-item>
                <b-dropdown-item href="#">FA</b-dropdown-item>
              </b-nav-item-dropdown> -->

              <b-nav-item-dropdown right>
                <!-- Using button-content slot -->
                <template :class="selectedTheme" slot="button-content" v-if="!authenticated"><em>Not authenticated</em></template>
                <template :class="selectedTheme" slot="button-content" v-else><em>{{user.username}}</em></template>
                <b-dropdown-item :class="selectedTheme" href="#">Profile</b-dropdown-item>
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
      this.$router.push('/auth/login')
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
        /* {
          href: '/charts',
          title: 'Charts',
          icon: 'fa fa-chart-area',
          badge: {
            text: 'pro',
            class: 'badge-danger'
          }
        }, */
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
        // {
        //   href: '/upload',
        //   title: 'Upload',
        //   icon: 'fa fa-upload'
        // },
        // {
        //   href: '/manipulate-img',
        //   title: 'Manipulate Image',
        //   icon: 'fa fa-file-image'
        // },
        // {
        //   href: '/tables',
        //   title: 'Tables',
        //   icon: 'fa fa-table'
        // },
        /* {
          href: '/disabled',
          title: 'Disabled',
          icon: 'fa fa-cog',
          disabled: true,
          badge: {
            text: '20'
          }
        }, */
        {
          header: true,
          component: separator
        },
        // {
        //   header: true,
        //   title: 'Options'
        // },
        {
          title: 'Admin',
          icon: 'fa fa-database',
          href: '/api',
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
          // badge: {
          //   text: 'new'
          // },
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
        // {
        //   href: '#',
        //   title: 'Mailbox',
        //   icon: 'fa fa-envelope'
        // },
        // {
        //   title: 'Multiple Level',
        //   icon: 'fa fa-list-alt',
        //   child: [
        //     {
        //       href: '#',
        //       title: 'Page 01'
        //     },
        //     {
        //       title: 'Page 02',
        //       child: [
        //         {
        //           href: '#',
        //           title: 'Page 04'
        //         },
        //         {
        //           href: '#',
        //           title: 'Page 05'
        //         }
        //       ]
        //     },
        //     {
        //       href: '#',
        //       title: 'Page 03'
        //     },
        //     {
        //       title: 'Level 2',
        //       child: [
        //         {
        //           href: '#',
        //           title: 'Level 3',
        //           child: [
        //             {
        //               href: '#',
        //               title: 'Page'
        //             },
        //             {
        //               href: '#',
        //               title: 'Page'
        //             }
        //           ]
        //         }
        //       ]
        //     }
        //   ]
        // }
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
  // height: 100vh;
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
  background-color: grey;
  color: black!important;
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
// table {
//   color: white!important;
// }
// .dark-theme a {
//   background-color: black;
//   color: white!important;
// }
// .white-theme a {
//   background-color: white;
//   color: black!important;
// }

</style>
