<template>
  <div class="ABreed" v-images-loaded="packGrid" ref="tile"
    v-on:mouseover="mouseover" 
    v-on:mouseleave="mouseleave" 
    v-on:click="click">

    <img :src="url" :alt="subbreed + ' ' + breed">
    <div class="text-wall">
      <div class="text-wall__big-block">
        <div class="text-wall__block">
          <span class="text-wall__item save-breed" v-on:click="savee('breed')">+breed</span>
          <span class="text-wall__item delete-breed" v-on:click="deletee('breed')">-breed</span>
        </div>
        <div class="text-wall__block">
          <span class="text-wall__item save-picture" v-on:click="savee('picture')">+picture</span>
          <span class="text-wall__item delete-picture" v-on:click="deletee('picture')">-picture</span>
        </div>
      </div>
      <span class="open" v-on:click="breedOpener">OPEN</span>
    </div>
    <span class="breedTag">{{subbreed ? subbreed + ' ' + breed : breed}}</span>

  </div>
</template>

<script>
import imagesLoaded from 'vue-images-loaded'

var autoRows = 10
var rowGap = 2
const gridConst = {
  autoRows: autoRows,
  rowGap: rowGap,
  total: autoRows + rowGap
}

export default {
  props: ['url', 'breed', 'subbreed', 'mode', 'userId', 'userPicBreedId'],
  data () {
    return {
      clickState: false,
      autoRows: 10,
      rowGap: 2,
    }
  },
  directives: {
    imagesLoaded
  },
  watch: {
    autoRows: function() {

    }
  },
  methods: {
    packGrid() {
      let tile = this.$refs.tile
      // console.log(this.breed)
      let image = tile.children[0]
      let rowSpan = Math.floor((image.height + this.rowGap) / (this.autoRows + this.rowGap))
      tile.style.gridRowEnd = 'span ' + rowSpan
      image.height = rowSpan * (this.autoRows + this.rowGap) - this.rowGap

      let textWall = tile.children[1]
      // console.log(textWall)
      textWall.style.height = image.height - 34 + 'px'
      textWall.style.width = image.width + 'px'
      textWall.style.marginLeft = -(image.width / 2) + 'px'
      textWall.style.fontSize = Math.min(image.height, image.width) / 7 + 'px'

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
      tile.children[1].style.display = 'none'
      this.clickState = false
    },
    click(event) {
      let tile = this.$refs.tile
      this.clickState = !this.clickState
      // console.log(this.clickState)
      this.clickState ? tile.children[1].style.display = 'flex' : tile.children[1].style.display = 'none'
      // tile.children[1].style.display = 'block'
    },
    savee(item) {
      let load = item === 'breed' ? {breed: this.breed, subbreed: this.subbreed} : {breed: this.breed, subbreed: this.subbreed, picture_url: this.url}
      console.log(item)
      let url = item === 'breed' ? 'http://slimapp/api/users/' + this.userId + '/save' : 'http://slimapp/api/users/' + this.userId + '/picture/save'
      this.$http.post(url, load)
        .then(response => {
          console.log('hello there', response)
        })
    },
    deletee(item) {
      let url = item === 'breed' ? 'http://slimapp/api/users/' + this.userPicBreedId + '/delete' : 'http://slimapp/api/users/' + this.userPicBreedId + '/picture/delete'
      this.$http.delete(url)
        .then(response => {
          console.log(response)
        })
    },
    breedOpener() {
      this.$emit('breedOpening')
    },
    changeGridConsts(autoRows, rowGap) {
      this.autoRows = autoRows
      this.rowGap = rowGap
    }
  },
  created: function() {
    window.innerWidth < 534 ? this.changeGridConsts(40,5) : window.innerWidth < 787 ? this.changeGridConsts(20,2) : window.innerWidth < 1039 ? this.changeGridConsts(15,2) : console.log('ok')
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

.text-wall {
  position: absolute;
  justify-content: space-between;
  flex-direction: column-reverse;
  margin: 0 auto;
  /* width: 100%;
  height: 100%; */
  top: 0;
  left: 50%;
  display: none;
  /* background: rgba(51,51,51,0.8); */
  text-shadow: 1px 1px 1px black;
}

.text-wall__big-block {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.text-wall__block {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.text-wall__item {
  /* position: absolute; */
  width: 100%;
  display: block;
  /* bottom: 50px; */
  left: 0;
  color: white;
  /* font-size: 30px; */
  visibility: visible;
  overflow: visible;
  cursor: pointer;
}

.save-breed {
  top: calc(50% - 68px);
}

.delete-breed {
  top: calc(50% - 34px);
}

.save-picture {
  top: calc(50% - 0px);
}

.delete-picture {
  top: calc(50% + 43px);
}

.open {
  margin: 0 auto;
  left: 0;
  top: calc(50% - 51px);
  text-align: center;
  color: white;
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
  overflow-x: visible;
  z-index: 1;
}

</style>
