import { Component } from '@angular/core';
import { TodoListService } from '../services/todolist.service';

@Component({
  selector: 'todo-lists',
  templateUrl: './todo-lists.component.html',
})
export class TodoListsComponent {
  todoLists: any = [];
  input = '';
  open = false;
  draggedItemData: any;
  constructor(private todoListService: TodoListService) {
    console.log(todoListService);
  }

  allowDrop(e: any) {
    e.preventDefault();
  }

  handleDrop(todoListId: number) {
    if (this.draggedItemData.from === todoListId) return;

    const deleteFromOldList = () => {
      let old = this.todoLists.find(
        (t: any) => t.id === this.draggedItemData.from
      );
      old.todos = old.todos.filter(
        (todo: any) => todo.id !== this.draggedItemData.todoId
      );
    };

    this.todoListService
      .updateTodo(this.draggedItemData.todoId, { todoListId })
      .subscribe((data) => {
        deleteFromOldList();
        const found = this.todoLists.find((t: any) => t.id === todoListId);
        found.todos = [...found.todos, data];
      });
  }

  dragDrop(e: any) {
    this.draggedItemData = e;
    console.log(this.draggedItemData);
  }

  ngOnInit() {
    this.todoListService
      .getTodoLists()
      .subscribe((data) => (this.todoLists = data));
  }

  onKey(e: any) {
    this.input = e.target.value;
  }

  toggleOpen() {
    this.open = !this.open;
  }

  deleteTodoList = (id: number) => {
    this.todoListService.deleteTodoList(id).subscribe(() => {
      this.todoLists = this.todoLists.filter((list: any) => list.id !== id);
    });
  };

  handleEnterPress = (e: any) => {
    if (e.target.id !== 'todo-list-input') return;
    this.addTodoList({ title: this.input });
    this.input = '';
  };

  addTodoList = (todoList: any) => {
    this.todoListService
      .createTodoList(todoList)
      .subscribe((data) => (this.todoLists = [...this.todoLists, data]));
  };
}
