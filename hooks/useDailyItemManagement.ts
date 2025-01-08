import { ref } from 'vue'

interface Item {
    title: string
    count: number
}

interface ItemsPerDay {
    [date: string]: Item[]
}

export function useItemManagement() {
    const items: ItemsPerDay = {}

    const item = ref<string>('')

    const addItem = (date: Date) => {
        const selectedDate = formatDate(date)

        const trimmedItem = item.value.trim()

        if (
            items.value.some(
                (existingItem) => existingItem.title === trimmedItem,
            )
        ) {
            alert('You can add only 1 item of type!')
            return
        }

        if (trimmedItem && selectedDate) {
            items.value.push({ title: trimmedItem, count: 0 })
            item.value = ''

            console.log(items)
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
        addItem,
        handleDecrement,
        handleIncrement,
    }
}
