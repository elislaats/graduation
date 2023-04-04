<template>
    <h1>{{ id }}</h1>
</template>

<script>
import axios from 'axios'

export default {
    props: {
        id: {
            type: Number,
            required: true
        },
    },
    async created() {
        await this.getPageData();
    },
    methods: {
        async getPageData() {
            const apiUrl = `https://api-cre8ion.tc8l.dev/api/page/` + this.id
            try {
                await axios.get(apiUrl).then(response => {
                    console.log(response)
                })
            } catch (error) {
                console.error(error)
            }
        }
    }
};
</script>