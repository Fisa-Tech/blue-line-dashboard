import {Component, Input} from '@angular/core';
import {Group} from "../../../models/group.model";

@Component({
  selector: 'app-remove-group',
  standalone: true,
  imports: [],
  templateUrl: './remove-group.component.html',
  styleUrl: './remove-group.component.scss'
})
export class RemoveGroupComponent {

  @Input() group?: Group;

}
