import { createApp } from 'vue';

import HelloWorldComponent from './components/HelloWorld.vue';

const app = createApp({
  components: {
    HelloWorldComponent,
  }
});

app.mount("#app");