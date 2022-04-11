import './styles.css';
import { TodoList } from "./classes";
import { crearTodoHtml } from './js/componentes';

export const todoList = new TodoList();

// todoList.todos.forEach(( todo ) => crearTodoHtml( todo )); //esto es igual a:
todoList.todos.forEach( crearTodoHtml );