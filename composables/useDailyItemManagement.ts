// useDailyItemManagement.ts
import { reactive } from 'vue'

interface Item {
    title: string
    count: number
}

interface ItemsByDate {
    [date: string]: Item[]
}

export function useItemManagement(date: Ref<Date>) {
    const itemsData = reactive<ItemsByDate>({})

    const formattedDate = computed(() => {
        return formatDate(date.value)
    })

    const itemsForDate = computed(() => {
        return itemsData[formattedDate.value] || []
    })

    const handleIncrement = (index: number) => {
        itemsForDate.value[index].count++
    }

    const handleDecrement = (index: number) => {
        if (itemsForDate.value[index]?.count > 0) {
            itemsForDate.value[index].count--
        }
    }

    const addItem = (newItem: string) => {
        if (!itemsData[formattedDate.value]) {
            itemsData[formattedDate.value] = []
        }

        // Add the new item to the specific date's array
        itemsData[formattedDate.value].push({ title: newItem, count: 1 })
    }

    return {
        itemsForDate,
        handleIncrement,
        handleDecrement,
        addItem,
    }
}
