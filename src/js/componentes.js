import { Todo } from "../classes";
import { todoList } from "../index";

//Referencias al HTML:
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const borrarCompletados = document.querySelector('.clear-completed');
const ulFilters = document.querySelector('.filters');
const anchorFiltro = document.querySelectorAll('.filtro');
const todoCount = document.querySelector('strong');

//Crea nodo en el HTML:
export const crearTodoHtml = ( todo ) => {
  const htmlTodo = `
	<li class=${ (todo.completado) ? 'completed' : undefined }  data-id=${ todo.id }>
		<div class="view">
			<input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : undefined }>
			<label>${ todo.tarea }</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li>`;

	const div = document.createElement('div');
	div.innerHTML = htmlTodo;

	divTodoList.append( div.firstElementChild );

	return div.firstElementChild;

};

//Eventos:
txtInput.addEventListener('keyup', ( event ) => {

	if( event.keyCode === 13 && txtInput.value ) {
		
		const nuevoTodo = new Todo( txtInput.value );
		todoList.nuevoTodo( nuevoTodo );

		crearTodoHtml( nuevoTodo );
		txtInput.value = '';

	}

	todoCount.innerText = todoList.contarPendientes()

});

divTodoList.addEventListener('click', ( event ) => {
	
	const nombreElemento = event.target.localName;
	const todoElemento = event.target.parentElement.parentElement;
	const todoId = todoElemento.getAttribute('data-id');

	if ( nombreElemento.includes('input') ){
		todoList.marcarCompletado( todoId );
		todoElemento.classList.toggle('completed');
	}

	if( nombreElemento.includes('button') ) {
		todoList.eliminarTodo( todoId );
		divTodoList.removeChild( todoElemento );
	}

	todoCount.innerText = todoList.contarPendientes()

});

borrarCompletados.addEventListener('click', () => {

	todoList.eliminarCompletados();

	for( let i = divTodoList.children.length - 1; i >= 0; i--) {
		const elemento = divTodoList.children[i];

		if(elemento.classList.contains('completed')){
			divTodoList.removeChild(elemento);
		}
	}

});

ulFilters.addEventListener('click', (event) => {
		const filtro = event.target.text;
		if( !filtro ) { return; }

		anchorFiltro.forEach((elemento)=> elemento.classList.remove('selected'));
		event.target.classList.add('selected');

		for( const elemento of divTodoList.children ) {

			elemento.classList.remove('hidden');
			const completado = elemento.classList.contains('completed');

			switch( filtro ) {

				case 'Pendientes':
					if( completado ) {
						elemento.classList.add('hidden');
					}
				break;

				case 'Completados':
					if( !completado ) {
						elemento.classList.add('hidden');
					}
				break;

			}

		}

});

