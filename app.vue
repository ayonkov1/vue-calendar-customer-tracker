<script setup>
import { ref, watch } from 'vue'
import { ScheduleXCalendar } from '@schedule-x/vue'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import { createCalendarControlsPlugin } from '@schedule-x/calendar-controls'
import {
    createCalendar,
    createViewMonthAgenda,
    createViewMonthGrid,
    viewMonthGrid,
} from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'

// Reactive state for adults, children, and selected date
const amountAdults = ref(1)
const amountChildren = ref(1)
const selectedDate = ref('2023-12-19')

// Create plugins
const eventsServicePlugin = createEventsServicePlugin()
const calendarControls = createCalendarControlsPlugin()

// Create the calendar instance
const calendarApp = createCalendar(
    {
        selectedDate: selectedDate.value,
        views: [createViewMonthGrid(), createViewMonthAgenda()],
        defaultView: viewMonthGrid.name,
    },
    [eventsServicePlugin, calendarControls],
)

// Sync selectedDate with the calendar's date when the user selects a new date
const syncSelectedDate = () => {
    selectedDate.value = calendarControls.getDate()
    console.log('Selected date updated to:', selectedDate.value)
}

// Watch for changes in selectedDate
watch(amountAdults, (newDate) => {
    console.log('Selected date has changed:', newDate)
    updateEvent(1, amountAdults.value, 'Възрастни', newDate)
    updateEvent(2, amountChildren.value, 'Деца', newDate)
})

// Function to add, update, or remove events
const updateEvent = (eventId, count, title, date) => {
    const event = eventsServicePlugin.get(eventId)

    if (count > 0) {
        if (event) {
            eventsServicePlugin.update({
                id: eventId,
                title: `${title}: ${count}`,
                start: date,
                end: date,
            })
        } else {
            eventsServicePlugin.add({
                id: eventId,
                title: `${title}: ${count}`,
                start: date,
                end: date,
            })
        }
    } else if (event) {
        eventsServicePlugin.remove(eventId)
    }
}

// Initialize events when the component is mounted
onMounted(() => {
    updateEvent(1, amountAdults.value, 'Възрастни', selectedDate.value)
    updateEvent(2, amountChildren.value, 'Деца', selectedDate.value)
})

// Set the date programmatically and update selectedDate
const setCalendarDate = (date) => {
    calendarControls.setDate(date)
    syncSelectedDate() // Force reactivity update on selectedDate
}

// Watch changes in the amount of adults and children
watch(amountAdults, (newValue) => {
    updateEvent(1, newValue, 'Възрастни', selectedDate.value)
})

watch(amountChildren, (newValue) => {
    updateEvent(2, newValue, 'Деца', selectedDate.value)
})
</script>

<template>
    <ClientOnly>
        <ScheduleXCalendar :calendar-app="calendarApp" />
        <div class="mt-10">
            <v-text-field
                class="mx-auto"
                max-width="300px"
                label="Възрастни"
                variant="outlined"
                v-model="amountAdults">
                <template #prepend>
                    <v-btn
                        icon
                        @click="amountAdults = Math.max(0, amountAdults - 1)"
                        >-</v-btn
                    >
                </template>
                <template #append>
                    <v-btn
                        icon
                        @click="amountAdults++"
                        >+</v-btn
                    >
                </template>
            </v-text-field>
            <v-text-field
                class="mx-auto"
                max-width="300px"
                label="Деца"
                variant="outlined"
                v-model="amountChildren">
                <template #prepend>
                    <v-btn
                        icon
                        @click="
                            amountChildren = Math.max(0, amountChildren - 1)
                        "
                        >-</v-btn
                    >
                </template>
                <template #append>
                    <v-btn
                        icon
                        @click="amountChildren++"
                        >+</v-btn
                    >
                </template>
            </v-text-field>
        </div>
    </ClientOnly>
</template>
