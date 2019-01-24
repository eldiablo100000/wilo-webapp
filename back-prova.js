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
      path: '/upload/',
      name: 'Upload',
      component: Upload
    },
    {
      path: '/manipulate-img/',
      name: 'ManipulateImg',
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
      path: '/buildings',
      name: 'BuildingList',
      component: BuildingList
    },
    {
      path: '/show-building/:id_building',
      name: 'ShowBuilding',
      component: ShowBuilding
    },
    {
      path: '/add-building',
      name: 'CreateBuilding',
      component: CreateBuilding
    },
    {
      path: '/edit-building/:id_building',
      name: 'EditBuilding',
      component: EditBuilding
    },

    // floor
    {
      path: '/building/:id_building',
      name: 'Building',
      children: [
        {
          path: 'floors',
          name: 'FloorList',
          component: FloorList
        },
        {
          path: 'show-floor/:id_floor',
          name: 'ShowFloor',
          component: ShowFloor
        },
        {
          path: 'add-floor',
          name: 'CreateFloor',
          component: CreateFloor
        },
        {
          path: 'edit-floor/:id_floor',
          name: 'EditFloor',
          component: EditFloor
        },
        // anchor
        {
          path: 'floor/:id_floor',
          name: 'Floor',
          children: [
            {
              path: 'anchors',
              name: 'AnchorList',
              component: AnchorList
            },
            {
              path: 'show-anchor/:id_anchor',
              name: 'ShowAnchor',
              component: ShowAnchor
            },
            {
              path: 'add-anchor',
              name: 'CreateAnchor',
              component: CreateAnchor
            },
            {
              path: 'edit-anchor/:id_anchor',
              name: 'EditAnchor',
              component: EditAnchor
            }
          ]
        }
      ]
    },

    // admin
    {
      path: '/admin',
      name: 'Admin',
      children: [
        {
          path: '/buildings',
          name: 'AdminBuildingList',
          component: AdminBuildingList
        },
        {
          path: '/floors',
          name: 'AdminFloorList',
          component: AdminFloorList
        },
        {
          path: '/anchors',
          name: 'AdminAnchorList',
          component: AdminAnchorList
        }
      ]
    }
  ]
})

