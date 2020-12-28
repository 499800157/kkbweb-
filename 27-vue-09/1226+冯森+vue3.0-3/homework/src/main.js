import { createApp } from './runtime-canvas'
import App from './App.vue'
import { getRootComponent } from "./game"

console.warn = () => { };

createApp(App).mount(getRootComponent())
