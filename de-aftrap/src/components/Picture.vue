<script>
import axios from 'axios'
const API_URL = `https://dog.ceo/api/breeds/image/random`

export default {
    data() {
        return {
            imageUrl: "",
            breed: ""
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
            this.imageUrl = input.message;
            this.breed = input.message.split("/")[4].replace("-", " ")
        }
    }
}
</script>

<template>
    <div>
        <h2>{{ breed }}</h2>
        <img class="image" :src="imageUrl">
    </div>
</template>

<style scoped>
.image {
    border-radius: 10px;
    background-color: var(--color-indigo-light);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    width: 30vw;
    min-height: 100px;
}

h2 {
    text-transform: capitalize;
}
</style>