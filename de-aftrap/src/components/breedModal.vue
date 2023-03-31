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
    components: {
        Picture
    },
    methods: {
        getBreedURL() {
            let breed = this.imageUrl.split("/")[4];
            let newURL = `https://dog.ceo/api/breed/${breed}/images/random`
            console.log(newURL)
            return newURL;

            //TO DO: Fix breeds with two parts -> call is out of order. 
        }
    }
}
</script>

<template>
    <Transition name="modal">
        <div v-if="show" @click="$emit('close')" class="overlay">
            <div class="content">
                <Picture :altAPI="getBreedURL()"></Picture>
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
    grid: 1fr / 1fr;
}
</style>
