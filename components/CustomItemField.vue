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
        <VBtn
            @click="onDelete"
            icon="mdi-delete-outline"
            size="x-small"
            rounded="lg"
            color="error"></VBtn>
        <p class="capitalize">{{ label }}: {{ count }}</p>
        <VBtn
            :disabled="count === 0"
            class="ml-auto"
            size="small"
            color="#c43427"
            rounded="lg"
            @click="onDecrement"
            icon="mdi-minus">
        </VBtn>
        <VBtn
            icon="mdi-plus"
            size="small"
            color="#63b25b"
            rounded="lg"
            @click="onIncrement">
        </VBtn>
    </div>
</template>
