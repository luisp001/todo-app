import todoStore, { Filters } from "../../store/todo";

let element;
/**
 *
 * @param {string} elementId
 */
export const renderPendingTodos = (elementId) => {
  if (!element) element = document.querySelector(elementId);

  if (!element) throw new Error(`elementId no encontrado`);

  element.innerHTML = todoStore.getTodos(Filters.Pending).length;
};
