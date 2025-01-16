<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const loading = ref(true)
const username = ref('')
const fullname = ref('')
const avatar_path = ref('')

loading.value = true
const { data } = await supabase.from('profiles').select(`username, full_name, avatar_url`).eq('id', user.value.id).single()

if (data) {
    username.value = data.username
    fullname.value = data.full_name
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
            full_name: fullname.value,
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

const fullnameFromResponse = fullname
</script>

<template>
    <div class="mt-10 px-10 pb-8">
        <p class="font-black text-5xl mb-6">Hi, {{ fullnameFromResponse.split(' ')[0] }}</p>
        <v-card
            class="mx-auto w-full"
            elevation="0"
            max-width="448"
            rounded="lg"
        >
            <div class="text-subtitle-1 text-medium-emphasis">Username</div>

            <v-text-field
                class="mb-5"
                density="compact"
                v-model="username"
                placeholder="john.doe"
                prepend-inner-icon="mdi-account"
                variant="outlined"
            ></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis">Full Name</div>

            <v-text-field
                class="mb-5"
                density="compact"
                v-model="fullname"
                placeholder="John Doe"
                variant="outlined"
            ></v-text-field>

            <div class="flex">
                <v-btn
                    class="flex-grow"
                    color="blue"
                    variant="flat"
                    @click="updateProfile"
                >
                    {{ loading ? 'Loading ...' : 'Update' }}
                </v-btn>
            </div>
        </v-card>

        <div class="mt-10 text-2xl font-black">History</div>
        <ul>
            <li class="indent-4 text-xl mt-2">
                January (857 лв.)

                <p class="indent-8 text-sm">Възрастни: 3</p>
                <p class="indent-8 text-sm">Деца: 3</p>
                <p class="indent-8 text-sm">Частни: 3</p>
            </li>

            <li class="indent-4 text-xl mt-2">February (581 лв.)</li>
            <li class="indent-4 text-xl mt-2">March (1230 лв.)</li>
        </ul>
    </div>
</template>
