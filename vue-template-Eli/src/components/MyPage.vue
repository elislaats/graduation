<template>
    <h1>{{ id }}</h1>
</template>

<script>
export default {
    props: {
        id: {
            type: Number,
            required: true
        },
    },
    async created(){
        
    },
};
</script>