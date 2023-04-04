<template>
  <Transition name="picture">
    <div class='pictureContainer' v-show="this.loaded" @click="this.showFront = !this.showFront">
      <div class="front" v-if="this.showFront">
        <p class="title" v-show="this.title"> {{ this.title }} </p>
        <p class="artist" v-show="this.artist"> {{ this.artist }}</p>
        <img ref="img" src="../assets/fa-noimage.svg" alt="no image available">
      </div>
      <div class="back" v-else>
        <div>
          <p class="title" v-show="this.title"> {{ this.title }} </p>
          <p class="artist" v-show="this.artist"> {{ this.artist }}</p>
          <p v-for="(value, key) in this.specs" v-bind:key="key"> <span class="key"> {{ key }}:</span> {{ value }}</p>
        </div>
      </div>
    </div>
  </Transition>
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
      showFront: true,
      loaded: false,
      id: null,
      title: null,
      artist: null,
      specs: {
        type: null,
        medium: null,
        date: null,
        dimensions: null
      },
      imageUrl: null,
    }
  },
  methods: {
    async getRandomPainting() {
      const randomPage = Math.round(Math.random() * 9966); // TO DO: function that gets total pages from API
      const randomIndex = Math.round(Math.random() * 12); // Default pagination has 12 artworks on each page
      const apiUrl = `https://api.artic.edu/api/v1/artworks?page=${randomPage}&fields=id,artist_title,title,image_id,medium_display,date_display,dimensions,artwork_type_title`
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
        this.specs.type = data.artwork_type_title
        this.specs.medium = data.medium_display
        this.specs.date = data.date_display
        this.specs.dimensions = data.dimensions
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

  .front,
  .back {
    display: grid;
    padding: 30px 50px;
    border-radius: 30px;
    width: 60vw;
    height: 80vh;
    background-color: var(--offwhite);
    align-items: center;
    justify-content: center;

    p {
      text-align: center;
      max-width: 70vw;
      color: var(--royal-blue);
      font-weight: 300;

      .key {
        font-weight: 500;
        text-transform: capitalize;
      }
    }

    .artist {
      font-size: 1.1em;
      font-weight: 700;
    }

    .title {
      font-size: 1.3em;
      font-weight: 700;
    }
  }

  .front {
    grid: auto 1fr / 1fr;

    gap: .5rem;

    box-shadow: 3px 3px 8px black;


    img {
      min-height: 100px;
      max-height: 100px;
      justify-self: center;

      &.available {
        max-height: 100%;
        max-width: 100%;
        box-shadow: 3px 3px 10px black;
        border: 1px solid black;
      }
    }
  }
}
</style>
