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
        <div v-if="show" @click="$emit('close')" class="overlay">
            <div class="content" @click="key++">
                <h2>More of this breed</h2>
                <Picture :key="key" :breed="this.urlBreed"></Picture>
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
    grid: 1fr 8fr / 1fr
}

.content h2 {
    text-align: center;
    color: var(--color-indigo-light);
}
</style>
