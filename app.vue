<script setup>
const user = useSupabaseUser()
</script>

<template>
    <div>
        <Calendar v-if="user" />
        <Auth v-else />
    </div>
</template>
