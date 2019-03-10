<template>
  <div>
    <h2>About Wilo</h2>
  <vue-pdf-viewer height="100vh" :url="url">
      </vue-pdf-viewer>
    </div>
</template>

<script>
import VuePDFViewer from 'vue-instant-pdf-viewer'

export default {
  name: 'About',
  components: {
    'vue-pdf-viewer': VuePDFViewer
  },
  data () {
    return {
      url: 'http://localhost:3000/static/Wilo.pdf'
    }
  }
}
</script>

<style lang="css" scoped>
  #buttons {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  /* Page content */
  .content {
    padding: 16px;
  }
</style>
