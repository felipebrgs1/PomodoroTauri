<template>
    <div :class="[
        'w-full h-lvh  p-4 flex flex-col items-center justify-center transition-colors',
        theme === 'dark' ? 'dark' : '',
        selectedTheme === 'claymorphism' ? 'theme-claymorphism' : ''
    ]" style="background: var(--background); color: var(--foreground);">
        <!-- Botão de tema no topo direito -->
        <div class="absolute top-12 left-4 flex gap-2 items-center">
            <ThemeSelector v-model="selectedTheme" />
        </div>

        <div class="absolute top-12 right-4 flex gap-2 items-center">
            <ThemeToggle />

        </div>

        <div class="flex gap-2 mb-4 mt-8">
            <Button variant="default" @click="store.setDuration(10)">10 min</Button>
            <Button variant="default" @click="store.setDuration(25)">25 min</Button>
            <!-- Custom Dropdown -->
            <Popover v-model:open="customOpen">
                <PopoverTrigger as-child>
                    <Button variant="default">Custom</Button>
                </PopoverTrigger>
                <PopoverContent class="w-48 flex flex-col ">
                    <label class="text-sm">Minutos</label>
                    <div class="flex items-center gap-2 justify-between">
                        <Button size="icon" variant="ghost"
                            @click="customMinutes = Math.max(0, customMinutes - 1)">-</Button>
                        <input type="number" min="0" max="59" v-model.number="customMinutes"
                            class="font-mono w-12 text-center rounded bg-transparent"
                            style="-moz-appearance: textfield; appearance: textfield;" inputmode="numeric" />
                        <Button size="icon" variant="ghost"
                            @click="customMinutes = Math.min(59, customMinutes + 1)">+</Button>
                    </div>
                    <label class="text-sm">Segundos</label>
                    <div class="flex items-center gap-2 justify-between">
                        <Button size="icon" variant="ghost"
                            @click="customSeconds = Math.max(0, customSeconds - 1)">-</Button>
                        <input type="number" min="0" max="59" v-model.number="customSeconds"
                            class="font-mono w-12 text-center  rounded bg-transparent"
                            style="-moz-appearance: textfield; appearance: textfield;" inputmode="numeric" />
                        <Button size="icon" variant="ghost"
                            @click="customSeconds = Math.min(59, customSeconds + 1)">+</Button>
                    </div>
                    <Button class="mt-2" variant="secondary" @click="setCustomFromFields">OK</Button>
                </PopoverContent>
            </Popover>
        </div>
        <div class="text-6xl font-mono mb-6">
            {{ String(minutes).padStart(2, '0') }}:{{ String(seconds).padStart(2, '0') }}
        </div>
        <div class="flex gap-2 mb-4">
            <Button variant="secondary" @click="store.start" :disabled="running">Start</Button>
            <Button variant="default" @click="store.pause" :disabled="!running">Pause</Button>
            <Button variant="destructive" @click="store.reset">Reset</Button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { usePomodoroStore } from '../stores/pomodoroStore'
    import { storeToRefs } from 'pinia'
    import { Button } from '@/components/ui/button'
    import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
    import ThemeToggle from '@/components/ui/ThemeToggle.vue'
    import ThemeSelector from '@/components/ui/ThemeSelector.vue'
    const store = usePomodoroStore()
    const { minutes, seconds, running, theme } = storeToRefs(store)
    const customOpen = ref(false)
    const customMinutes = ref(15)
    const customSeconds = ref(0)
    const selectedTheme = ref('default')

    function setCustomFromFields() {
        store.setDuration(Number(customMinutes.value), Number(customSeconds.value))
        customOpen.value = false
    }
</script>
