<template>
  <div class="AllBreeds">
    <div id="images" class="images" ref="images">      
      <ABreed
        v-for="(url, index) in breedImageURLs"
        :key="index"
        :url="url"
        :breed="allBreeds[index]"
      />

      <!-- supposed to be in ABreed -->
      <!-- <img :src="url" :id="imageId[index]" v-on:mouseover="asd" v-on:mouseleave="dsa" v-on:click="click" :alt="allBreeds[index]">
      <div class="textWall">
        <span class="save">SAVE</span>
      </div>
      <span class="breedTag">  {{allBreeds[index]}} </span> -->
    </div>
  </div>
</template>

<script>
import ABreed from './ABreed.vue'
import imagesLoaded from 'vue-images-loaded'
export default {
  components: {
    ABreed
  },
  data () {
    return {
      allBreeds: [],
      breedImageURLs: [],
      url: ''
      // imageId: []
    }
  },
  directives: {
    imagesLoaded
  },
  methods: {
    fetchAllBreeds() {
      this.$http.get('https://dog.ceo/api/breeds/list/all')
        .then(response => {
          this.allBreeds = Object.keys(response.body.message).map(element => {
            return element
          })
        })
        .then(() => {
          Promise.all(this.allBreeds.map((breed) => {
            return this.$http.get('https://dog.ceo/api/breed/' + breed + '/images/random')
              .then(response => {
                return response.body.message
              })
          }))
          .then(all => {
            this.breedImageURLs = all
          })
        })
    }
  },
  created: function() {
    this.fetchAllBreeds()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.images {
   display: grid;
   grid-column-gap: 2px;
   grid-row-gap: 2px;
   grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
   grid-auto-flow: dense;
   grid-auto-rows: 5px;
}

</style>
