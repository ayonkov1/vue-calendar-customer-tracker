// useDailyItemManagement.ts
import { reactive } from 'vue'
import { toast, type Options } from 'vue3-toastify'

interface Item {
    title: string
    count: number
}

interface ItemsByDate {
    [date: string]: Item[]
}

export function useItemManagement(date: Ref<Date>) {
    const toasterOptions: Options = {
        position: 'top-center',
        closeOnClick: false,
        pauseOnFocusLoss: false,
        hideProgressBar: true,
    }

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

    const handleDelete = (index: number) => {
        itemsData[formattedDate.value] = itemsData[formattedDate.value].filter(
            (item, idx: number) => idx !== index,
        )
    }

    const addItem = (newItem: string) => {
        if (!itemsData[formattedDate.value]) {
            itemsData[formattedDate.value] = []
        }

        const itemExists = itemsData[formattedDate.value].find(
            (item) => item.title === newItem,
        )

        if (itemExists) {
            toast.error(`"${newItem}" already in trackables!`, toasterOptions)
            return
        }

        itemsData[formattedDate.value].push({ title: newItem, count: 1 })

        toast.success(`"${newItem}" added successfully!`, toasterOptions)
    }

    return {
        itemsForDate,
        handleIncrement,
        handleDecrement,
        handleDelete,
        addItem,
    }
}
