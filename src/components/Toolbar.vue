<template>
  <div class="toolbar">
    <div>
      <a v-on:click="allBreedsGetter" class="all-breeds">All Breeds</a>
      <a v-on:click="savedBreedsGetter" class="saved-breeds">Saved Breeds</a>
      <a v-on:click="savedPicturesGetter" class="saved-pictures">Saved Pictures</a>
    </div>
    <a v-on:click="logerin" class="login">Log in</a>
    <a v-on:click="signerin" class="signin">Sign in</a>
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
    signerin() {
      this.$emit('signingin', 'signin')
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
