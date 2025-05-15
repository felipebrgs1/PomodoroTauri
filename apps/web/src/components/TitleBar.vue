<template>
    <div ref="titlebarRef"
        class="titlebar flex absolute top-0 w-full items-center justify-between h-10 px-3 select-none bg-zinc-700 text-white"
        id="titlebar">
        <div class="title font-semibold text-sm tracking-wide">Pomodoro</div>
        <div class="controls flex gap-1">
            <Button class="w-7 h-7 flex items-center justify-center rounded bg-slate-400 hover:bg-fuchsia-700 "
                @click="minimize" aria-label="Minimizar">─</Button>
            <Button class="w-7 h-7 flex items-center justify-center rounded bg-slate-400 hover:bg-fuchsia-700 "
                @click="toggleMaximize" aria-label="Maximizar">▢</Button>
            <Button class="w-7 h-7 flex items-center justify-center rounded bg-slate-400 hover:bg-red-600 "
                @click="closeWindow" aria-label="Fechar">✕</Button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { getCurrentWindow } from '@tauri-apps/api/window'
    import { ref, onMounted } from 'vue'

    const appWindow = getCurrentWindow();
    const titlebarRef = ref<HTMLElement | null>(null)

    function minimize() {
        console.log("minimize called")
        appWindow?.minimize()
    }

    function toggleMaximize() {
        appWindow.toggleMaximize()
    }
    function closeWindow() {
        appWindow.close()
    }

    onMounted(() => {
        titlebarRef.value?.addEventListener('mousedown', (e: MouseEvent) => {
            if ((e.target as HTMLElement).closest('button')) return;
            if (e.buttons === 1) {
                if (e.detail === 2) {
                    appWindow.toggleMaximize()
                } else {
                    appWindow.startDragging()
                }
            }
        })
    })
</script>
