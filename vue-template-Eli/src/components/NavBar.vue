<template>
    <router-link v-for="route in this.routes" :key="route.path" :to="route.path">{{ route.name }}</router-link>
</template>
<script>
export default {
    name: 'NavBar',
    props: {
        routes: {
            type: Array,
            required: true
        }
    }
}
</script>