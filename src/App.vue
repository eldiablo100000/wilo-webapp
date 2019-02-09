<template>
  <div id="app" :class="[{'collapsed' : collapsed}]">
    <div v-bind:class="myclass">
      <h1>IndLoc</h1>
      <!--<div id="theme-selector">Mode:
        <select v-model="selectedTheme">
          <option v-for="(theme, index) in themes" :key="index" selected="dark-theme">{{theme == 'dark-theme' ? 'dark-theme' : theme}}</option>
        </select>
      </div>-->
      <hr style="margin: 50px 0px;border: 1px solid #e3e3e3;">
      <router-view/>
    </div>
  <sidebar-menu :menu="menu" :collapsed="collapsed" @collapse="onCollapse" :theme="selectedTheme" />
  </div>
</template>

<script>
const separator = {
  template: `<hr style="border-color: rgba(0, 0, 0, 0.1); margin: 20px;">`
}

export default {
  name: 'App',
  data () {
    return {
      myclass: 'demo extended',
      menu: [
        {
          header: true,
          title: 'Navigator'
        },
        {
          href: '/',
          title: 'Map',
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
        /* {
          title: 'Pages',
          icon: 'fa fa-file',
          href: '/auth',
          badge: {
            text: 'new'
          },
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
            },
            {
              href: '/auth/disabled',
              title: 'Disabled',
              icon: 'fa fa-unlock',
              disabled: true
            }
          ]
        }, */
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
  background-color: #99ebff; //#f2f4f7;
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
  float: top right;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  overflow: scroll !important;
}
</style>
