<template>
  <div class="AllBreeds">
    <Toolbar 
      v-on:savedBreedsGetting="showSavedBreeds()" 
      v-on:savedPicturesGetting="showSavedPictures()" 
      v-on:allBreedsGetting="showAllBreeds()"
      v-on:signingin="signOrLogIn"
      v-on:logingin="signOrLogIn"/>
    <Login 
      v-if="logSignin !== 'no'"
      :logSignin="logSignin"
      v-on:displaying="signOrLogIn"
      v-on:logingin="logingIn"/>
    <div id="images" class="images" ref="images">      
      <ABreed v-if="item[urlIndex] !== undefined"
        v-for="item in bigArray"
        :key="item[0] + item[urlIndex]"
        :url="item[urlIndex]"
        :breed="photosOfABreed ? photosOfABreed : item[0]"
        :mode="mode"
        :userId="userId"
        v-on:breedOpening="openBreed(item)"
      />
    </div>
  </div>
</template>

<script>
import Login from './Login.vue'
import Toolbar from './Toolbar.vue'
import ABreed from './ABreed.vue'
export default {
  components: {
    Login,
    Toolbar,
    ABreed
  },
  data () {
    return {
      bigArray: [],
      allBreeds: [],
      savedBreeds: [],
      savedPictureUrls: [],
      breedImageURLs: [],
      url: '',
      photosOfABreed: '',
      urlIndex: 2,
      mode: 'all breeds',
      logSignin: 'no',
      userId: 0
    }
  },
  watch: {
    '$route' (to, from) {
      console.log(to.path, from.path)
      switch (to.path) {
        case '/all':
          console.log(this.allBreeds, this.bigArray)
          
      }
    }
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
          this.allBreeds = this.allBreeds.slice(0, 15)
          this.bigArray = this.allBreeds
          // console.log(this.$route.params.breed)
        })
        .then(() => {
          this.allBreeds.map((asBreed, index) => {
            let url = asBreed[1] !== '' ? `https://dog.ceo/api/breed/${asBreed[0]}/${asBreed[1]}/images/random` : `https://dog.ceo/api/breed/${asBreed[0]}/images/random`
            this.$http.get(url)
              .then(response => {
                asBreed.push(response.body.message)
              })
          })
        })
    },
    openBreed(asBreed) {
      this.photosOfABreed = asBreed[1] !== '' ? asBreed[1] + ' ' + asBreed[0] : asBreed[0]
      let breedName = asBreed[1] !== '' ? asBreed[0] + '-' + asBreed[1] : asBreed[0]
      this.$router.push(breedName)
      let url = asBreed[1] !== '' ? `https://dog.ceo/api/breed/${asBreed[0]}/${asBreed[1]}/images` : `https://dog.ceo/api/breed/${asBreed[0]}/images`
      this.$http.get(url)
        .then(response => {
          let newUrls = response.body.message
          this.urlIndex = 0
          this.bigArray = []
          this.mode = 'one breed'
          newUrls.forEach(url => {
            this.bigArray.push([url])
          })
          // console.log(this.$route.params.breed)
        })
    },
    showSavedBreeds() {
      this.$http.get('http://slimapp/api/user/' + this.userId + '/saved')
        .then(response => {
          let newBreeds = response.body
          console.log(newBreeds)
          this.urlIndex = 1
          this.bigArray = []
          this.savedBreeds = []
          this.mode = 'one breed'
          newBreeds.forEach(breed => {
            this.savedBreeds.push([breed.breed_name])
          })
          this.bigArray = this.savedBreeds
        })
        .then(() => {
          this.savedBreeds.map(asBreed => {
            let url = `https://dog.ceo/api/breed/${asBreed}/images/random`
            this.$http.get(url)
              .then(response => {
                asBreed.push(response.body.message)
                console.log(asBreed)
              })
          })
        })
    },
    showSavedPictures() {
      this.$http.get('http://slimapp/api/user/' + this.userId + '/pictures/saved')
        .then(response => {
          let newUrls = response.body
          console.log(newUrls)
          this.urlIndex = 0
          this.savedPictureUrls = []
          this.bigArray = []
          this.mode = 'one breed'
          newUrls.forEach(picture => {
            this.savedPictureUrls.push([picture.picture_url])
          })
          console.log(this.savedPictureUrls)
          this.bigArray = this.savedPictureUrls
        })
    },
    showAllBreeds() {
      this.fetchAllBreeds()
    },
    signOrLogIn(sl) {
      this.logSignin = sl
    },
    logingIn(userId) {
      console.log(userId)
      this.userId = userId
    }
  },
  created: function() {
    this.fetchAllBreeds()
  }
  // updated: function() {
  //   if (this.$route.params.breed === undefined) {
  //     this.urlIndex = 2
  //     this.fetchAllBreeds()
  //   }
  // }
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
