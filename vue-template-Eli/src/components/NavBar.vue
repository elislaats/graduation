<template>
    <div id="nav">
        <router-link v-for="route in this.routes" :key="route.path" :to="route.path">{{ route.name }}</router-link>
    </div>
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

<style lang="scss">
#nav
{   
    position: sticky;
    top: 0;
    background-color: white;
    width: 100%;
    display: flex;
    justify-content: space-around;
    a{
        color: inherit;
        text-decoration: none;
        text-transform: uppercase;
        font-size: large;
        transition: .25s ease-in;
        &:hover{
            color: black;
        }
    }
}
</style>