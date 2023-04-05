<template>
    <div class="grid align-center">
        <h1 class="col-1-1"> {{ this.title }}</h1>
        <p class="col-1-1"> retrieved from page id: {{ id }}</p>
        <div class="blocks col-1-1 grid">
            <div v-for="(block, index) in this.blocks" v-bind:key="index" class="contentblock col-1-4">
                <p>{{ block._block._name }}</p>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'DynamicView',
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    created() {
        this.getPageData(this.id)
    },
    data() {
        return {
            title: null,
            blocks: null
        }
    },
    computed: {
        pagedata() {
            return this.$store.state.pagedata
        }
    },
    watch: {
        pagedata(value) {
            console.log(value)
            this.title = value.content.titel
            this.blocks = value.content.content
        },
        id(value) {
            this.getPageData(value)
        }
    },
    methods: {
        async getPageData(id) {
            this.$store.commit('setPageid', id)
            await this.$store.dispatch('loadPageData')
        }
    }
};
</script>

<style lang="scss">
.blocks {
    .contentblock {
        aspect-ratio: 2 / 1;
        border: 1px solid #fba400;
    }
}
</style>