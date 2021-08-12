<template>
    <section class="section">
        <b-field label="Value">
            <b-input v-model="value" @input="change"></b-input>
        </b-field>
        <b-field label="Value">
            <b-input type="textarea" v-model="computedValue"></b-input>
        </b-field>
        Length: {{ computedValue.length }}
    </section>
</template>

<script>

const codec = require('json-url')('lzma')

export default {
    data()
    {
        return {
            value: '{"v":0,"s":1,"steps":[{"id":0},{"id":1},{"id":2},{"id":3}]}',
            computedValue: ''
        }
    },
    methods:
    {
        async change()
        {
            const str = await codec.compress(this.value)
            this.computedValue = str
        }
    }
}
</script>