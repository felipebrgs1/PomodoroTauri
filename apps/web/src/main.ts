import { createApp } from 'vue';
import App from './App.vue';
import './global.css';
import { createPinia } from 'pinia';
import TitleBar from './components/TitleBar.vue';
import router from './router';

const pinia = createPinia();

const app = createApp(App);
app.use(pinia);
app.use(router);
app.component('TitleBar', TitleBar);
app.mount('#app');
