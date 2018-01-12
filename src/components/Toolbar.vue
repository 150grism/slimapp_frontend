<template>
  <div class="toolbar">
    <div class="toolbar__left">
      <a v-on:click="allBreedsPicturesUpdater" class="toolbar__item update-all-breeds">Update pictures</a>
      <a v-on:click="allBreedsGetter" class="toolbar__item all-breeds">All Breeds</a>
      <a v-on:click="savedBreedsGetter" class="toolbar__item saved-breeds">Saved Breeds</a>
      <a v-on:click="savedPicturesGetter" class="toolbar__item saved-pictures">Saved Pictures</a>
    </div>
    <div class="toolbar__right"> 
      <a v-on:click="logerin" class="toolbar__item login">Log in</a>
      <a v-on:click="signerup" class="toolbar__item signup">Sign up</a>
    </div>
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
  /* height: 36px; */
  /* background: rgb(218, 191, 196); */
  margin-bottom: 10px;
}

.toolbar__left {
  display: flex;
  flex-direction: row;
}

.toolbar__right {
  display: flex;
  flex-direction: row;
}

.toolbar__item {
  display: block;
  line-height: 40px;
  padding: 0 4px;
  margin: 0 1px;
  text-align: center;
  color: white;
  border-radius: 3px;
  cursor: pointer;
  height: 40px; 
}

@media screen and (max-width: 537px) {
  .toolbar__item {
    line-height: 20px;
  }
}
 
.update-all-breeds {
  background: rgb(88, 88, 204);
}

.all-breeds {
  background: rgb(88, 204, 127);
}

.saved-breeds {
  background: rgb(204, 88, 117);
}

.saved-pictures {
  background: rgb(204, 192, 88);
}

.login {
  background: rgb(194, 26, 26);
}

.signup {
  background: rgb(55, 137, 139);
}

</style>
