<script setup lang="ts">
import { ref } from 'vue'
import { VAutocomplete, VBtn, VDatePicker } from 'vuetify/components'
import CustomItemField from '~/components/CustomItemField.vue'
import { useItemManagement } from '~/hooks/useDailyItemManagement'

const date = ref<Date>(new Date())
const { item, items, addItem, handleDecrement, handleIncrement } =
    useItemManagement()
</script>

<template>
    <VDatePicker
        v-model="date"
        color="#e2a0e5"
        elevation="18"
        first-day-of-week="1"
        rounded="0"
        width="100vw" />
    <VAutocomplete
        density="compact"
        label="Trackable"
        :items="['Възрастни', 'Деца', 'Частни']"
        variant="outlined"
        class="px-10 mt-10"
        v-model="item"
        @keyup.enter="addItem(date)">
        <template #append>
            <VBtn
                :disabled="!item"
                variant="elevated"
                color="primary"
                @click="addItem(date)">
                Add
            </VBtn>
        </template>
    </VAutocomplete>

    <div class="mt-5">
        <CustomItemField
            v-for="(field, index) in items"
            :key="index"
            :label="field.title"
            :count="field.count"
            @decrement="handleDecrement(index)"
            @increment="handleIncrement(index)" />
    </div>
</template>
