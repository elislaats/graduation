<script setup>
import { defineProps } from 'vue';
const props = defineProps(['id'])

</script>

<template>
    <div class="grid">
        <div class="col-1-1">
            <h2>{{ props.id }}</h2>
        </div>
    </div>
</template>