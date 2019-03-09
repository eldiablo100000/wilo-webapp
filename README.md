# WI-LO Web Application: a simple webapp for WIreless LOcator based on MEVN stack

> A webapp to quickly and easily insert floor plans, in 2 dimensions and of various formats (planimetries), of interesting buildings and to indicate the relative Reference points over them.

## Pre-requisites
nodejs (used v8.10.0)
npm (used 3.5.2)
mongodb (used 3.6.3)

### Linux installation
```` bash
    sudo apt-get install nodejs npm mongodb
````
###TODO
Dockerize application to run in 2 or 3 container

## Build Setup

``` bash
# install dependencies
npm run setup

# serve the frontend with hot reload at localhost:8080
npm run dev

# build for production with minification and serve at localhost:30000
npm run build

# build for production and view the bundle analyzer report
npm run build --report

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
