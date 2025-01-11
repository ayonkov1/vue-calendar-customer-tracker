<!-- app.vue -->
<script setup lang="ts">
import { ref, reactive } from 'vue'
import {
    VAutocomplete,
    VBtn,
    VDatePicker,
    VTextField,
} from 'vuetify/components'
import CustomItemField from '~/components/CustomItemField.vue'
import { useItemManagement } from '~/composables/useDailyItemManagement'

const date = ref<Date>(new Date())
const formattedDate = computed(() => formatDate(date.value))

const pickableItems = ref<[string]>(['Възрастни', 'Деца', 'Частни'])
const pickableItem = ref<string>('')

const { itemsForDate, handleIncrement, handleDecrement, addItem } =
    useItemManagement(date)
</script>

<template>
    <VDatePicker
        v-model="date"
        color="#e2a0e5"
        elevation="18"
        first-day-of-week="1"
        rounded="0"
        width="100vw" />

    <div class="px-10 mt-10">
        <VAutocomplete
            density="compact"
            label="Trackable"
            :items="pickableItems"
            variant="outlined"
            v-model="pickableItem">
            <template #append>
                <VBtn
                    :disabled="!pickableItem"
                    variant="elevated"
                    color="primary"
                    @click="addItem(pickableItem)">
                    Add
                </VBtn>
            </template>
        </VAutocomplete>
    </div>
    <div class="mt-10">
        <CustomItemField
            v-for="(field, index) in itemsForDate"
            :key="index"
            :label="field.title"
            :count="field.count"
            @decrement="handleDecrement(index)"
            @increment="handleIncrement(index)" />
    </div>
</template>
