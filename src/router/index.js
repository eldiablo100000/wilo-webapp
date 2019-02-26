import Vue from 'vue'
import Router from 'vue-router'
// import BookList from '@/components/Books/BookList'
// import ShowBook from '@/components/Books/ShowBook'
// import CreateBook from '@/components/Books/CreateBook'
// import EditBook from '@/components/Books/EditBook'

import BuildingList from '@/components/Buildings/BuildingList'
import ShowBuilding from '@/components/Buildings/ShowBuilding'
import CreateBuilding from '@/components/Buildings/CreateBuilding'
import EditBuilding from '@/components/Buildings/EditBuilding'

import FloorList from '@/components/Floors/FloorList'
import ShowFloor from '@/components/Floors/ShowFloor'
import CreateFloor from '@/components/Floors/CreateFloor'
import EditFloor from '@/components/Floors/EditFloor'

import AnchorList from '@/components/Anchors/AnchorList'
import CreateAnchor from '@/components/Anchors/CreateAnchor'
import EditAnchor from '@/components/Anchors/EditAnchor'
import ShowAnchor from '@/components/Anchors/ShowAnchor'

import AdminBuildingList from '@/components/Admin/BuildingList'
import AdminFloorList from '@/components/Admin/FloorList'
import AdminAnchorList from '@/components/Admin/AnchorList'

// import HelloWorld from '@/components/HelloWorld'
// import MapDemo from '@/components/MapDemo'
// import Image from '@/components/Image'

import Upload from '@/components/Upload'

import ManipulateImage from '@/components/ManipulateImage'
import LoginPage from '@/components/LoginPage'
import LogoutPage from '@/components/LogoutPage'
import RegisterPage from '@/components/RegisterPage'

Vue.use(Router)
let router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'CreateBuilding',
      component: CreateBuilding,
      meta:
        {
          requiresAuth: true
        }
    },
    {
      path: '/auth/login/',
      name: 'LoginPage',
      component: LoginPage,
      meta:
      {
        guest: true
      }
    },
    {
      path: '/auth/logout/',
      name: 'LogoutPage',
      component: LogoutPage,
      meta:
        {
          requiresAuth: true
        }
    },
    {
      path: '/auth/registration/',
      name: 'RegisterPage',
      component: RegisterPage,
      meta:
      {
        guest: true
      }
    },
    {
      path: '/upload/',
      name: 'Upload',
      component: Upload,
      meta:
        {
          requiresAuth: true
        }
    },
    {
      path: '/manipulate-img/',
      name: 'ManipulateImage',
      component: ManipulateImage,
      meta:
        {
          requiresAuth: true
        }
    },

    // book
    /* {
      path: '/books/',
      name: 'BookList',
      component: BookList
    },
    {
      path: '/show-book/:id',
      name: 'ShowBook',
      component: ShowBook
    },
    {
      path: '/add-book',
      name: 'CreateBook',
      component: CreateBook
    },
    {
      path: '/edit-book/:id',
      name: 'EditBook',
      component: EditBook
    }, */

    // building
    {
      path: '/buildings/',
      name: 'BuildingList',
      component: BuildingList,
      meta:
        {
          requiresAuth: true
        }
    },
    {
      path: '/show-building/:id_building',
      name: 'ShowBuilding',
      component: ShowBuilding,
      meta:
        {
          requiresAuth: true
        }
    },
    {
      path: '/add-building',
      name: 'CreateBuilding',
      component: CreateBuilding,
      meta:
        {
          requiresAuth: true
        }
    },
    {
      path: '/edit-building/:id_building',
      name: 'EditBuilding',
      component: EditBuilding,
      meta:
        {
          requiresAuth: true
        }
    },
    // floor
    {
      path: '/building/:id_building/floors/',
      name: 'FloorList',
      component: FloorList,
      meta:
        {
          requiresAuth: true
        }
    },
    {
      path: '/building/:id_building/show-floor/:id_floor',
      name: 'ShowFloor',
      component: ShowFloor,
      meta:
        {
          requiresAuth: true
        }
    },
    {
      path: '/building/:id_building/add-floor',
      name: 'CreateFloor',
      component: CreateFloor,
      meta:
        {
          requiresAuth: true
        }
    },
    {
      path: '/building/:id_building/edit-floor/:id_floor',
      name: 'EditFloor',
      component: EditFloor,
      meta:
        {
          requiresAuth: true
        }
    },
    // anchor
    {
      path: '/building/:id_building/floor/:id_floor/anchors',
      name: 'AnchorList',
      component: AnchorList,
      meta:
        {
          requiresAuth: true
        }
    },
    {
      path: '/building/:id_building/floor/:id_floor/show-anchor/:id_anchor',
      name: 'ShowAnchor',
      component: ShowAnchor,
      meta:
        {
          requiresAuth: true
        }
    },
    {
      path: '/building/:id_building/floor/:id_floor/add-anchor',
      name: 'CreateAnchor',
      component: CreateAnchor,
      meta:
        {
          requiresAuth: true
        }
    },
    {
      path: '/building/:id_building/floor/:id_floor/edit-anchor/:id_anchor',
      name: 'EditAnchor',
      component: EditAnchor,
      meta:
        {
          requiresAuth: true
        }
    },
    {
      path: '/admin/buildings',
      name: 'AdminBuildingList',
      component: AdminBuildingList,
      meta:
        {
          requiresAuth: true,
          is_admin: true
        }
    },
    {
      path: '/admin/floors',
      name: 'AdminFloorList',
      component: AdminFloorList,
      meta:
        {
          requiresAuth: true,
          is_admin: true
        }
    },
    {
      path: '/admin/anchors',
      name: 'AdminAnchorList',
      component: AdminAnchorList,
      meta:
        {
          requiresAuth: true,
          is_admin: true
        }
    }
  ]
})
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (localStorage.getItem('token') == null) {
//       next({
//         path: '/auth/login',
//         params: { nextUrl: to.fullPath }
//       })
//     } else {
//       let user = JSON.parse(localStorage.getItem('user'))
//       if (to.matched.some(record => record.meta.is_admin)) {
//         if (user.is_admin === 1) {
//           next()
//         } else {
//           next({ name: 'Logout Page' })
//         }
//       } else {
//         next()
//       }
//     }
//   } else if (to.matched.some(record => record.meta.guest)) {
//     if (localStorage.getItem('token') == null) {
//       next()
//     } else {
//       next({ name: 'Logout Page' })
//     }
//   } else {
//     next()
//   }
// })

export default router
