import Vue from 'vue'
import VueRouter from 'vue-router'
import WebRouter from './src/routes/web'
import VueGAPI from "vue-google-api";
import VueSweetalert2 from 'vue-sweetalert2';

import 'sweetalert2/dist/sweetalert2.min.css';

Vue.component('app', require('./src/components/AppComponent.vue').default);

// import the plugin

var CLIENT_ID = '520543846835-oi5o75oqeclq982n68lq8s0mivf691mm.apps.googleusercontent.com';
var API_KEY = 'AIzaSyCCk_584cshzhnQ4lD0rvc5Vooqrc0D4WA';

// create the 'options' object
const apiConfig = {
  apiKey: API_KEY,
  clientId: CLIENT_ID,
  discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
  scope: "https://www.googleapis.com/auth/spreadsheets"
  // see all available scopes here: https://developers.google.com/identity/protocols/googlescopes'
};

var routes = WebRouter.routes

const router = new VueRouter({
  // base:'/ppdb/',
  routes,
  // mode: 'history'
})

// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if(nearestWithTitle) document.title = nearestWithTitle.meta.title;

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if(!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta');

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key]);
    });

    // We use this to track which meta tags we create, so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
  })
  // Add the meta tags to the document head.
  .forEach(tag => document.head.appendChild(tag));

  next();
});

// Use the plugin and pass along the configuration
Vue.use(VueGAPI, apiConfig);
Vue.use(VueRouter)
Vue.use(VueSweetalert2)

new Vue({
	router
}).$mount('#app')