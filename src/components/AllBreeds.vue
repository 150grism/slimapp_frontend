<template>
  <div class="UserSavedBreeds">
    <div id="images" v-images-loaded="packGrid" class="images" ref="images">
      <div class="image" v-for="(url, index) in breedImageURLs" ref="imageConts" :key="index">
        <img :src="url" :id="imageId[index]" :alt="allBreeds[index]">
          <!-- {{allBreeds[index]}} -->
      </div>
    </div>
  </div>
</template>

<script>
import imagesLoaded from 'vue-images-loaded'
export default {
  data () {
    return {
      allBreeds: [],
      breedImageURLs: [],
      imageId: []
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
    },
    packGrid() {
      let imageConts = this.$refs.imageConts
      imageConts.forEach((imageCont) => {
        let image = imageCont.children[0]
        let rowSpan = Math.floor((image.height + 2) / 5)
        imageCont.style.gridRowEnd = 'span ' + rowSpan
        image.height = (rowSpan - 1) * 5
        console.log(image.height)
        // let columnSpan = Math.ceil(image.height / 60)
        // imageCont.style.gridColumnEnd = 'span ' + columnSpan
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
   grid-auto-rows: 3px;
}

.images > .image {
}

.images > .image > img {
  display: block;
  margin: 0 auto;
  max-width: 100%;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.4);
}

</style>
