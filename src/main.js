import { App } from "./todos/app";
import todoStore from "./store/todo";

import "./style.css";

todoStore.initStore();

App("#app");
