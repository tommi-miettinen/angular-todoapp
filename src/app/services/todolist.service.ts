import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  baseUrl = 'https://rest-back.herokuapp.com';
  options = { headers: { authorization: localStorage['token'] } };

  constructor(private http: HttpClient) {}

  login() {
    return this.http.post(`${this.baseUrl}/login`, {
      username: 'tommimiettinen',
      password: 'tommimiettinen',
    });
  }

  getTodoLists() {
    return this.http.get(`${this.baseUrl}/todolists`, this.options);
  }

  createTodoList(todoList: any) {
    return this.http.post(`${this.baseUrl}/todolists`, todoList, this.options);
  }

  deleteTodoList(id: number) {
    return this.http.delete(`${this.baseUrl}/todolists/${id}`, this.options);
  }

  createTodo(title: string, todoListId: number) {
    return this.http.post(
      `${this.baseUrl}/todolists/${todoListId}/todos`,
      { title, description: title },
      this.options
    );
  }

  deleteTodo(id: number) {
    return this.http.delete(`${this.baseUrl}/todos/${id}`, this.options);
  }

  updateTodo(todoId: number, todo: any) {
    return this.http.patch(
      `${this.baseUrl}/todos/${todoId}`,
      todo,
      this.options
    );
  }
}
