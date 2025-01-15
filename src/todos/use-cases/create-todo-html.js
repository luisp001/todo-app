/**
 *
 * @param {Todo} todo
 */
export const createTodoHTML = (todo) => {
  if (!todo) throw new Error("todo es requerido.");

  const { done, description, id } = todo;

  const html = `  
    <div class="view">
        <input class="toggle" type="checkbox" ${done ? "checked" : ""} />
        <label>${description}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template" />`;

  const todoHTMLElement = document.createElement("li");
  todoHTMLElement.innerHTML = html;
  todoHTMLElement.setAttribute("data-id", id);
  if (todo.done) {
    todoHTMLElement.classList.add("completed");
  }

  return todoHTMLElement;
};
