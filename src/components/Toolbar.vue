<template>
  <div class="toolbar">
    <div>
      <a v-on:click="allBreedsPicturesUpdater" class="all-breeds">Update pictures</a>
      <a v-on:click="allBreedsGetter" class="all-breeds">All Breeds</a>
      <a v-on:click="savedBreedsGetter" class="saved-breeds">Saved Breeds</a>
      <a v-on:click="savedPicturesGetter" class="saved-pictures">Saved Pictures</a>
    </div>
    <a v-on:click="logerin" class="login">Log in</a>
    <a v-on:click="signerup" class="signup">Sign in</a>
  </div>
</template>

<script>
export default {
  props: [],
  data () {
    return {

    }
  },
  methods: {
    allBreedsPicturesUpdater() {
      this.$emit('allBreedsPicturesUpdating')
    },
    allBreedsGetter() {
      this.$emit('allBreedsGetting')
    },
    savedBreedsGetter() {
      this.$emit('savedBreedsGetting')
    },
    savedPicturesGetter() {
      this.$emit('savedPicturesGetting')
    },
    logerin() {
      this.$emit('logingin', 'login')
    },
    signerup() {
      this.$emit('signingup', 'signup')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.toolbar {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 36px;
  background: rgb(218, 191, 196);
}

</style>
