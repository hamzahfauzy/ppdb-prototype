var Vue = require('vue');
Vue.component('app', require('./src/components/AppComponent.vue').default);

// import the plugin
import VueGAPI from "vue-gapi";

// var CLIENT_ID = '837735547679-a2plr31761f0fkm0j8uqe87erkbtkg56.apps.googleusercontent.com';
var CLIENT_ID = '520543846835-oi5o75oqeclq982n68lq8s0mivf691mm.apps.googleusercontent.com';
var API_KEY = 'AIzaSyCCk_584cshzhnQ4lD0rvc5Vooqrc0D4WA';
// var API_KEY = 'AIzaSyAyXlHRn-Rl1VmqkncSahXJRP3r1Pfl1-k';

// create the 'options' object
const apiConfig = {
  apiKey: API_KEY,
  clientId: CLIENT_ID,
  discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
  scope: "https://www.googleapis.com/auth/spreadsheets"
  // see all available scopes here: https://developers.google.com/identity/protocols/googlescopes'
};

// Use the plugin and pass along the configuration
Vue.use(VueGAPI, apiConfig);

new Vue({
  el: '#app',
})