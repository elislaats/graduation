<template>
    <div class="grid align-center">
        <h1 class="col-1-1"> {{ this.title }}</h1>
        <p class="col-1-1"> retrieved from page id: {{ id }}</p>
        <div class="blocks col-1-1 grid">
            <div v-for="(block, index) in this.blocks" v-bind:key="index" class="contentblock col-1-3">
                <h4>{{ block._block._name }}</h4>

                <div v-if="block.aanvullenMet" class="grid">
                    <p class="col-1-1"> <strong> Aanvullen met: {{ block.aanvullenMet }} </strong></p>
                    <div class="aanvulling col-1-3" v-for="item in this.allseries[block.aanvullenMet]"
                        v-bind:key="item.name" v-html="item.content.titel" v-show="item.content.titel != ''">
                    </div>
                </div>
                <p v-else v-html="block.titel"></p>
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
            blocks: []
        }
    },
    computed: {
        pagedata() {
            return this.$store.state.pagedata
        },
        allseries() {
            return this.$store.state.allseries
        }
    },
    watch: {
        pagedata(value) {
            this.title = value.content.titel
            this.blocks = [];
            value.content.content.forEach(item => {
                this.blocks.push(item)
                if (item.aanvullenMet != "" && item.aanvullenMet != undefined) {
                    this.$store.dispatch('loadSeries', parseInt(item.aanvullenMet))
                }
            })
        },
        allseries(value) {
            console.log('here')
            console.log(value)
        },
        id(value) {
            this.getPageData(value)
        }
    },
    methods: {
        async getPageData(id) {
            await this.$store.dispatch('loadPageData', id)
        }
    }
};
</script>

<style lang="scss">
.blocks {
    .contentblock {
        min-height: 10vh;
        border: 1px solid #fba400;
    }

    .aanvulling {
        aspect-ratio: 2 / 1;
        border: 1px solid grey;
        font-size: .9em;
        word-break: break-word;
    }
}

.bold {
    font-weight: bold;
}
</style>