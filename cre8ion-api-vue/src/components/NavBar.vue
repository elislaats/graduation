<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const routes = ref()

console.clear();

const loadRoutes = async () => {
    try {
        await axios.get('https://api-cre8ion.tc8l.dev/api/navigation')
            .then(response => {
                const data = response.data
                data.forEach(page => {
                    const route = {
                        path: page.url,
                        name: page.name,
                        component: () => import('@/views/DynamicView.vue'),
                        props: { id: page.id }
                    }
                    router.addRoute(route)
                })
                router.push('/homepage')
                if (router.hasRoute('Loading')) {
                    router.removeRoute('Loading')
                }
                routes.value = router.getRoutes();

            })
    } catch (error) {
        console.error(error)
    }
}
loadRoutes()

</script>

<template>
    <nav v-if="routes" class="grid col-1-1 justify-space-around">
        <router-link v-for="(route, index) in routes" v-bind:key="index" v-bind:to="route.path">
            {{ route.name }}</router-link>
    </nav>
</template>