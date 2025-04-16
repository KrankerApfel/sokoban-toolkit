<template>
    <header class="fixed top-0 left-0 flex items-center w-full h-14 p-2 text-gray-300 bg-[#0A1217]">
        <NuxtLink class="w-12 h-12 bg-[url('/pixel_tv.gif')] rounded-full flex items-center justify-center mr-5"
            :to="{ name: 'index' }">
            <img src="/logo.png" class="w-7 h-7" />
        </NuxtLink>

        <!-- Icône de menu visible uniquement en mobile -->
        <div class="ml-auto cursor-pointer md:hidden" @click="toggleMenu">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
        </div>

        <!-- Menu visible uniquement à partir de md (768px) et caché en mobile -->
        <div class="items-center justify-start hidden space-x-4 md:flex grow font-vt323 text-xl">
            <ul class="flex space-x-4">
                <li>
                    <NuxtLink to="#accueil" :class="{ 'underline': isActive('#accueil') }"
                        class="transition-colors hover:text-white">
                        - Accueil -
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="#a-Propos" :class="{ 'underline': isActive('#a-Propos') }"
                        class="transition-colors hover:text-white">
                        - A propos -
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="#toolkit" :class="{ 'underline': isActive('#toolkit') }"
                        class="transition-colors hover:text-white">
                        - Toolkit -
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="#doc" :class="{ 'underline': isActive('#doc') }"
                        class="transition-colors hover:text-white">
                        - Documentation -
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="#etMoi" :class="{ 'underline': isActive('#etMoi') }"
                        class="transition-colors hover:text-white">
                        - Et Moi ? -
                    </NuxtLink>
                </li>
            </ul>
        </div>

        <!-- Menu visible uniquement sur mobile -->
        <Transition name="slide">
            <div v-if="isMenuOpen"
                class="h-screen w-full fixed right-0 md:hidden top-10 bg-[#0A1217] z-40">
                <ul class="flex flex-col p-3 space-y-3 text-right text-gray-300">
                    <li class="w-full">
                        <NuxtLink to="#accueil" :class="{ 'underline': isActive('#accueil') }"
                            class="block w-full px-4 py-2 font-vt323 text-2xl font-bold transition-colors hover:text-white"
                            @click="closeMenu">
                            Accueil
                        </NuxtLink>
                    </li>
                    <li class="w-full">
                        <NuxtLink to="/A-Propos" :class="{ 'underline': isActive('/A-Propos') }"
                        class="block w-full px-4 py-2 font-vt323 text-2xl font-bold transition-colors hover:text-white"
                        @click="closeMenu">
                            A propos
                        </NuxtLink>
                    </li>
                    <li class="w-full">
                        <NuxtLink to="#toolkit" :class="{ 'underline': isActive('#toolkit') }"
                            class="block w-full px-4 py-2 font-vt323 text-2xl font-bold transition-colors hover:text-white"
                            @click="closeMenu">
                            Toolkit
                        </NuxtLink>
                    </li>
                    <li class="w-full">
                        <NuxtLink to="#doc" :class="{ 'underline': isActive('#doc') }"
                        class="block w-full px-4 py-2 font-vt323 text-2xl font-bold transition-colors hover:text-white"
                        @click="closeMenu">
                            Documentation
                        </NuxtLink>
                    </li>
                    <li class="w-full">
                        <NuxtLink to="#etMoi" :class="{ 'underline': isActive('#etMoi') }"
                        class="block w-full px-4 py-2 font-vt323 text-2xl font-bold transition-colors hover:text-white"
                        @click="closeMenu">
                            Et Moi ?
                        </NuxtLink>
                    </li>
                </ul>
            </div>
        </Transition>
    </header>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isMenuOpen = ref(false)

const isActive = (path) => route.path === path

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
    isMenuOpen.value = false
}

watch(() => route.path, () => {
    isMenuOpen.value = false
})
</script>

<style scoped>
header::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: -1;
}

.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s ease;
}

.slide-enter-from {
    transform: translateX(100%);
}

.slide-enter-to {
    transform: translateX(0%);
}

.slide-leave-from {
    transform: translateX(0%);
}

.slide-leave-to {
    transform: translateX(100%);
}
</style>