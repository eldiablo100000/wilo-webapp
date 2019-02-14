<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Show Anchor
        <b-link :href="anchorList">(Anchor List)</b-link>
      </h2>
      <b-jumbotron>
        <template slot="header">
          {{anchor.name}}
        </template>
        <template slot="lead">
          name: {{anchor.name}}<br>
        </template>
        <hr class="my-4">
        <p>
          Updated Date: {{anchor.updated_date}}
        </p>
        <b-btn variant="success" @click.stop="editanchor(anchor._id)">Edit</b-btn>
        <b-btn variant="danger" @click.stop="deleteanchor(anchor._id)">Delete</b-btn>
      </b-jumbotron>
    </b-col>
  </b-row>
</template>

<script>

import axios from 'axios'

export default {
  name: 'ShowAnchor',
  data () {
    return {
      anchor: [],
      floor: {},
      errors: []
    }
  },
  created () {
    this.anchorList = '#/building/' + this.$route.params.id_building + '/floor/' + this.$route.params.id_floor + '/anchors'

    axios.get(`http://localhost:3000/anchor/` + this.$route.params.id_anchor)
      .then(response => {
        this.anchor = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
  },
  methods: {
    editanchor (anchorid) {
      this.$router.push({
        name: 'EditAnchor',
        params: { id_anchor: anchorid }
      })
    },
    deleteanchor (anchorid) {
      axios.delete('http://localhost:3000/anchor/' + anchorid)
        .then((result) => {
          axios.get('http://localhost:3000/floor/' + this.$route.params.id_floor)
            .then((result) => {
              var index = result.data.anchors.indexOf(anchorid)
              if (index > -1) {
                result.data.anchors.splice(index, 1)
                this.floor = result.data
              }
              axios.put('http://localhost:3000/floor/' + this.$route.params.id_floor, this.floor)
                .then((result) => {
                  this.$router.push({
                    name: 'AnchorList'
                  })
                })
                .catch(e => {
                  this.errors.push(e)
                })
            })

            .catch(e => {
              this.errors.push(e)
            })
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
}
</script>

<style>
  .jumbotron {
    padding: 2rem;
  }
</style>
