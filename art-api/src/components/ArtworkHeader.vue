<template>
    <p class="title">
        <span v-if="this.title">{{ this.title }}</span>
        <span v-else> Untitled Artwork </span>
    </p>
    <p class="artist">
        <span v-if="this.artist">{{ this.artist }}</span>
        <span v-else> Unknown Artist </span>
    </p>
</template>

<script>
export default {
    name: 'ArtworkHeader',
    props: {
        title: String,
        artist: String
    }
}

</script>

<style scoped>
p {
    text-align: center;
    max-width: 70vw;
    color: var(--royal-blue);
    font-weight: 300;
}

.artist {
    font-size: 1.1em;
    font-weight: 600;
}

.title {
    font-size: 1.4em;
    font-weight: 700;
}
</style>