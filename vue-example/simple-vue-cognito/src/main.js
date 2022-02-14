import { createApp } from 'vue';

import HelloWorldComponent from './components/HelloWorld.vue';

import CognitoAuth from './js/cognito.js';

const app = createApp({
  components: {
    HelloWorldComponent,
  }
});

app.config.globalProperties.$CognitoAuth = new CognitoAuth();
app.mount("#app");