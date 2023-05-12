<template>
    <main class="grid align-content-start">
        <h1 class="col-1-1"> {{ this.title }}</h1>
        <p class="col-1-1"> retrieved from page id: {{ id }}</p>
        <div class="blocks col-1-1 grid">
            <div v-for="(block, index) in this.blocks" v-bind:key="index" class="contentblock border-primary bg-white"
                :class="{ 'col-1-3': !block.aanvullenMet }">
                <p class="text-orange"> <strong>Type: </strong> {{ block._block._name }}</p>
                <h5 v-show="block.titel" v-html="block.titel" class="titel"></h5>
                <p v-show="block.inleiding" v-html="block.inleiding"></p>

                <div v-if="block.aanvullenMet" class="grid">
                    <p class="col-1-1"> <strong> Aanvullen met: {{ block.aanvullenMet }} </strong></p>
                    <div class="aanvulling border-success col-1-5" v-for="item in this.allseries[block.aanvullenMet]"
                        v-bind:key="item.name" v-html="item.content.titel" v-show="item.content.titel">
                    </div>
                </div>

            </div>
        </div>

    </main>
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
    }

    .aanvulling {
        text-align: center;
        aspect-ratio: 4 / 1;
        font-size: .9em;
        word-break: break-word;
    }
}

.bold {
    font-weight: bold;
}
</style>