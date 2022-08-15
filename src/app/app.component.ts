import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  loggedIn = false;
  constructor() {}

  ngOnInit() {
    if (localStorage['token']) this.loggedIn = true;
  }
}
