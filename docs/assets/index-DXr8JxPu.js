(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))d(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const p of n.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&d(p)}).observe(document,{childList:!0,subtree:!0});function a(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function d(o){if(o.ep)return;o.ep=!0;const n=a(o);fetch(o.href,n)}})();const v=`<section class="todoapp">\r
  <header class="header">\r
    <h1>Tareas</h1>\r
    <input\r
      id="new-todo-input"\r
      class="new-todo"\r
      placeholder="¿Qué necesita ser hecho?"\r
      autofocus\r
    />\r
  </header>\r
\r
  <!-- This section should be hidden by default and shown when there are todos -->\r
  <section class="main">\r
    <input id="toggle-all" class="toggle-all" type="checkbox" />\r
    <label for="toggle-all">Mark all as complete</label>\r
    <ul class="todo-list">\r
      <!-- These are here just to show the structure of the list items -->\r
      <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->\r
      <!-- <li class="completed" data-id="abc">\r
        <div class="view">\r
          <input class="toggle" type="checkbox" checked />\r
          <label>Probar JavaScript</label>\r
          <button class="destroy"></button>\r
        </div>\r
        <input class="edit" value="Create a TodoMVC template" />\r
      </li> -->\r
      <!-- <li>\r
                <div class="view">\r
                    <input class="toggle" type="checkbox">\r
                    <label>Comprar un unicornio</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Rule the web">\r
            </li> -->\r
    </ul>\r
  </section>\r
\r
  <!-- This footer should hidden by default and shown when there are todos -->\r
  <footer class="footer">\r
    <!-- This should be "0 items left" by default -->\r
    <span class="todo-count"\r
      ><strong id="pending-count">0</strong> pendiente(s)</span\r
    >\r
    <!-- Remove this if you don't implement routing -->\r
    <ul class="filters">\r
      <li>\r
        <a class="filtro" class="selected" href="#/">Todos</a>\r
      </li>\r
      <li>\r
        <a class="filtro" href="#/active">Pendientes</a>\r
      </li>\r
      <li>\r
        <a class="filtro" href="#/completed">Completados</a>\r
      </li>\r
    </ul>\r
    <!-- Hidden if no completed items are left ↓ -->\r
    <button class="clear-completed">Borrar completados</button>\r
  </footer>\r
</section>\r
\r
<footer class="info">\r
  <p>Template creado por <a href="http://sindresorhus.com">Sindre Sorhus</a></p>\r
  <!-- Change this out with your name and url ↓ -->\r
  <p>Creado por <a href="http://todomvc.com">ti</a></p>\r
  <p>Parte de <a href="http://todomvc.com">TodoMVC</a></p>\r
</footer>\r
`,r=[];for(let e=0;e<256;++e)r.push((e+256).toString(16).slice(1));function L(e,t=0){return(r[e[t+0]]+r[e[t+1]]+r[e[t+2]]+r[e[t+3]]+"-"+r[e[t+4]]+r[e[t+5]]+"-"+r[e[t+6]]+r[e[t+7]]+"-"+r[e[t+8]]+r[e[t+9]]+"-"+r[e[t+10]]+r[e[t+11]]+r[e[t+12]]+r[e[t+13]]+r[e[t+14]]+r[e[t+15]]).toLowerCase()}let b;const C=new Uint8Array(16);function E(){if(!b){if(typeof crypto>"u"||!crypto.getRandomValues)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");b=crypto.getRandomValues.bind(crypto)}return b(C)}const P=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),w={randomUUID:P};function A(e,t,a){var o;if(w.randomUUID&&!e)return w.randomUUID();e=e||{};const d=e.random??((o=e.rng)==null?void 0:o.call(e))??E();if(d.length<16)throw new Error("Random bytes length must be >= 16");return d[6]=d[6]&15|64,d[8]=d[8]&63|128,L(d)}class h{constructor(t){this.id=A(),this.description=t,this.done=!1,this.createdAt=new Date}}const c={All:"all",Completed:"completed",Pending:"pending"},l={todos:[new h("Piedra del alma"),new h("Piedra del espacio"),new h("Piedra del tiempo"),new h("Piedra del poder"),new h("Piedra de la realidad")],filter:c.All},I=()=>{T(),console.log("InitStore 🪓")},T=()=>{if(!localStorage.getItem("state"))return;const{todos:e=[],filter:t=c.All}=JSON.parse(localStorage.getItem("state"));l.todos=e,l.filter=t},f=()=>{localStorage.setItem("state",JSON.stringify(l))},k=(e=c.All)=>{switch(e){case c.All:return[...l.todos];case c.Completed:return l.todos.filter(t=>t.done);case c.Pending:return l.todos.filter(t=>!t.done);default:throw new Error(`El filtro "${e}" no es válido.`)}},x=e=>{if(!e)throw new Error("Se requiere la descripción.");l.todos.push(new h(e)),f()},M=e=>{l.todos=l.todos.map(t=>(t.id===e&&(t.done=!t.done),f(),t))},U=e=>{l.todos=l.todos.filter(t=>t.id!==e),f()},q=()=>{l.todos=l.todos.filter(e=>!e.done),f()},F=(e=c.All)=>{l.filter=e,f()},H=()=>l.filter,i={addTodo:x,deleteCompleted:q,deleteTodo:U,getCurrentFilter:H,getTodos:k,initStore:I,loadStore:T,setSelectedFilter:F,toggleTodo:M},N=e=>{if(!e)throw new Error("todo es requerido.");const{done:t,description:a,id:d}=e,o=`  
    <div class="view">
        <input class="toggle" type="checkbox" ${t?"checked":""} />
        <label>${a}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template" />`,n=document.createElement("li");return n.innerHTML=o,n.setAttribute("data-id",d),e.done&&n.classList.add("completed"),n};let y;const O=e=>{if(y||(y=document.querySelector(e)),!y)throw new Error("elementId no encontrado");y.innerHTML=i.getTodos(c.Pending).length};let g;const D=(e,t=[])=>{if(g||(g=document.querySelector(e)),!g)throw new Error(`No se encontró el elemento ${e}`);g.innerHTML="",t.forEach(a=>{g.append(N(a))})},m={ClearCompleted:".clear-completed",TodoList:".todo-list",NewTodoInput:"#new-todo-input",TodoFilters:".filtro",PendingCountLabel:"#pending-count"},R=e=>{const t=()=>{const s=i.getTodos(i.getCurrentFilter());D(m.TodoList,s),a()},a=()=>{O(m.PendingCountLabel)};(()=>{const s=document.createElement("div");s.innerHTML=v,document.querySelector(e).append(s),t()})();const d=document.querySelector(m.NewTodoInput),o=document.querySelector(m.TodoList),n=document.querySelector(m.ClearCompleted),p=document.querySelectorAll(m.TodoFilters);d.addEventListener("keyup",s=>{s.keyCode===13&&s.target.value.trim().length!==0&&(i.addTodo(s.target.value),t(),s.target.value="")}),o.addEventListener("click",s=>{const u=s.target.closest("[data-id]");u&&(i.toggleTodo(u.getAttribute("data-id")),t())}),o.addEventListener("click",s=>{if(!s.target.classList.contains("destroy"))return;const u=s.target.closest("[data-id]");u&&(i.deleteTodo(u.getAttribute("data-id")),t())}),n.addEventListener("click",()=>{i.deleteCompleted(),t()}),p.forEach(s=>{s.addEventListener("click",u=>{switch(p.forEach(S=>S.classList.remove("selected")),u.target.classList.add("selected"),u.target.text){case"Todos":i.setSelectedFilter(c.All);break;case"Pendientes":i.setSelectedFilter(c.Pending);break;case"Completados":i.setSelectedFilter(c.Completed);break}t()})})};i.initStore();R("#app");
