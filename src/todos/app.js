import html from "./app.html?raw";
import todoStore, { Filters } from "../store/todo";
import { renderTodos, renderPendingTodos } from "./use-cases";

const ElementIds = {
  ClearCompleted: ".clear-completed",
  TodoList: ".todo-list",
  NewTodoInput: "#new-todo-input",
  TodoFilters: ".filtro",
  PendingCountLabel: "#pending-count",
};

/**
 *
 * @param {string} elementId
 */
export const App = (elementId) => {
  const displayTodos = () => {
    const todos = todoStore.getTodos(todoStore.getCurrentFilter());
    renderTodos(ElementIds.TodoList, todos);
    updatePendingCount();
  };

  const updatePendingCount = () => {
    renderPendingTodos(ElementIds.PendingCountLabel);
  };

  (() => {
    const app = document.createElement("div");
    app.innerHTML = html;
    document.querySelector(elementId).append(app);
    displayTodos();
  })();

  // Referencias HTML
  const newDescriptionInput = document.querySelector(ElementIds.NewTodoInput);
  const todoListElements = document.querySelector(ElementIds.TodoList);
  const clearCompletedBtn = document.querySelector(ElementIds.ClearCompleted);
  const filteredTodoElems = document.querySelectorAll(ElementIds.TodoFilters);

  // Listeners
  newDescriptionInput.addEventListener("keyup", (event) => {
    if (event.keyCode !== 13) return;

    if (event.target.value.trim().length === 0) return;

    todoStore.addTodo(event.target.value);

    displayTodos();

    event.target.value = "";
  });

  todoListElements.addEventListener("click", (event) => {
    const element = event.target.closest("[data-id]");

    if (!element) return;

    todoStore.toggleTodo(element.getAttribute("data-id"));

    displayTodos();
  });

  todoListElements.addEventListener("click", (event) => {
    if (!event.target.classList.contains("destroy")) return;

    const element = event.target.closest("[data-id]");

    if (!element) return;

    todoStore.deleteTodo(element.getAttribute("data-id"));

    displayTodos();
  });

  clearCompletedBtn.addEventListener("click", () => {
    todoStore.deleteCompleted();

    displayTodos();
  });

  filteredTodoElems.forEach((element) => {
    element.addEventListener("click", (element) => {
      filteredTodoElems.forEach((el) => el.classList.remove("selected"));
      element.target.classList.add("selected");

      switch (element.target.text) {
        case "Todos":
          todoStore.setSelectedFilter(Filters.All);
          break;
        case "Pendientes":
          todoStore.setSelectedFilter(Filters.Pending);
          break;
        case "Completados":
          todoStore.setSelectedFilter(Filters.Completed);
          break;
      }

      displayTodos();
    });
  });
};
