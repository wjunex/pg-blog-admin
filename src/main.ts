import { createApp } from "vue";
import { createPinia } from "pinia";

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import hljs from 'highlight.js';


VMdEditor.use(githubTheme, {
  Hljs: hljs,
});

import App from "./App.vue";
import router from "./router";


import "./assets/main.css";

const app = createApp(App);
app.use(VMdEditor);

app.use(createPinia());
app.use(router);
app.use(ElementPlus)

app.mount("#app");
