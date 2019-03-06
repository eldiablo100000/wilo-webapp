
<template>
  <vl-map ref="map" v-if="showMap" data-projection="EPSG:4326" renderer="webgl">
    <vl-view :center.sync="center" :rotation.sync="rotation" :zoom.sync="zoom"  />
    <vl-layer-image id="xkcd" v-if="image" :overlay="true" :opacity="0.5" >
      <vl-source-image-static :url="imgUrl" :size="imgSize" :extent="imgExtent" :projection="projection"
                                :attributions="imgCopyright"></vl-source-image-static>
    </vl-layer-image>

    <vl-geoloc @update:position="geolocPosition = $event">
      <template slot-scope="geoloc">
        <vl-feature v-if="geoloc.position" id="position-feature">
          <vl-geom-point :coordinates="geoloc.position"></vl-geom-point>
          <vl-style-box>
            <vl-style-icon src="static/marker.png" :scale="0.4" :anchor="[0.5, 1]"></vl-style-icon>
          </vl-style-box>
        </vl-feature>
      </template>
    </vl-geoloc>
    <vl-graticule :show-labels="true" v-if="graticule">
      <vl-style-stroke :line-dash="[5, 10]" color="green" slot="stroke"></vl-style-stroke>
      <vl-style-text slot="lon" text-baseline="bottom">
        <vl-style-stroke color="blue" />
      </vl-style-text>
      <vl-style-text slot="lat" text-align="end">
        <vl-style-stroke color="black" />
      </vl-style-text>
    </vl-graticule>

    <vl-layer-tile>
      <vl-source-osm />
    </vl-layer-tile>
    <vl-feature v-if="imgStatic && image" id="static-image">
      <vl-geom-point :coordinates="[12.4098176, 44.51205119999997]" :z-index="3"></vl-geom-point>
        <vl-style-box>
          <vl-style-icon src="static/logo.png" :scale="imgScaleValue" :anchor="imgAnchor" :rotation.sync="imgRotation"></vl-style-icon>
        </vl-style-box>
    </vl-feature>

    <vl-layer-vector id="features" >
      <vl-source-vector :features.sync="features" />
    </vl-layer-vector>
    <template v-for="(item, index) in features">
      <vl-feature :key="index">
            <vl-geom-point :coordinates="item.geometry.coordinates" :z-index="3"></vl-geom-point>
            <vl-style-box>
              <vl-style-icon src="static/marker.png" :scale="0.4" :anchor="[0.5, 1]"></vl-style-icon>
            </vl-style-box>
      </vl-feature>
    </template>
    <vl-layer-vector id="draw-pane" :z-index="0">
      <vl-source-vector :features.sync="drawnFeatures" ident="draw-target" />
    </vl-layer-vector>
    <vl-interaction-draw :type="drawType" source="draw-target" v-if="drawType != null" />
    <vl-interaction-modify :type="drawType" source="draw-target" v-if="drawType != null" />
    <vl-interaction-select ref="select" v-if="drawType == null" :condition="selectCondition" :features.sync="selectedFeatures" />
      <vl-feature v-if="selectedFeatures.length == 1" :properties="{ start: Date.now(), duration: 2500 }">
        <vl-geom-point v-if="selectedFeatures[0].geometry.type === 'Point'" :coordinates="selectedFeatures[0].geometry.coordinates" :z-index="3"></vl-geom-point>
        <vl-geom-point v-if="selectedFeatures[0].geometry.type === 'Polygon'" :coordinates="selectedFeatures[0].geometry.coordinates[0][0]" :z-index="3"></vl-geom-point>
        <vl-style-box>
          <vl-style-icon src="static/mario.png" :scale="0.1" :anchor="[0.5, 1]" ></vl-style-icon>
        </vl-style-box>
      </vl-feature>
  </vl-map>
</template>
