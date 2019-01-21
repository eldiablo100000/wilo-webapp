import Vue from 'vue'
import Router from 'vue-router'
import BookList from '@/components/Books/BookList'
import ShowBook from '@/components/Books/ShowBook'
import CreateBook from '@/components/Books/CreateBook'
import EditBook from '@/components/Books/EditBook'

import BuildingList from '@/components/Buildings/BuildingList'
import ShowBuilding from '@/components/Buildings/ShowBuilding'
import CreateBuilding from '@/components/Buildings/CreateBuilding'
import EditBuilding from '@/components/Buildings/EditBuilding'

import FloorList from '@/components/Floors/FloorList'
import ShowFloor from '@/components/Floors/ShowFloor'
import CreateFloor from '@/components/Floors/CreateFloor'
import EditFloor from '@/components/Floors/EditFloor'

import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    // book
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
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
    },
    // building
    {
      path: '/buildings/',
      name: 'BookList',
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
    }
  ]
})
