import { Todo } from "../todos/models/todo";

export const Filters = {
  All: "all",
  Completed: "completed",
  Pending: "pending",
};

const state = {
  todos: [
    new Todo("Piedra del alma"),
    new Todo("Piedra del espacio"),
    new Todo("Piedra del tiempo"),
    new Todo("Piedra del poder"),
    new Todo("Piedra de la realidad"),
  ],
  filter: Filters.All,
};

const initStore = () => {
  loadStore();
  console.log("InitStore 🪓");
};

const loadStore = () => {
  if (!localStorage.getItem("state")) return;

  const { todos = [], filter = Filters.All } = JSON.parse(
    localStorage.getItem("state")
  );

  state.todos = todos;
  state.filter = filter;
};

const saveStateToLocalStorage = () => {
  localStorage.setItem("state", JSON.stringify(state));
};

/**
 * Retorna una lista de tareas dependiendo del valor del filtro.
 * * Todos = Filters.All
 * * Completados = Filters.Completed
 * * Pendientes = Filters.Pending
 *
 * @param {Filters} filter
 * @returns {Todo[]}
 */
const getTodos = (filter = Filters.All) => {
  switch (filter) {
    case Filters.All:
      return [...state.todos];
    case Filters.Completed:
      return state.todos.filter((todo) => todo.done);
    case Filters.Pending:
      return state.todos.filter((todo) => !todo.done);
    default:
      throw new Error(`El filtro "${filter}" no es válido.`);
  }
};

/**
 * Crear y agrega un nueva tarea a la lista.
 *
 * @param {string} description Descripción de la tarea.
 */
const addTodo = (description) => {
  if (!description) throw new Error("Se requiere la descripción.");

  state.todos.push(new Todo(description));

  saveStateToLocalStorage();
};

/**
 *
 * @param {string} todoId Identificador de la tarea
 */
const toggleTodo = (todoId) => {
  state.todos = state.todos.map((todo) => {
    if (todo.id === todoId) {
      todo.done = !todo.done;
    }

    saveStateToLocalStorage();

    return todo;
  });
};

/**
 * Elimina una tarea basad en su identificador único.
 *
 * @param {string} todoId Identificador de la tarea
 */
const deleteTodo = (todoId) => {
  state.todos = state.todos.filter((todo) => todo.id !== todoId);

  saveStateToLocalStorage();
};

/**
 * Elimina todas las tareas completadas.
 */
const deleteCompleted = () => {
  state.todos = state.todos.filter((todo) => !todo.done);

  saveStateToLocalStorage();
};

/**
 * Establece el filtro actual para las tareas.
 * El valor por defecto es Filters.All.
 *
 * @param {Filters} newFilter
 */
const setSelectedFilter = (newFilter = Filters.All) => {
  state.filter = newFilter;

  saveStateToLocalStorage();
};

/**
 * Obtiene el valor del filtro actual.
 *
 * @returns {Filters}
 */
const getCurrentFilter = () => {
  return state.filter;
};

export default {
  addTodo,
  deleteCompleted,
  deleteTodo,
  getCurrentFilter,
  getTodos,
  initStore,
  loadStore,
  setSelectedFilter,
  toggleTodo,
};
