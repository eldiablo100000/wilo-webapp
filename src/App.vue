<template>
  <div id="app" :class="[{'collapsed' : collapsed}, selectedTheme]">
    <div v-bind:class="myclass">
      <div v-bind:class="mytopnav">
       <a class="active" href="#home">Home</a>
       <a href="#news">News</a>
       <a href="#contact">Contact</a>
       <a href="#about">About</a>
       <a v-if="!authenticated" href="#/auth/login">Login</a>
       <a v-else href="#/auth/logout">Logout</a>
       <!-- <select id="theme-selector" v-model="selectedTheme">
         <option v-for="(theme, index) in themes" :key="index" selected="dark-theme">{{theme == 'dark-theme' ? 'dark-theme' : theme}}</option>
       </select> -->
      </div>
      <label class="switch">
        <input type="checkbox" v-model="test">
        <span class="slider round"></span>
      </label>
      <h1>IndLoc</h1>

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
    this.authenticated = localStorage.getItem('auth') != null
    if (this.authenticated) {
      console.log(this.menu)
      for (var i in this.menu) {
        console.log(this.menu[i])
        if (this.menu[i].title === 'Pages') {
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
      authenticated: null,
      myclass: 'demo extended',
      mytopnav: 'topnav dark-theme',
      test: false,
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
          href: '/upload',
          title: 'Upload',
          icon: 'fa fa-upload'
        },
        {
          href: '/manipulate-img',
          title: 'Manipulate Image',
          icon: 'fa fa-file-image'
        },
        {
          href: '/tables',
          title: 'Tables',
          icon: 'fa fa-table'
        },
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
        {
          header: true,
          title: 'Options'
        },
        {
          title: 'APIs',
          icon: 'fa fa-database',
          href: '/api',
          badge: {
            text: 'new'
          },
          child: [
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
          title: 'Pages',
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
        },
        {
          href: '#',
          title: 'Mailbox',
          icon: 'fa fa-envelope'
        },
        {
          title: 'Multiple Level',
          icon: 'fa fa-list-alt',
          child: [
            {
              href: '#',
              title: 'Page 01'
            },
            {
              title: 'Page 02',
              child: [
                {
                  href: '#',
                  title: 'Page 04'
                },
                {
                  href: '#',
                  title: 'Page 05'
                }
              ]
            },
            {
              href: '#',
              title: 'Page 03'
            },
            {
              title: 'Level 2',
              child: [
                {
                  href: '#',
                  title: 'Level 3',
                  child: [
                    {
                      href: '#',
                      title: 'Page'
                    },
                    {
                      href: '#',
                      title: 'Page'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      collapsed: false,
      themes: ['dark-theme', 'white-theme'],
      selectedTheme: 'dark-theme'
    }
  },
  watch: {
    selectedTheme: function (val) {
      this.mytopnav = 'topnav ' + val
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
#app.dark-theme {
  background-color: dimgrey;
  color: cornsilk!important;
}
#app.white-theme {
  background-color: floralwhite;
  color: black;
}
/* Add a black background color to the top navigation */
.topnav {
  overflow: hidden;
}
.topnav.dark-theme {
  background-color: black;
}
.topnav.white-theme {
  background-color: cornsilk;
}

/* Style the links inside the navigation bar */
.topnav a {
  float: left;
  color: cornsilk;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}
.topnav.dark-theme a {
  color: cornsilk;
}
.topnav.white-theme a {
  color: black;
}
/* Change the color of links on hover */

.topnav.dark-theme a:hover {
  background-color: cornsilk;
  color: black;
}
.topnav.white-theme a:hover {
  background-color: black;
  color: cornsilk;
}
/* Add a color to the active/current link */

.topnav.dark-theme a.active {
  background-color: darkslategray;
  color: cornsilk;
}
.topnav.white-theme a.active {
  background-color: darksalmon;
  color: black;
}
</style>
