<script setup>
import { defineProps, ref, watch } from 'vue';
import { useStore } from 'vuex'

const props = defineProps({
    id: {
        type: Number,
        required: true
    }
})

const store = useStore()

const elements = ref([]);

async function getElements(id) {
    const check = await store.getters.getDatabankById(id);

    if (!check) {
        await store.dispatch('loadDatabank', props.id)
        const data = await store.getters.getDatabankById(id)
        console.log('databank from api id:' + id)
        elements.value = data
    } else {
        console.log('databank from store id:' + id)
        elements.value = check
    }
}

watch(() => props.id, (value) => {
    getElements(value)
})

getElements(props.id)
</script>

<template>
    <div v-if="elements" class="grid">
        <div v-for="(element, index) in elements" v-bind:key="'el' + index" class="border-info col-1-4 bg-white">
            <h6 v-if="element.content.titel"> {{ element.content.titel }}</h6>
            <p v-if="element.content.subtitel"><strong> {{ element.content.subtitel }}</strong></p>
            <p v-if="element.content.inleiding" v-html="element.content.inleiding" class="text-info"></p>
        </div>
    </div>
    <div v-else>
        <p>loading...</p>
    </div>
</template>