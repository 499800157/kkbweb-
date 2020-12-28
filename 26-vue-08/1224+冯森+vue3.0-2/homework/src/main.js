import {createApp} from "./runtime-canvas/index"
import App from './App.vue'
import {getRootContainer} from "./game/index"

createApp(App).mount(getRootContainer());
