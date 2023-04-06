<template>
  <Transition name="picture">
    <div class='pictureContainer' :class="{ flippedCard: this.flipped }" @click="this.flipCard()" v-if="this.loaded">
      <div class="front" v-show="this.showFront">
        <ArtworkHeader :title="this.title" :artist="this.artist"> </ArtworkHeader>
        <img ref="img" src="../assets/fa-noimage.svg" alt="no image available">
      </div>
      <div class="back" v-show="!this.showFront">
        <ArtworkHeader :title="this.title" :artist="this.artist"> </ArtworkHeader>
        <div class="specs">
          <span v-for="(value, key) in this.specs" v-show="value" v-bind:key="key">
            <p class="key">{{ key }}</p>
            <p class="value" v-html="value"></p>
          </span>
          <span v-if="!this.specs[0]">
            <p>no more information availabe</p>
          </span>
        </div>
      </div>
    </div>
  </Transition>
  <div class="loading" v-if="!this.loaded">
  </div>
</template>

<script>
import axios from 'axios';
import ArtworkHeader from './ArtworkHeader.vue';

export default {
  name: 'ArtworkComp',
  props: {
    inputId: String
  },
  components: {
    ArtworkHeader
  },
  data() {
    return {
      flipped: false,
      showFront: true,
      loaded: false,
      id: null,
      title: null,
      artist: null,
      specs: {},
      imageUrl: null
    }
  },
  methods: {
    async getRandomPainting() {
      const randomPage = Math.round(Math.random() * 9966); // TO DO: function that gets total pages from API
      const randomIndex = Math.round(Math.random() * 12); // Default pagination has 12 artworks on each page
      const apiUrl = `https://api.artic.edu/api/v1/artworks?page=${randomPage}&fields=id,artist_title,thumbnail,title,image_id,medium_display,style_title,date_display,dimensions,artwork_type_title,copyright_notice`
      try {
        const response = await axios.get(apiUrl, { headers: { 'AIC-User-Agent': 'school-project, eli@cre8ion.com' } })
        this.loaded = true
        return response.data.data[randomIndex];
      } catch (error) {
        console.log(error);
      }
    },
    flipCard() {
      this.flipped = !this.flipped
      setTimeout(() => {
        this.showFront = !this.showFront
      }, 500);
    },
    checkImage(id, element, title) {
      if (id !== null) {
        const image = new Image();
        image.src = `https://www.artic.edu/iiif/2/${id}/full/843,/0/default.jpg`

        image.onload = function () {
          const imgEl = element;
          imgEl.src = image.src;
          imgEl.className = 'available';
          imgEl.alt = "image of artwork " + title;
        }
      }
    }
  },
  async created() {
    await this.getRandomPainting()
      .then(response => {
        const data = response;
        console.log(data);
        this.id = data.id
        this.title = data.title
        this.artist = data.artist_title
        this.checkImage(data.image_id, this.$refs.img, this.title)
        this.specs.description = data.thumbnail.alt_text
        this.specs.type = data.artwork_type_title
        this.specs.style = data.style_title
        this.specs.medium = data.medium_display
        this.specs.date = data.date_display
        this.specs.dimensions = data.dimensions.replaceAll(";", " <br>")
        this.specs.copyright = data.copyright_notice;
      })
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

.flippedCard {
  transform: rotateY(180deg);
}

.loading::before {
  animation-direction: alternate-reverse;
}

.pictureContainer {
  width: 60vw;
  height: 80vh;
  background-color: var(--offwhite);
  border-radius: 30px;
  box-shadow: 3px 3px 8px var(--royal-blue);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 1s ease-in-out;
  transform-style: preserve-3d;

  .front,
  .back {
    max-width: 90%;
    height: 80%;
    display: grid;
    grid: .5fr .5fr 10fr / 1fr;
    align-items: center;
    justify-content: center;
    gap: .5rem;
    justify-content: space-around;

    p {
      color: var(--royal-blue);
      font-weight: 300;
    }
  }

  .front {
    img {
      min-height: 100px;
      max-height: 100px;
      justify-self: center;

      &.available {
        min-height: 25%;
        min-width: 25%;
        max-height: 100%;
        max-width: 100%;
        box-shadow: 3px 3px 10px var(--oxford-blue);
        border: 1px solid var(--oxford-blue);
      }
    }
  }

  .back {
    transform: rotateY(180deg);

    .specs {
      min-height: 60%;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      span {
        .key {
          font-weight: 500;
          text-transform: capitalize;
        }
      }
    }
  }
}
</style>
