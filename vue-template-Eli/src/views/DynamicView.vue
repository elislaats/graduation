<template>
    <div>
        <h1> Id: {{ id }}</h1>
    </div>
</template>

<script>
import { useStore } from 'vuex';

export default {
    name: 'DynamicView',
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    setup() {
        return { store: useStore() };
    }
};
</script>