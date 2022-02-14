<template>
  <div>
    <label for="username">Username</label>
    <input type="text" id="username" name="username" v-model="username">
    <br/>
    <label for="email">Email</label>
    <input type="text" id="email" name="email" v-model="email">
    <br/>
    <label for="password">Password</label>
    <input type="text" id="password" name="password" v-model="password">
    <br/>
    <button type="button" @click="signUp()">Sign Up</button>
    <button type="button" @click="signIn()">Sign In</button>
    
    <br/>
    <br/>
    <p>Name : {{ username }}</p>
    <p>Email : {{ email }}</p>
    <p>Password : {{ password }}</p>
    <br/>
    <br/>
    <h3>Status</h3>
    <p>{{ status }}</p>
    <h3>Message</h3>
    <p>{{ message }}</p>

  </div>
</template>

<script>
export default {
  props: {
    textData: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      status: "Hello", 
      message: 'Hello World From Vue!!!',
      username: "",
      email: "",
      password: "",
    }
  },
  methods: {
    logging(error, result) {
      if (error) {
        this.status = 'Error'
        this.message = error
        console.error(error)
      }
      if (result) {
        this.status = 'success'
        this.message = result
        console.log(result)
      }
    },
    signUp() {
      this.$CognitoAuth.signup(this.username, this.email, this.password, this.logging)
    },
    signIn() {
      this.$CognitoAuth.authenticate(this.username, this.password, this.logging)
    }
  },
}
</script>