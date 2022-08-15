import { Component, OnInit } from '@angular/core';
import { TodoListService } from 'src/app/services/todolist.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  constructor(private todoListService: TodoListService) {}

  login() {
    this.todoListService
      .login()
      .subscribe((data) => (localStorage['token'] = data));
  }
}
