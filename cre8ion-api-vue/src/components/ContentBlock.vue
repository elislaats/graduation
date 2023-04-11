<script setup>
import DataBank from '../components/DataBank.vue'
import { defineProps } from 'vue';

const props = defineProps({
    type: {
        type: String,
        required: true
    },
    content: null
})
</script>

<template>
    <div class="bg-white border-primary" :class="{'col-1-3' : !props.content.aanvullenMet}">
        <p class="text-grey-dark">Type: {{ props.type }}</p>
        <h4 v-if="props.content.titel" class="text-black">{{ props.content.titel }}</h4>
        <DataBank v-if="props.content.aanvullenMet" :id="parseInt(props.content.aanvullenMet)" />
    </div>
</template>