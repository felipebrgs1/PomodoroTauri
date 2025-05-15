<template>
  <Button class="p-2 rounded-full transition-colors"
    :style="`background: ${theme === 'dark' ? 'var(--card)' : 'var(--card)'}; color: var(--foreground);`"
    @click="toggleTheme" aria-label="Alternar tema" variant="ghost" size="icon">
    <Sun v-if="theme !== 'dark'" class="w-6 h-6" style="color: #facc15;" />
    <Moon v-else class="w-6 h-6" style="color: #60a5fa;" />
  </Button>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePomodoroStore } from '@/stores/pomodoroStore'
import { Sun, Moon } from 'lucide-vue-next';
import { Button } from '@/components/ui/button'
const store = usePomodoroStore()
const { theme } = storeToRefs(store)
function toggleTheme() {
  store.toggleTheme()
}
</script>
