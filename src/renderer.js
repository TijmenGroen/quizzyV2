import {createApp} from 'vue';
import App from './App.vue';
import router from "./router";

createApp(App)
    .use(router)
    .mount("#app");

export async function openFileAPI() {
    return await window.electronAPI.openFile();
}