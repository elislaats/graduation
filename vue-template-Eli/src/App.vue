<template>
  <div>{{ $route.params.name }}</div>
  <router-view></router-view>
  <router-link v-for="route in $router.getRoutes()" :key="route.path" :to="route.path">{{ route.name }}</router-link>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import router from './router/index.js'
import MyPage from './components/MyPage.vue'

//const API_URL_BASE = `https://api-cre8ion.tc8l.dev/api/`

export default {
  setup() {
    const store = useStore();
    const isAuthenticated = computed(() => store.getters.isAuthenticated);

    return { isAuthenticated };
  },
  async created() {
    await this.getRoutes();
  },
  methods: {
    async getRoutes() {
      /*
      const apiURl = API_URL_BASE + `navigation`
      try {
        axios.get(apiURl, {
          headers: { 'Content-Type': 'application/json;charset=UTF-8', "Access-Control-Allow-Origin": "*", }
        }).then(response => {
          console.log(response)
        })
      } catch (error) {
        console.error(error)
      }
    }
    */
      const response = [
        {
          "id": 4,
          "name": "Homepage",
          "url": "/homepage",
          "children": []
        },
        {
          "id": 1064,
          "name": "Cases",
          "url": "/cases",
          "children": []
        },
        {
          "id": 1065,
          "name": "Ons werk",
          "url": "/ons-werk",
          "children": []
        },
        {
          "id": 1066,
          "name": "Over ons",
          "url": "/over-ons",
          "children": []
        },
        {
          "id": 1067,
          "name": "Nieuws",
          "url": "/nieuws",
          "children": []
        },
        {
          "id": 1068,
          "name": "Vacatures",
          "url": "/vacatures",
          "children": []
        },
        {
          "id": 1069,
          "name": "Contact",
          "url": "/contact",
          "children": [
            {
              "id": 1077,
              "name": "Foo",
              "url": "/contact/foo",
              "children": [
                {
                  "id": 1078,
                  "name": "Bar",
                  "url": "/contact/foo/bar",
                  "children": [
                    {
                      "id": 1080,
                      "name": "New Sitemap",
                      "url": "/contact/foo/bar/new-sitemap",
                      "children": []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
      response.forEach(page => {
        if (!router.hasRoute(page.name)) {
          const route = {
            path: page.url,
            name: page.name,
            component: MyPage,
            props: { id: page.id }
          }
          router.addRoute(route);
        }
      });
    }
  }
};
</script>
