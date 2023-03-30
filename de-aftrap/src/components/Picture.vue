<script>
import { createSimpleExpression } from '@vue/compiler-core';
import axios from 'axios'
const API_URL = `https://dog.ceo/api/breeds/image/random`

export default {
    data() {
        return {
            apiLoaded: false,
            gradient: "linear-gradient(0deg, rgba(0,21,36,.9) 0%, rgba(0,21,36,0.2) 20%, rgba(0,21,36,0) 25%, rgba(0,21,36,0) 100%)",
            imageUrl: null,
            imageBreed: null,
            imageRatio: null
        }
    },
    async created() {
        const imageData = await this.getPicture();
        this.setPicture(imageData);
    },
    methods: {
        getPicture: async function () {
            try {
                const response = await axios.get(API_URL);
                return response.data
            } catch (error) {
                console.error(error);
            }
        },
        setPicture: function (imageData) {
            this.imageUrl = imageData.message;
            this.imageBreed = imageData.message.split("/")[4].replace("-", " ");
            this.getAspectRatio().then(ratio => {
                this.imageRatio = ratio;
            });
            this.apiLoaded = true;
        },
        getAspectRatio: async function () {
            let image = new Image()
            image.src = this.imageUrl;
            await image.decode();
            return image.naturalWidth + " / " + image.naturalHeight;
        }
    }
}
</script>

<template>
    <div v-if="this.apiLoaded" class="pictureBlock loaded"
        v-bind:style="{ backgroundImage: gradient + ', url(' + imageUrl + ')', aspectRatio: imageRatio }">
        <h2>{{ imageBreed }}</h2>
    </div>
    <div v-else class="pictureBlock loading">
        <svg xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
            <path
                d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
        </svg>
    </div>
</template>

<style scoped>
h2 {
    text-transform: capitalize;
}

.pictureBlock {
    border-radius: 30px;
    background-color: var(--color-indigo-light);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    width: 65%;
    max-height: 45vh;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: flex-end;
    justify-content: center;
}

.pictureBlock.loading {
    widows: 100%;
    height: 100%;
    background-color: none;
    align-items: center;
    justify-content: center;
}

.pictureBlock.loading svg {
    height: 20%;
    align-items: center;
    justify-content: center;
    animation: spinPulse .5s infinite steps(8);
}

.pictureBlock.loading svg path {
    fill: var(--color-beige)
}
</style>