<template>
  <div class="UserSavedBreeds">
    <!-- <img v-bind:src="this.breedImageURLs" alt="">    -->
    <ul id="images">
      <li v-for="(url, index) in breedImageURLs" :key="index">
        <img :src="url" alt="">
        {{userSavedBreeds[index]}}
        {{index}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userSavedBreeds: [],
      breedImageURLs: []
    }
  },
  methods: {
    fetchSavedBreeds() {
      this.$http.get('http://slimapp/api/user/1')
        .then(response => {
          this.userSavedBreeds = response.body.map(element => {
            console.log(element)
            return element.breed_name
          })
        })
        .then(() => {
          Promise.all(this.userSavedBreeds.map((breed) => {
            return this.$http.get('https://dog.ceo/api/breed/' + breed + '/images/random')
              .then(response => {
                console.log(response.body.message)
                return response.body.message
              })
          }))
          .then(all => {
            this.breedImageURLs = all
            return console.log(all)
          })
        })
    }
  },
  created: function() {
    this.fetchSavedBreeds()
  }
  // updated: function() {
  //   this.fetchSavedBreeds()
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
