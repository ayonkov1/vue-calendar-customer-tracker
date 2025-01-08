import { ref } from 'vue'

interface Item {
    title: string
    count: number
}

interface ItemsPerDay {
    [date: string]: Item[]
}

export function useItemManagement() {
    const itemsPerDay: ItemsPerDay = {}

    const items = ref<Item[]>([])
    const item = ref<string>('')

    const addItem = () => {
        const trimmedItem = item.value.trim()

        if (
            items.value.some(
                (existingItem) => existingItem.title === trimmedItem,
            )
        ) {
            alert('You can add only 1 item of type!')
            return
        }

        if (trimmedItem) {
            items.value.push({ title: trimmedItem, count: 0 })
            item.value = ''
        }
    }

    const handleDecrement = (index: number) => {
        if (items.value[index].count > 0) {
            items.value[index].count--
        }
    }

    const handleIncrement = (index: number) => {
        items.value[index].count++
    }

    return {
        item,
        items,
        itemsPerDay,
        addItem,
        handleDecrement,
        handleIncrement,
    }
}
