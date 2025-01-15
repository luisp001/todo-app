import { createTodoHTML } from "./";

let element;

/**
 *
 * @param {string} elementId
 * @param {Todo[]} todos
 */
export const renderTodos = (elementId, todos = []) => {
  if (!element) {
    element = document.querySelector(elementId);
  }

  if (!element) throw new Error(`No se encontró el elemento ${elementId}`);

  element.innerHTML = "";

  todos.forEach((todo) => {
    element.append(createTodoHTML(todo));
  });
};
