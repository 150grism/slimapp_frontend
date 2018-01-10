<template>
  <div class="log-sign-in" ref="modal">
    <form v-on:submit="login" class="form"> 
      <!-- action="http://slimapp/api/users/signup" method="post"  -->
      <label>User<input v-model="user" class="user" type="text"></label>
      <label>Password<input v-model="password" class="password" type="text"></label>
      <input v-if="logSignin === 'login'" class="submit" type="submit" value="Log in">
      <input v-else class="submit" type="submit" value="Sign in">
    </form>
    <button v-on:click="cancel" class="cancel">Cancel</button>
  </div>
</template>

<script>
export default {
  props: ['logSignin'],
  data () {
    return {
      user: '',
      password: '',
      userId: 0
    }
  },
  methods: {
    login(e) {
      e.preventDefault()
      if (this.logSignin === 'login') {
        this.$http.post('http://slimapp/api/users/login', {"user": this.user, "password": this.password})
          .then(response => {
            let userId = response.body[0].user_id
            userId !== 0 ? this.$emit('logingin', userId) : console.log('no user')
          })
      } else {
        this.$http.post('http://slimapp/api/users/signup', {"user": this.user, "password": this.password})
        .then(response => {
          console.log(response)
        })
      }
      this.user = ''
      this.password = ''  
    },
    cancel() {
      this.$emit('displaying', 'no')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.log-sign-in {
  display: block;
  position: fixed;
  left: calc(50% - 100px);
  width: 200px;
  height: 100px;
  z-index: 100;
  background: crimson;
}

</style>
