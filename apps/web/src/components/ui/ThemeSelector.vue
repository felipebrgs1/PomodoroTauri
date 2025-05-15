<template>
    <div class="relative inline-block text-left" ref="root">
        <button @click="toggleDropdown"
            class="p-2 rounded bg-transparent  focus:outline-none flex items-center justify-center">
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" class="feather feather-menu">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
        </button>
        <div v-if="dropdownOpen"
            class="absolute left-0 w-30 rounded-md ring-1 ring-slate-300 shadow-lg bg-[var(--popover)] text-[var(--popover-foreground)] z-10">
            <div class="py-1">
                <button v-for="option in options" :key="option.value" @click="selectOption(option.value)"
                    class="block w-full text-left px-4 py-2 text-sm hover:bg-[var(--muted)] rounded-[var(--radius)] text-[var(--popover-foreground)]"
                    :class="{ 'font-bold': modelValue === option.value }">
                    {{ option.label }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted, onBeforeUnmount } from 'vue'
    const props = defineProps<{ modelValue: string }>()
    const emit = defineEmits(['update:modelValue'])

    const options = [
        { value: 'default', label: 'Default' },
        { value: 'claymorphism', label: 'Claymorphism' }
    ]

    const dropdownOpen = ref(false)
    const root = ref<HTMLElement | null>(null)

    function toggleDropdown() {
        dropdownOpen.value = !dropdownOpen.value
    }

    function selectOption(value: string) {
        emit('update:modelValue', value)
    }

    function handleClickOutside(event: MouseEvent) {
        if (root.value && !root.value.contains(event.target as Node)) {
            dropdownOpen.value = false
        }
    }

    onMounted(() => {
        document.addEventListener('mousedown', handleClickOutside)
    })
    onBeforeUnmount(() => {
        document.removeEventListener('mousedown', handleClickOutside)
    })
</script>

<style scoped>
.feather-menu {
    width: 1.5em;
    height: 1.5em;
}
</style>
