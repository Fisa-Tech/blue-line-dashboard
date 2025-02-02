import { Component } from '@angular/core';
import {MenuButtonComponent} from "../../menu/menu-button/menu-button.component";

@Component({
  selector: 'app-my-profile',
  standalone: true,
  templateUrl: './my-profile.component.html',
  imports: [
    MenuButtonComponent
  ],
  styleUrl: './my-profile.component.scss'
})
export class MyProfileComponent {

}
