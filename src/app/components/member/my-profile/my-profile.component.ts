import { Component } from '@angular/core';
import {MenuButtonComponent} from "../../menu/menu-button/menu-button.component";

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [
    MenuButtonComponent
  ],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss'
})
export class MyProfileComponent {

}
