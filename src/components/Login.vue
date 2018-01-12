<template>
  <div class="log-sign-in" ref="modal">
    <form v-on:submit="login" class="form"> 
      <!-- action="http://slimapp/api/users/signup" method="post"  -->
      <label>User<input v-model="user" class="user" type="text"></label>
      <label>Password<input v-model="password" class="password" type="text"></label>
      <input v-if="logSignin === 'login'" class="submit" type="submit" value="Log in">
      <input v-else class="submit" type="submit" value="Sign up">
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
            this.cancel()
          })
      } else {
        this.$http.post('http://slimapp/api/users/signup', {"user": this.user, "password": this.password})
        .then(response => {
          console.log(response)
          this.cancel()
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
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 5px auto;
  width: 250px;
  height: 140px;
  z-index: 100;
  background: #005b9f;
  border-radius: 3px;
}

.form {
  margin-left: 7px;
  color: white;
}

.cancel {
  margin-top: -8px;
  margin-right: 7px;
  height: 60px;
  width: 80px;
  background: #ff6659;
  border: 1px solid rgb(95, 95, 95);
  color: rgb(128, 5, 5);
  border-radius: 3px;
  cursor: pointer;
}

.submit {
  margin-top: 5px;
  background: #ffab40;
  border: 1px solid rgb(95, 95, 95);
  color: black;
  width: 60px;
  border-radius: 3px;
  cursor: pointer;
}

.user, .password {
  border: 1px solid rgb(192, 192, 192);
  outline-color: rgb(101, 167, 221);
}

</style>
