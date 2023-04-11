<script setup>
import ContentBlock from '../components/ContentBlock.vue'
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
        <p class="col-1-1">Opgehaald van <strong>/api/pages/{{ props.id }}</strong>:</p>
        <ContentBlock v-for="(element, index) in elements" v-bind:key="'el' + index" class="border-info col-1-3 bg-white"
            :type="'Aangevuld element'" :color="'info'" :content="element.content">
        </ContentBlock>
    </div>
    <div v-else>
        <p>loading...</p>
    </div>
</template>