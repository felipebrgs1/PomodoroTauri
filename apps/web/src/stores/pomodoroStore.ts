import { defineStore } from 'pinia'

export const usePomodoroStore = defineStore('pomodoro', {
    state: () => ({
        duration: 25 * 60, // segundos
        remaining: 25 * 60,
        running: false,
        intervalId: null as null | ReturnType<typeof setInterval>,
        theme: 'light' as 'light' | 'dark',
    }),
    actions: {
        setDuration(minutes: number, seconds: number = 0) {
            this.duration = minutes * 60 + seconds
            this.remaining = this.duration
            this.pause()
        },
        start() {
            if (this.running) return
            this.running = true
            this.intervalId = setInterval(() => {
                if (this.remaining > 0) {
                    this.remaining--
                } else {
                    this.pause()
                }
            }, 1000)
        },
        pause() {
            this.running = false
            if (this.intervalId) {
                clearInterval(this.intervalId)
                this.intervalId = null
            }
        },
        reset() {
            this.pause()
            this.remaining = this.duration
        },
        toggleTheme() {
            this.theme = this.theme === 'light' ? 'dark' : 'light'
        }
    },
    getters: {
        minutes: (state) => Math.floor(state.remaining / 60),
        seconds: (state) => state.remaining % 60,
    }
})