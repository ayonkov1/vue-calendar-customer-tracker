<script setup>
import { toast } from 'vue3-toastify'
import { ToasterOptions } from '~/misc/ToasterOptions'

const supabase = useSupabaseClient()

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
        alert(error.error_description || error.message)
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
    } catch (error) {
        alert(error.error_description || error.message)
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="form-widget">
        <h1 class="header">Supabase + Nuxt 3</h1>

        <div>
            <VTextField
                class="inputField"
                type="email"
                placeholder="Your email"
                v-model="email" />
        </div>
        <div>
            <VTextField
                class="inputField"
                type="text"
                placeholder="Your password"
                v-model="password" />
        </div>
        <div>
            <v-btn
                type="submit"
                class="button block"
                :disabled="loading"
                @click="handleLogin">
                Login
            </v-btn>
        </div>
        <div>
            <v-btn
                type="submit"
                class="button block"
                :disabled="loading"
                @click="handleRegister">
                Register
            </v-btn>
        </div>
    </div>
</template>
