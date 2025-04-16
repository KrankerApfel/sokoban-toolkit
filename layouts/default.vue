<template>
    <div class="min-h-dvh overflow-hidden">
        <HeaderBase mode="static" />

        <div class="min-h-svh bg-orange-50">
            <div class="flex flex-col min-h-screen">
                <NuxtPage />
            </div>
        </div>
       
        <FooterBase />
    </div>
</template>

<script lang="ts" setup>
    const nuxtApp = useNuxtApp()

    nuxtApp.hook("page:finish", () => {
        if (process.client) window.scrollTo(0, 0)
    })
</script>