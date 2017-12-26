<template>
  <div class="UserSavedBreeds">
    <div id="images" v-images-loaded="packGrid" class="images" ref="images">
      <div class="image" v-for="(url, index) in breedImageURLs" ref="imageConts" :key="index">
        <img :src="url" :id="imageId[index]" v-on:mouseover="asd" :alt="allBreeds[index]">
        <div class="textWall">
          <span class="save">SAVE</span>
          <span class="breedTag">  {{allBreeds[index]}} </span>
        </div>
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
        let rowSpan = Math.floor((image.height + 2) / 7)
        imageCont.style.gridRowEnd = 'span ' + rowSpan
        image.height = (rowSpan - 1) * 7

        let textWall = imageCont.children[1]
        console.log(textWall)
        textWall.style.height = image.height + 'px'
        textWall.style.width = image.width + 'px'
        // breedTag.style.top = image.height - 34 + 'px'
        textWall.style.marginLeft = -(image.width / 2) + 'px'
      })
    },
    asd(event) {
      let hoveredImageDIV = event.target.parentElement
      hoveredImageDIV.children[1].style.visibility = 'visible'
      console.log(hoveredImageDIV.children[1])
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

.images > .image {
  position: relative;
}

.images > .image > img {
  display: block;
  margin: 0 auto;
  max-width: 100%;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.4);
}

.textWall {
  position: absolute;
  margin: 0 auto;
  /* width: 100%;
  height: 100%; */
  top: 0;
  left: 50%;
  /* background: rgba(51,51,51,0.8); */
}

.save {
  position: absolute;
  width: 100%;
  /* bottom: 50px; */
  left: 0;
  top: calc(50% - 17px);
  text-align: center;
  color: white;
  font-size: 30px;
  visibility: visible;
  overflow: visible;
  cursor: pointer;
}

.breedTag {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  /* top: 0; */
  text-align: center;
  background: rgba(51,51,51,0.8);
  color: white;
  font-size: 30px;
  visibility: visible;
  overflow: visible;
}

</style>
