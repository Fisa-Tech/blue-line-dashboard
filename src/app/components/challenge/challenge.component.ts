import { Component } from '@angular/core';
import {MenuComponent} from "../menu/menu.component";

@Component({
  selector: 'app-challenge',
  standalone: true,
    imports: [
        MenuComponent
    ],
  templateUrl: './challenge.component.html',
  styleUrl: './challenge.component.scss'
})
export class ChallengeComponent {

}
