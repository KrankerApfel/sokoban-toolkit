<template>
    <div class="fixed bottom-0 left-0 w-full">
        <div class="w-full flex item-center justify-center -mb-8">
            <NuxtLink  :to="{ name: 'index' }" class="w-18 h-16 bg-[url('/pixel_tv.gif')] rounded-4xl text-white text-2xl font-vt323 flex items-center justify-center">
                ( ⇞ )
            </NuxtLink>
        </div>
        
        <div class="w-full h-12 bg-[#0A1217] p-8 flex flex-col items-center justify-center space-y-4">
            <h1 class="text-gray-300 font-bold mt-8 text-lg leading-tight font-vt323 antialiased">
                (c) KrankerApfel 2025 - mise à jour : 20/04/2025
            </h1>
        </div>
    </div>
</template>