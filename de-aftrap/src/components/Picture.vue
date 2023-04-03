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
            cssImageRatio: null
        }
    },
    props: {
        breed: String
    },
    async created() {
        const imageData = await this.getPicture();
        this.setPicture(imageData);
    },
    methods: {
        getPicture: async function () {
            let TEMP_API_URL;
            if (this.breed != undefined) {
                TEMP_API_URL = `https://dog.ceo/api/breed/${this.breed}/images/random`;
            } else {
                TEMP_API_URL = API_URL;
            }
            try {
                const response = await axios.get(TEMP_API_URL);
                return response.data
            } catch (error) {
                console.error(error);
            }
        },
        setPicture(imageData) {
            this.imageUrl = imageData.message;
            this.imageBreed = imageData.message.split("/")[4].split("-").join("-");
            this.textBreed = imageData.message.split("/")[4].split("-").reverse().join(" ");
            this.getAspectRatio().then(ratio => {
                this.cssImageRatio = ratio;
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
    <div v-if="this.apiLoaded" class="loaded" v-bind:style="{ aspectRatio: cssImageRatio }">
        <Transition name="picture" appear>
            <div class="pictureBlock" v-show="this.apiLoaded"
                v-bind:style="{ backgroundImage: gradient + ', url(' + imageUrl + ')', aspectRatio: cssImageRatio }">
                <h2>{{ textBreed }}</h2>
            </div>
        </Transition>
    </div>
    <div v-else class="loading">
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

.loaded {
    display: flex;
    border-radius: 30px;
}

.pictureBlock {
    border-radius: 30px;
    background-color: var(--color-indigo-light);
    box-shadow: #0015245e 0px 3px 8px;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: flex-end;
    justify-content: center;
}

.loading {
    justify-self: center;
    display: grid;
    grid: 1fr / 1fr;
    align-items: center;
    justify-content: center;
    box-shadow: none;
}

.loading svg {
    height: 3rem;
    align-items: center;
    justify-content: center;
    animation: spinPulse .75s infinite steps(8);
}

.loading svg path {
    fill: var(--color-orange-dark)
}
</style>