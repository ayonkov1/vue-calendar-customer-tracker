<script setup lang="ts">
import { ref, reactive } from 'vue'
import { toast } from 'vue3-toastify'

import CustomItemField from '~/components/CustomItemField.vue'
import { useItemManagement } from '~/composables/useDailyItemManagement'

const date = ref<Date>(new Date())
const dialog = ref<Boolean>(false)
const formattedDate = computed(() => formatDate(date.value))

const pickableItems = ref<string[]>(['Възрастни', 'Деца', 'Частни'])
const pickableItem = ref<string | null>(null)

interface Trackables {
    type: string
    price: number
}

const trackables = ref<Trackables[]>([
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

const {
    itemsForDate,
    handleIncrement,
    handleDecrement,
    handleDelete,
    addItem,
} = useItemManagement(date)

const supabase = useSupabaseClient()

const loading = ref(false)

const handleLogout = async () => {
    try {
        loading.value = true
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        toast.success('Logout successful.')
    } catch (error: any) {
        toast.error(error.error_description || error.message)
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="p-5 flex justify-between">
        <v-btn
            variant="outlined"
            @click="dialog = true">
            Summary
        </v-btn>
        <v-btn
            variant="outlined"
            @click="dialog = true">
            Edit
        </v-btn>
        <v-btn
            variant="outlined"
            @click="handleLogout">
            Logout
        </v-btn>
    </div>

    <VDialog
        v-model="dialog"
        width="100vw">
        <VCard
            prepend-icon="mdi-playlist-edit"
            title="Editing items">
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
                        :key="item.type">
                        <td class="text-lg italic">
                            {{ item.type }}
                        </td>
                        <td>
                            <v-text-field
                                v-model="item.price"
                                density="compact"
                                variant="solo"
                                :value="item.price.toFixed(2)"
                                @input="
                                    (value: any) => (item.price = parseFloat(value))
                                "></v-text-field>
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
                @click="dialog = false"></v-btn>
        </VCard>
    </VDialog>
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
                <v-btn
                    prepend-icon="mdi-plus-thick"
                    :disabled="!pickableItem"
                    variant="elevated"
                    color="primary"
                    @click="addItem(pickableItem)">
                    Add
                </v-btn>
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
