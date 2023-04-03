<script>
import Picture from '../components/Picture.vue'

export default {
    props: {
        show: Boolean,
        imageUrl: {
            type: String,
            required: true
        },
    },
    data() {
        return {
            urlBreed: "",
            key: 0,
            instruction: false,
            mousePos: ["0", "0"],
            timer: 0
        }
    },
    components: {
        Picture
    },
    watch: {
        show: function (val) {
            if (val) {
                this.urlBreed = this.getBreedFromURL()
            }
        }
    },
    methods: {
        getBreedFromURL: function () {
            const breedBuilder = this.imageUrl.split("/")[4].split("-")
            const urlBreed = breedBuilder.join("/");
            return urlBreed;

        }
    }
}
</script>

<template>
    <Transition name="modal">
        <div v-if="show" class="overlay">
            <div class="content">
                <button class="default-button close-btn" @click="$emit('close')"> <img src="./icons/fa-xmark.svg"
                        alt="close">
                </button>
                <h2>More of this breed</h2>
                <Picture :key="key" @click="key++" @mouseover="this.instruction = true"
                    @mouseleave="this.instruction = false" :breed="this.urlBreed"></Picture>
                <p class="instruction" v-show="this.instruction">
                    click for a new picture</p>

            </div>
        </div>
    </Transition>
</template>

<style scoped>
.overlay {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    z-index: 100;
    background-color: rgba(0, 0, 0, .2);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
}

.content {
    width: 70vw;
    height: 75vh;
    background-color: var(--color-beige);
    border-radius: 60px;
    display: grid;
    padding: 2rem;
    grid: 1fr 8fr 12px / 1fr;
}

.content h2 {
    justify-self: center;
    align-self: top;
    color: var(--color-indigo-light);
}

.close-btn {
    position: absolute;
    top: 25px;
    right: 25px;
    border-radius: 25px;
    font-size: larger;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
}

.close-btn img {
    width: 80%;
}

.instruction {
    color: var(--color-indigo);
    text-align: center;
}

.loaded {
    max-width: calc(65vw - 2rem);
    max-height: calc(70vh - 10% - 12px);
    justify-self: center;
    align-self: normal;
}
</style>
