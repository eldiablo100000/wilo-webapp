<template>
  <div >
    <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true" style="height: 400px">
      <vl-view :projection="projection" :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>

      <vl-layer-image id="xkcd">
        <vl-source-image-static :url="imgUrl" :size="imgSize" :extent="imgExtent" :projection="projection"
                                :attributions="imgCopyright"></vl-source-image-static>
      </vl-layer-image>
    </vl-map>
  </div>
</template>

<script>
import {createProj, addProj} from 'vuelayers/lib/ol-ext'
// Map views always need a projection.  Here we just want to map image
// coordinates directly to map coordinates, so we create a projection that uses
// the image extent in pixels.
let size = [1024, 968]
let extent = [0, 0, ...size]
// create custom projection for image
// NOTE: VueLayers.olExt available only in UMD build
// in ES build it should be imported explicitly from 'vuelayers/lib/ol-ext'
let customProj = createProj({
  code: 'xkcd-image',
  units: 'pixels',
  extent
})
// add it to the list of known projections
addProj(customProj)

export default {
  data () {
    return {
      zoom: 2,
      maxZoom: 8,
      center: [size[0] / 2, size[1] / 2],
      rotation: 0,
      projection: customProj.getCode(),
      imgUrl: 'https://imgs.xkcd.com/comics/online_communities.png',
      imgCopyright: '© <a href="http://xkcd.com/license.html">xkcd</a>',
      imgSize: size,
      imgExtent: extent
    }
  }
}
</script>
