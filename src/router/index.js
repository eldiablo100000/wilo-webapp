import Vue from 'vue'
import Router from 'vue-router'

import BuildingList from '@/components/Buildings/BuildingList'
import ShowBuilding from '@/components/Buildings/ShowBuilding'
import CreateBuilding from '@/components/Buildings/CreateBuilding'
import EditBuilding from '@/components/Buildings/EditBuilding'

import FloorList from '@/components/Floors/FloorList'
import UserFloorList from '@/components/Floors/UserFloorList'
import ShowFloor from '@/components/Floors/ShowFloor'
import CreateFloor from '@/components/Floors/CreateFloor'
import EditFloor from '@/components/Floors/EditFloor'

import AnchorList from '@/components/Anchors/AnchorList'
import CreateAnchor from '@/components/Anchors/CreateAnchor'
import EditAnchor from '@/components/Anchors/EditAnchor'
import ShowAnchor from '@/components/Anchors/ShowAnchor'

import AdminBuildingList from '@/components/Admin/BuildingList'
import AdminUserList from '@/components/Admin/UserList'
import AdminFloorList from '@/components/Admin/FloorList'
import AdminAnchorList from '@/components/Admin/AnchorList'

import LoginPage from '@/components/LoginPage'
import LogoutPage from '@/components/LogoutPage'
import RegisterPage from '@/components/RegisterPage'
import ShowUser from '@/components/Users/ShowUser'
import EditUser from '@/components/Users/EditUser'

Vue.use(Router)
let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
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
    // building
    {
      path: '/myfloors/',
      name: 'UserFloorList',
      component: UserFloorList,
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
      path: '/admin/users',
      name: 'AdminUserList',
      component: AdminUserList,
      meta:
        {
          requiresAuth: true,
          is_admin: true
        }
    },
    {
      path: '/admin/user/:id_user',
      name: 'ShowUser',
      component: ShowUser,
      meta:
        {
          requiresAuth: true,
          is_admin: true
        }
    },
    {
      path: '/admin/user/:id_user',
      name: 'EditUser',
      component: EditUser,
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
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('auth') == null) {
      next({
        name: 'LoginPage',
        params: { nextUrl: to.fullPath }
      })
    } else {
      let user = JSON.parse(localStorage.getItem('user'))
      if (to.matched.some(record => record.meta.is_admin)) {
        if (user.is_admin === true) {
          next()
        } else {
          next({ name: 'LogoutPage' })
        }
      } else {
        next()
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('auth') == null) {
      next()
    } else {
      next({ name: 'LogoutPage' })
    }
  } else {
    next()
  }
})

export default router
