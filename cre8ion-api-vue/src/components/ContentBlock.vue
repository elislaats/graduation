<script setup>
import DataBank from '../components/DataBank.vue'
import { defineProps } from 'vue';

const props = defineProps({
    type: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    content: null
})
</script>

<template>
    <div class="bg-white"
        :class="{ 'col-1-3': !props.content.aanvullenMet, 'border-primary': props.color == 'primary', 'border-info': props.color == 'info' }">
        <p class="text-grey-dark">Type: {{ props.type }}</p>
        <h4 v-if="props.content.titel" class="text-black">{{ props.content.titel }}</h4>
        <p v-if="props.content.subtitel"><strong> {{ props.content.subtitel }}</strong></p>
        <p v-if="props.content.inleiding" v-html="props.content.inleiding"
            :class="{ 'text-primary': props.color === 'primary', 'text-info': props.color === 'info' }"></p>
        <p v-if="props.content.tekst"> {{ props.content.tekst }}</p>
        <a v-if="props.content.url" v-bind:href="props.content.url"> {{ props.content.url }}</a>
        <DataBank v-if="props.content.aanvullenMet" :id="parseInt(props.content.aanvullenMet)" />
    </div>
</template>