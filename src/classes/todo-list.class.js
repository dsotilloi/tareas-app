import { Todo } from "./todo.class";

export class TodoList {
  constructor() {
    // this.todos = [];
    this.pendientes = 0;
    this.cargarLocalStorage();

  }

  nuevoTodo( todo ) {

    this.todos.push( todo );
    this.guardarLocalStorage();

  }

  eliminarTodo( id ) {

    this.todos = this.todos.filter(( todo ) => todo.id != id);
    this.guardarLocalStorage();

  }

  marcarCompletado( id ) {

    for( const todo of this.todos ) {

      if( todo.id == id ) {

        todo.completado = !todo.completado;
        this.guardarLocalStorage();
        break;

      }

    }

  }

  eliminarCompletados() {

    this.todos = this.todos.filter(( todo ) => !todo.completado);
    this.guardarLocalStorage();

  }

  contarPendientes() {

    const pendientes = this.todos.filter(( todo ) => todo.completado === false);
    this.guardarLocalStorage( pendientes.length );

    return pendientes.length;

  }

  guardarLocalStorage( pendientes ){

    localStorage.setItem('todo', JSON.stringify(this.todos));

    localStorage.setItem('pendientes', pendientes);

  }

  cargarLocalStorage(){
      
    if( localStorage.getItem('todo') ) {
      this.todos = JSON.parse(localStorage.getItem('todo'));
    
    }else {
      this.todos = [];
    }

    this.pendientes = localStorage.getItem('pendientes');

    this.todos = this.todos.map( Todo.fromJson );

  }
}