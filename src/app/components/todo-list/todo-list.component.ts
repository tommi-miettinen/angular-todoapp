import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoListService } from 'src/app/services/todolist.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent {
  @Input() todoList: any = null;
  @Input() deleteTodoList: any;
  @Input() addTodoList: any;
  @Output() dragEvent = new EventEmitter();

  addingTodo = false;
  isOpen = false;
  input = '';

  constructor(private todoListService: TodoListService) {}

  onKey(e: any) {
    this.input = e.target.value;
  }

  handleDrag(dragData: any) {
    this.dragEvent.emit(dragData);
  }

  createTodo(e: any, todoListId: number) {
    if (e.target.id !== 'todo-input') return;
    this.todoListService
      .createTodo(this.input, todoListId)
      .subscribe((data) => this.todoList.todos.push(data));
    this.input = '';
  }

  setAddingTodo(bool: boolean) {
    this.addingTodo = bool;
  }

  toggleCompleteTodoList() {
    this.todoList.completed = !this.todoList.completed;
  }

  copyTodoList() {
    this.addTodoList(this.todoList);
  }

  deleteTodo(id: number) {
    this.todoListService.deleteTodo(id).subscribe(() => {
      this.todoList.todos = this.todoList.todos.filter((t: any) => t.id !== id);
    });
  }

  toggleOpen(e: any) {
    if (e.target.id === 'todoList') {
      this.isOpen = !this.isOpen;
      this.addingTodo = false;
    }
  }
}
