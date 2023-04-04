<template>
    <h1 v-if="this.loaded">{{ id }}</h1>
</template>

<script>
import axios from 'axios'

export default {
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            loaded: false,
            pageData: null
        }
    },
    async created() {
        await this.getPageData().then(response => {
            this.pageData = response;
            this.loaded = true;
        })
        console.log()
    },
    methods: {
        async getPageData() {
            const apiUrl = `https://api-cre8ion.tc8l.dev/api/page/` + this.id
            try {
                await axios.get(apiUrl).then(response => {
                    console.log(response.data.content)
                    return response.data.content
                })
            } catch (error) {
                console.error(error)
            }
        }
    }
};
</script>