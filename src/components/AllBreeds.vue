<template>
  <div class="AllBreeds">
    <div id="images" class="images" ref="images">      
      <ABreed
        v-for="(url, index) in breedImageURLs"
        :key="index"
        :url="url"
        :breed="photosOfABreed ? photosOfABreed : allBreeds[index][1] + ' ' + allBreeds[index][0]"
        v-on:breedOpening="openBreed(allBreeds[index])"
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
      url: '',
      photosOfABreed: ''
    }
  },
  directives: {
    imagesLoaded
  },
  methods: {
    fetchAllBreeds() {
      this.$http.get('https://dog.ceo/api/breeds/list/all')
        .then(response => {
          let message = response.body.message
          for (const aBreed in message) {
            if (!message[aBreed].length) {
              this.allBreeds.push([aBreed, ''])
            } else {
              let subBreeds = message[aBreed]
              subBreeds.forEach(subBreed => {
                let subBreedLowerCase = subBreed.toLowerCase()
                this.allBreeds.push([aBreed, subBreedLowerCase])
              })
            }
          }
          this.allBreeds.sort()
        })
        .then(() => {
          Promise.all(this.allBreeds.map(asBreed => {
            let url = asBreed[1] != '' ? `https://dog.ceo/api/breed/${asBreed[0]}/${asBreed[1]}/images/random` : `https://dog.ceo/api/breed/${asBreed[0]}/images/random`
            return this.$http.get(url)
              .then(response => {
                return response.body.message
              })
          }))
          .then(allUrls => {
            this.breedImageURLs = allUrls
            console.log(this.breedImageURLs)
          })
        })
    },
    openBreed(asBreed) {
      console.log(asBreed[1] != '')
      this.photosOfABreed = asBreed[1]
      let url = asBreed[1] != '' ? `https://dog.ceo/api/breed/${asBreed[0]}/${asBreed[1]}/images` : `https://dog.ceo/api/breed/${asBreed[0]}/images`
      console.log(url)
      this.$http.get(url)
        .then(response => {
          this.breedImageURLs = response.body.message
          console.log(this.breedImageURLs)
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
   grid-auto-rows: 10px;
}

</style>
