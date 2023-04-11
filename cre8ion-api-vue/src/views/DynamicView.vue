<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    id: {
        type: Number,
        required: true
    }
})
</script>

<template>
    <div class="grid">
        <div class="col-1-1">
            <h2>{{ props.id }}</h2>
        </div>
    </div>
</template>