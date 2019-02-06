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
import MapDemo from '@/components/MapDemo'
// import Image from '@/components/Image'

import Upload from '@/components/Upload'

import ManipulateImage from '@/components/ManipulateImage'
import LoginPage from '@/components/LoginPage'
import RegisterPage from '@/components/RegisterPage'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'MapDemo',
      component: MapDemo
    },
    {
      path: '/login/',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/register/',
      name: 'RegisterPage',
      component: RegisterPage
    },
    {
      path: '/upload/',
      name: 'Upload',
      component: Upload
    },
    {
      path: '/manipulate-img/',
      name: 'ManipulateImage',
      component: ManipulateImage
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
      path: '/:id_user/buildings/',
      name: 'BuildingList',
      component: BuildingList
    },
    {
      path: '/:id_user/show-building/:id_building',
      name: 'ShowBuilding',
      component: ShowBuilding
    },
    {
      path: '/:id_user/add-building',
      name: 'CreateBuilding',
      component: CreateBuilding
    },
    {
      path: '/:id_user/edit-building/:id_building',
      name: 'EditBuilding',
      component: EditBuilding
    },
    // floor
    {
      path: '/building/:id_building/floors/',
      name: 'FloorList',
      component: FloorList
    },
    {
      path: '/building/:id_building/show-floor/:id_floor',
      name: 'ShowFloor',
      component: ShowFloor
    },
    {
      path: '/building/:id_building/add-floor',
      name: 'CreateFloor',
      component: CreateFloor
    },
    {
      path: '/building/:id_building/edit-floor/:id_floor',
      name: 'EditFloor',
      component: EditFloor
    },
    // anchor
    {
      path: '/building/:id_building/floor/:id_floor/anchors',
      name: 'AnchorList',
      component: AnchorList
    },
    {
      path: '/building/:id_building/floor/:id_floor/show-anchor/:id_anchor',
      name: 'ShowAnchor',
      component: ShowAnchor
    },
    {
      path: '/building/:id_building/floor/:id_floor/add-anchor',
      name: 'CreateAnchor',
      component: CreateAnchor
    },
    {
      path: '/building/:id_building/floor/:id_floor/edit-anchor/:id_anchor',
      name: 'EditAnchor',
      component: EditAnchor
    },
    {
      path: '/admin/buildings',
      name: 'AdminBuildingList',
      component: AdminBuildingList
    },
    {
      path: '/admin/floors',
      name: 'AdminFloorList',
      component: AdminFloorList
    },
    {
      path: '/admin/anchors',
      name: 'AdminAnchorList',
      component: AdminAnchorList
    }

  ]
})
