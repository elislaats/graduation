<script>
import Picture from '../components/Picture.vue'

export default {
  data() {
    return {
      numberInput: 1,
      generateIndex: 0,
      displayPictures: false,
      columns: null,
      rows: null,
      amountOfPictures: null,
    }
  },
  components: {
    Picture
  },
  methods: {
    placePictures() {
      this.amountOfPictures = parseInt(this.numberInput);
      this.rows = this.columns = Math.ceil(this.amountOfPictures / 4)
      this.columns = Math.ceil(this.amountOfPictures / this.rows)
      this.generateIndex++
      this.displayPictures = true;
    }
  }
}


</script>

<template>
  <main>
    <div class="num-form">
      <button class="default-button" @click="placePictures"> Generate <span class="focus">{{ numberInput }}</span> random
        dog pictures </button>
      <div class="num-control">
        <button class="default-button" @click="this.numberInput++" :disabled="this.numberInput >= 20"> + </button>
        <button class="default-button" @click="this.numberInput--" :disabled="this.numberInput <= 1"> - </button>
      </div>
    </div>

    <div id='pictureBox' ref='pictureBox' v-if="displayPictures" v-bind:style="{
      gridTemplateColumns: 'repeat(' + this.columns + ', 1fr)', gridTemplateRows: 'repeat(' + this.rows + ', 1fr)'
    }">
      <Picture :key="this.generateIndex" v-for="n in amountOfPictures" v-bind:style="{
        maxHeight: 'calc(90vh/ ' + this.rows.toString() + ')', maxWidth: 'calc((100vw - 100px) / ' + this.columns.toString() + ')'
      }">
      </Picture>
    </div>
  </main>
</template>

<style scoped>
* {
  overflow: hidden;
}

main {
  grid-template: 1fr 90vh / 1fr;
  justify-content: stretch;
  align-items: stretch;
}

.num-form {
  grid-row: 1 / 2;
  width: 20rem;
  align-self: start;
  display: flex;
}

.num-form .default-button {
  flex-grow: 5;
}

.num-form .num-control {
  flex-grow: 1;
}

.num-control .default-button {
  width: fit-content;
  padding-top: 0;
  padding-bottom: 0;
  display: block;
  font-size: 1.2em;
  font-weight: bold;
  background-color: transparent;
}

.focus {
  font-size: 1.2em;
  font-weight: bold;
  color: var(--color-orange);
}

#pictureBox {
  grid-row: 2 / 3;
  display: grid;
  gap: 1rem;
}
</style>
