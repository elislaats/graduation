<template>
  <div class='pictureContainer' v-show="this.loaded">
    <p>
      <span class="title" v-show="this.title"> {{ this.title }} </span>
      <span v-show="this.artist"> By {{ this.artist }}</span>
    </p>
    <img ref="img" src="../assets/fa-noimage.svg" alt="no image available">
  </div>
  <div class="loading" v-show="!this.loaded">
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ArtworkComp',
  props: {
    inputId: String
  },
  data() {
    return {
      loaded: false,
      id: null,
      title: null,
      artist: null,
      imageUrl: null,
    }
  },
  methods: {
    async getRandomPainting() {
      const randomPage = Math.round(Math.random() * 9966); // TO DO: function that gets total pages from API
      const randomIndex = Math.round(Math.random() * 12); // Default pagination has 12 artworks on each page
      const apiUrl = `https://api.artic.edu/api/v1/artworks?page=${randomPage}&fields=id,artist_title,title,image_id`
      try {
        const response = await axios.get(apiUrl, { headers: { 'AIC-User-Agent': 'school-project, eli@cre8ion.com' } })
        this.loaded = true
        return response.data.data[randomIndex];
      } catch (error) {
        console.log(error);
      }
    },
  },
  async created() {
    await this.getRandomPainting()
      .then(response => {
        const data = response;
        console.log(data);
        this.id = data.id
        this.title = data.title
        this.artist = data.artist_title
        const imgEl = this.$refs.img;
        if (data.image_id != null) {
          imgEl.src = `https://www.artic.edu/iiif/2/${data.image_id}/full/843,/0/default.jpg`
          imgEl.alt = this.title;
          imgEl.className = 'available';
        }
      })
  },
  getRandomId() {
    return
  }
}
</script>

<style scoped lang="scss">
.loading::after,
.loading::before {
  content: " ";
  display: inline-block;
  background-color: var(--tan);
  border-radius: 100%;
  animation: pulse .75s ease alternate infinite;
  min-width: 1.5rem;
  min-height: 1.5rem;
}

.loading::before {
  animation-direction: alternate-reverse;
}

.pictureContainer {
  display: grid;
  grid: auto 1fr / 1fr;
  align-items: center;
  gap: .5rem;
  max-width: 60vw;

  img {
    max-height: 100px;
    justify-self: center;

    &.available {
      max-height: 50vh;
      max-width: 60vw;
      box-shadow: 3px 3px 10px black;
      border: 20px solid;
      border-image: url('../assets/border.png') 90 / 20px;
    }

    p {
      align-self: start;
    }
  }

  .title {
    font-weight: 800;
  }
}
</style>
