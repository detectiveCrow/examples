<template>
  <div>
    <h1>{{ message }}</h1>
    <p>{{ textData }}</p>
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
      message : 'Hello World From Vue!!!'
    }
  },
}
</script>