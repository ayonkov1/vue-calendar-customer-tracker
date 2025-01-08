<script setup>
import { defineEmits, defineProps } from 'vue'

const props = defineProps({
    typeLabel: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    },
})

const emit = defineEmits(['decrement', 'increment'])

const onDecrement = () => {
    emit('decrement')
}

const onIncrement = () => {
    emit('increment')
}
</script>

<template>
    <div class="flex justify-left items-center gap-5 px-10 mb-5">
        <p class="capitalize">{{ typeLabel }}: {{ count }}</p>
        <v-btn
            :disabled="count === 0"
            class="ml-auto"
            @click="onDecrement">
            -
        </v-btn>
        <v-btn @click="onIncrement"> + </v-btn>
    </div>
</template>
