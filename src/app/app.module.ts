import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TodoListsComponent } from './todo-lists/todo-lists.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoListService } from './services/todolist.service';

@NgModule({
  declarations: [
    AppComponent,
    TodoListsComponent,
    LoginFormComponent,
    TodoListComponent,
  ],
  imports: [BrowserModule, HttpClientModule],
  providers: [TodoListService],
  bootstrap: [AppComponent, TodoListsComponent, LoginFormComponent],
})
export class AppModule {}
