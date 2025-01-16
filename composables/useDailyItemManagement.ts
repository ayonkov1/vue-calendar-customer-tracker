import { reactive } from 'vue'
import { toast } from 'vue3-toastify'
import { ToasterOptions } from '~/misc/ToasterOptions'

export interface CountItem {
    title: string
    count: number
}

interface ItemsByDate {
    [date: string]: CountItem[]
}

export function useItemManagement(date: Ref<Date>) {
    const itemsData = reactive<ItemsByDate>({})

    const formattedDate = computed(() => {
        return formatDate(date.value)
    })

    const itemsForDate = computed(() => {
        console.log(itemsData[formattedDate.value])

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

    const handleDelete = (index: number) => {
        itemsData[formattedDate.value] = itemsData[formattedDate.value].filter((item, idx: number) => idx !== index)
        toast.success(`Delete successful.`, ToasterOptions)
    }

    const addItem = (newItem: string) => {
        if (!itemsData[formattedDate.value]) {
            itemsData[formattedDate.value] = []
        }

        const itemExists = itemsData[formattedDate.value].find((item) => item.title === newItem)

        if (itemExists) {
            toast.error(`"${newItem}" already in trackables!`, ToasterOptions)
            return
        }

        itemsData[formattedDate.value].push({ title: newItem, count: 1 })
    }

    return {
        itemsForDate,
        handleIncrement,
        handleDecrement,
        handleDelete,
        addItem,
    }
}
