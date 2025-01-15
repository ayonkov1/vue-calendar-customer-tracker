<script setup>
import { toast } from 'vue3-toastify'
import { ToasterOptions } from '~/misc/ToasterOptions'

const supabase = useSupabaseClient()
const router = useRouter()

const loading = ref(false)
const email = ref('')
const password = ref('')

const handleRegister = async () => {
    try {
        loading.value = true
        const { error } = await supabase.auth.signUp({
            email: email.value,
            password: password.value,
        })
        if (error) throw error
        toast.info('Check your email for confirmation.', ToasterOptions)
    } catch (error) {
        toast.error(error.error_description || error.message, ToasterOptions)
    } finally {
        loading.value = false
    }
}

const handleLogin = async () => {
    try {
        loading.value = true
        const { error } = await supabase.auth.signInWithPassword({
            email: email.value,
            password: password.value,
        })
        if (error) throw error
        toast.success('Logged in successfully.', ToasterOptions)
        router.push('/')
    } catch (error) {
        toast.error(error.error_description || error.message, ToasterOptions)
    } finally {
        loading.value = false
    }
}

const visible = ref(false)
</script>

<template>
    <div class="flex h-screen items-center justify-center">
        <v-card
            class="mx-auto pa-12 pb-8 w-full"
            elevation="0"
            max-width="448"
            rounded="lg">
            <div class="text-subtitle-1 text-medium-emphasis">Account</div>

            <v-text-field
                class="mb-5"
                density="compact"
                v-model="email"
                placeholder="Email address"
                prepend-inner-icon="mdi-email-outline"
                variant="outlined"></v-text-field>

            <div
                class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                Password

                <a
                    class="text-caption text-decoration-none text-blue"
                    href="#"
                    rel="noopener noreferrer"
                    target="_blank">
                    Forgot login password?</a
                >
            </div>

            <v-text-field
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                density="compact"
                v-model="password"
                placeholder="Enter your password"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                @click:append-inner="visible = !visible"></v-text-field>

            <div class="flex gap-10 justify-between my-8">
                <v-btn
                    class="flex-grow"
                    color="blue"
                    variant="tonal"
                    @click="handleLogin">
                    Log In
                </v-btn>

                <v-btn
                    class="flex-grow"
                    color="red"
                    variant="tonal"
                    @click="handleRegister">
                    Sign Up
                </v-btn>
            </div>
        </v-card>
    </div>
</template>
