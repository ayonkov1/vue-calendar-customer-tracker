<!-- app.vue -->
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { VBtn, VDatePicker, VCombobox } from 'vuetify/components'
import CustomItemField from '~/components/CustomItemField.vue'
import { useItemManagement } from '~/composables/useDailyItemManagement'

const date = ref<Date>(new Date())
const formattedDate = computed(() => formatDate(date.value))

const pickableItems = ref<[string]>(['Възрастни', 'Деца', 'Частни'])
const pickableItem = ref<string>(null)

const {
    itemsForDate,
    handleIncrement,
    handleDecrement,
    handleDelete,
    addItem,
} = useItemManagement(date)
</script>

<template>
    <div class="sticky">
        <VDatePicker
            class="sticky"
            v-model="date"
            color="#e2a0e5"
            elevation="18"
            first-day-of-week="1"
            rounded="0"
            position="sticky"
            width="100vw" />
    </div>

    <div class="top-40 px-10 mt-10">
        <VCombobox
            density="compact"
            :items="pickableItems"
            variant="underlined"
            clearable
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
        </VCombobox>
    </div>
    <div class="mt-10">
        <CustomItemField
            v-for="(field, index) in itemsForDate"
            :key="index"
            :label="field.title"
            :count="field.count"
            @delete="handleDelete(index)"
            @decrement="handleDecrement(index)"
            @increment="handleIncrement(index)" />
    </div>
</template>
