<script setup>
import { ref, watch } from 'vue'
import { VDatePicker, VInput, VTextField } from 'vuetify/components'

const date = ref(new Date())
const title = ref('Title')
</script>

<template>
    <div>
        <VDatePicker
            v-model="date"
            style="width: 100%" />
    </div>
    <VTextField
        :prepend-icon="mdiMinusCircle"
        :label="title"
        class="px-20">
    </VTextField>
</template>
