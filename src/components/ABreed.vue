<template>
  <div class="ABreed" v-images-loaded="packGrid" ref="tile"
    v-on:mouseover="mouseover" 
    v-on:mouseleave="mouseleave" 
    v-on:click="click">

    <img :src="url" :alt="breed">
    <div class="textWall">
      <span v-if="mode === 'all breeds'" class="open" v-on:click="breedOpener">OPEN</span>
      <span class="save" v-on:click="saveBreed">SAVE</span>
    </div>
    <span class="breedTag">  {{breed}} </span>

  </div>
</template>

<script>
import imagesLoaded from 'vue-images-loaded'

const autoRows = 10
const rowGap = 2
const gridConst = {
  autoRows: autoRows,
  rowGap: rowGap,
  total: autoRows + rowGap
}

export default {
  props: ['url', 'breed', 'mode', 'userId'],
  data () {
    return {
      clickState: false
    }
  },
  directives: {
    imagesLoaded
  },
  methods: {
    packGrid() {
      let tile = this.$refs.tile
      // console.log(this.breed)
      let image = tile.children[0]
      let rowSpan = Math.floor((image.height + gridConst.rowGap) / gridConst.total)
      tile.style.gridRowEnd = 'span ' + rowSpan
      image.height = rowSpan * gridConst.total - gridConst.rowGap

      let textWall = tile.children[1]
      // console.log(textWall)
      textWall.style.height = image.height + 'px'
      textWall.style.width = image.width + 'px'
      textWall.style.marginLeft = -(image.width / 2) + 'px'

      let breedTag = tile.children[2]
      if (breedTag.style.width <= image.width) {
        breedTag.style.width = image.width + 'px'
        breedTag.style.marginLeft = -(image.width / 2) + 'px'
      } else {
        breedTag.style.marginLeft = -(breedTag.style.width / 2) + 'px'
      }

      // breedTag.style.top = image.height - 34 + 'px'
    },
    mouseover(event) {
      let tile = this.$refs.tile
      // console.log(event.target)
      tile.children[2].style.visibility = 'visible'
    },
    mouseleave(event) {
      let tile = this.$refs.tile
      tile.children[2].style.visibility = 'hidden'
    },
    click(event) {
      let tile = this.$refs.tile
      this.clickState = !this.clickState
      // console.log(this.clickState)
      this.clickState ? tile.children[1].style.display = 'block' : tile.children[1].style.display = 'none'
      // tile.children[1].style.display = 'block'
    },
    saveBreed() {
      let load = this.mode === 'all breeds' ? {breed: this.breed} : {picture_url: this.url}
      let url = this.mode === 'all breeds' ? 'http://slimapp/api/users/' + this.userId + '/save' : 'http://slimapp/api/users/' + this.userId + '/picture/save'
      this.$http.post(url, load)
        .then(response => {
          console.log(response)
        })
    },
    breedOpener() {
      this.$emit('breedOpening')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.ABreed {
  position: relative;
}

.ABreed > img {
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
  display: none;
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

.open {
  position: absolute;
  width: 100%;
  /* bottom: 50px; */
  left: 0;
  top: calc(50% - 51px);
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
  left: 50%;
  bottom: 0;
  text-align: center;
  background: rgba(51,51,51,0.8);
  color: white;
  font-size: 30px;
  visibility: hidden;
  overflow: visible;
  z-index: 1;
}

</style>
