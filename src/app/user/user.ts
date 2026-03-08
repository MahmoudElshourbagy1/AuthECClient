import { Component } from '@angular/core';
import { Registration } from "./registration/registration";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-user',
  imports: [Registration, RouterOutlet],
  templateUrl: './user.html',
   styleUrls: ['./user.css'],
  styles: '',
})
export class User {

}
