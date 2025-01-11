<script setup>
import { defineEmits, defineProps } from 'vue'

defineProps({
    label: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    },
})

const emit = defineEmits(['decrement', 'increment', 'delete'])

const onDecrement = () => {
    emit('decrement')
}

const onIncrement = () => {
    emit('increment')
}

const onDelete = () => {
    emit('delete')
}
</script>

<template>
    <div class="flex justify-left items-center gap-5 px-10 mb-5">
        <v-btn @click="onDelete"> del </v-btn>
        <p class="capitalize">{{ label }}: {{ count }}</p>
        <v-btn
            :disabled="count === 0"
            class="ml-auto"
            @click="onDecrement"
            icon>
            -
        </v-btn>
        <v-btn
            @click="onIncrement"
            icon>
            +
        </v-btn>
    </div>
</template>
