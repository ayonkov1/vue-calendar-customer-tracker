<script setup lang="ts">
import { ref, reactive } from 'vue'

import CustomItemField from '~/components/CustomItemField.vue'
import { useItemManagement } from '~/composables/useDailyItemManagement'

const date = ref<Date>(new Date()) // Current date
const dialog = ref(false)
const formattedDate = computed(() => formatDate(date.value))

const pickableItems = ref<string[]>(['Възрастни', 'Деца', 'Частни'])
const pickableItem = ref<string>('')

interface PriceItem {
    type: string
    price: number
}

const trackables = reactive<PriceItem[]>([
    {
        type: 'Възрастни',
        price: 4.4,
    },
    {
        type: 'Деца',
        price: 4.0,
    },
    {
        type: 'Частни',
        price: 28,
    },
])

const { itemsForDate, handleIncrement, handleDecrement, handleDelete, addItem, itemExists } = useItemManagement(date)

function getDatesInCurrentMonth(): Date[] {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth()

    const firstDayOfMonth = new Date(year, month, 1)
    const lastDayOfMonth = new Date(year, month + 1, 0)
    const numberOfDays = lastDayOfMonth.getDate()

    const datesArray: Date[] = []
    for (let day = 1; day <= numberOfDays; day++) {
        datesArray.push(new Date(year, month, day))
    }

    return datesArray
}

function calculateTotal(prices: PriceItem[], counts: CountItem[]): number {
    return counts.reduce((total, countItem) => {
        const priceItem = prices.find((price) => price.type === countItem.title)

        if (priceItem) {
            return total + priceItem.price * countItem.count
        }
        return total
    }, 0)
}

function calculateTotalMonth(trackables: PriceItem[]): number {
    const datesInMonth = getDatesInCurrentMonth()
    let totalMonth = 0

    datesInMonth.forEach((currentDate) => {
        // Temporarily update the reactive `date` ref
        date.value = currentDate

        // Retrieve items for the current date
        const { itemsForDate } = useItemManagement(date)

        // Calculate daily total
        const dailyTotal = calculateTotal(trackables, itemsForDate.value)

        // Add to the monthly total
        totalMonth += dailyTotal
    })

    return totalMonth
}

const sum = computed(() => {
    return calculateTotal(trackables, itemsForDate.value)
})

// const monthSum = computed(() => {
//     return calculateTotalMonth(trackables)
// })
</script>

<template>
    <div>
        <VDialog v-model="dialog">
            <VCard
                prepend-icon="mdi-playlist-edit"
                title="Editing items"
            >
                <v-table class="mx-2">
                    <thead>
                        <tr>
                            <th class="text-xl !font-black">Item</th>
                            <th class="text-xl !font-black">Price (лв.)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="item in trackables"
                            :key="item.type"
                        >
                            <td class="font-mono">
                                {{ item.type }}
                            </td>
                            <td>
                                <v-text-field
                                    max-width="100px"
                                    v-model="item.price"
                                    type="number"
                                    step="0.1"
                                    density="compact"
                                    variant="outlined"
                                    min="0"
                                />
                            </td>
                        </tr>
                    </tbody>
                </v-table>

                <v-btn
                    class="m-6 mt-8"
                    text="Save"
                    size="large"
                    variant="tonal"
                    color="primary"
                    @click="dialog = false"
                ></v-btn>
            </VCard>
        </VDialog>
        <div>
            <VDatePicker
                v-model="date"
                color="#e2a0e5"
                elevation="18"
                first-day-of-week="1"
                rounded="0"
                position="sticky"
                width="100vw"
            />
        </div>

        <div class="top-40 m-5 mt-10">
            <VCombobox
                density="compact"
                :items="pickableItems"
                variant="underlined"
                clearable
                v-model="pickableItem"
                @keydown.enter="addItem(pickableItem)"
            >
                <template #append>
                    <v-btn
                        class="mr-3"
                        icon="mdi-arrow-right-circle"
                        :disabled="!pickableItem"
                        color="primary"
                        size="small"
                        variant="flat"
                        rounded="lg"
                        @click="addItem(pickableItem)"
                    >
                    </v-btn>
                    <v-btn
                        icon="mdi-pencil"
                        size="small"
                        variant="tonal"
                        rounded="lg"
                        @click="dialog = true"
                    >
                    </v-btn>
                </template>
            </VCombobox>
        </div>
        <div class="mx-5">
            <CustomItemField
                v-for="(field, index) in itemsForDate"
                :key="index"
                :label="field.title"
                :count="field.count"
                :trackables="trackables"
                @delete="handleDelete(index)"
                @decrement="handleDecrement(index)"
                @increment="handleIncrement(index)"
            />
            <div class="flex justify-between">
                <div class="font-bold">За деня:</div>
                <div class="font-bold">{{ sum.toFixed(2) }} лв.</div>
            </div>

            <!-- <div class="flex justify-between">
                <div class="font-bold">За месеца:</div>
                <div class="font-bold">{{ monthSum.toFixed(2) }} лв.</div>
            </div> -->
        </div>
    </div>
</template>
