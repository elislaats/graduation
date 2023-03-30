<script>
import axios from 'axios'
const API_URL = `https://dog.ceo/api/breeds/image/random`

export default {
    data() {
        return {
            imageUrl: "",
            breed: "",
            gradient: "linear-gradient(0deg, rgba(0,21,36,.9) 0%, rgba(0,21,36,0) 23%, rgba(0,21,36,0) 100%)"
        }
    },
    created() {
        axios
            .get(API_URL)
            .then(response => (this.handleMyData(response.data)))
            .catch(error => console.log(error))
    },
    methods: {
        handleMyData: function (input) {
            this.imageUrl = input.message
            this.breed = input.message.split("/")[4].replace("-", " ")
        }
    }
}
</script>

<template>
    <div v-bind:style="{ backgroundImage: gradient + ', url(' + imageUrl + ')' }">
        <h2>{{ breed }}</h2>
    </div>
</template>

<style scoped>
div {
    border-radius: 10px;
    background-color: var(--color-indigo-light);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    width: 100%;
    aspect-ratio: 1.2 / 1;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: flex-end;
    justify-content: center;
}

h2 {
    text-transform: capitalize;
}
</style>