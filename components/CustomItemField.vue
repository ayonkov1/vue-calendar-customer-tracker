<script setup>
import { defineEmits, defineProps } from 'vue'

const props = defineProps({
    label: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    },
    trackables: {
        type: {},
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
const track = ref(props.trackables)

const pricePerItem = computed(() => {
    return track.value.filter((el) => el.type === props.label)[0].price
})
</script>

<template>
    <div></div>
    <div class="flex justify-left items-center gap-5 mb-5">
        <v-btn
            class="opacity-80"
            @click="onDelete"
            icon="mdi-delete-outline"
            size="x-small"
            rounded="lg"
            variant="outlined"
            color="error"
        ></v-btn>

        <p class="capitalize">{{ label }}: {{ count }}</p>
        <p class="ml-auto italic text-sm">({{ (count * pricePerItem).toFixed(2) }} лв.)</p>

        <v-btn
            :disabled="count === 0"
            size="x-small"
            color="#c43427"
            rounded="lg"
            variant="tonal"
            @click="onDecrement"
            icon="mdi-minus"
        >
        </v-btn>
        <v-btn
            icon="mdi-plus"
            size="x-small"
            variant="flat"
            color="#63b25b"
            rounded="lg"
            @click="onIncrement"
        >
        </v-btn>
    </div>
</template>
