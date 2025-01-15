<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const loading = ref(true)
const username = ref('')
const website = ref('')
const avatar_path = ref('')

loading.value = true
const { data } = await supabase
    .from('profiles')
    .select(`username, website, avatar_url`)
    .eq('id', user.value.id)
    .single()

if (data) {
    username.value = data.username
    website.value = data.website
    avatar_path.value = data.avatar_url
}
loading.value = false

async function updateProfile() {
    try {
        loading.value = true
        const user = useSupabaseUser()

        const updates = {
            id: user.value.id,
            username: username.value,
            website: website.value,
            avatar_url: avatar_path.value,
            updated_at: new Date(),
        }

        const { error } = await supabase.from('profiles').upsert(updates, {
            returning: 'minimal',
        })
        if (error) throw error
    } catch (error) {
        alert(error.message)
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="flex items-start justify-center mt-10">
        <v-card
            class="mx-auto pa-10 pb-8 w-full"
            elevation="0"
            max-width="448"
            rounded="lg">
            <div class="text-subtitle-1 text-medium-emphasis">Name</div>

            <v-text-field
                class="mb-5"
                density="compact"
                v-model="username"
                placeholder="john.doe"
                prepend-inner-icon="mdi-account"
                variant="outlined"></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis">Email</div>

            <v-text-field
                class="mb-5"
                density="compact"
                v-model="user.email"
                placeholder="Email address"
                prepend-inner-icon="mdi-email-outline"
                variant="outlined"></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis">Website</div>

            <v-text-field
                class="mb-5"
                density="compact"
                v-model="website"
                placeholder="www.website.com"
                prepend-inner-icon="mdi-web"
                variant="outlined"></v-text-field>

            <div class="flex gap-10 justify-between mt-10">
                <v-btn
                    class="flex-grow"
                    color="blue"
                    variant="flat"
                    @click="updateProfile">
                    {{ loading ? 'Loading ...' : 'Update' }}
                </v-btn>
            </div>
        </v-card>
    </div>
</template>
