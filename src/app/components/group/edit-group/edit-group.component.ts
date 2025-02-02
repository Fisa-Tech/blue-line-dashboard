import {Component, Input} from '@angular/core';
import {Group} from "../../../models/group.model";

@Component({
  selector: 'app-edit-group',
  standalone: true,
  imports: [],
  templateUrl: './edit-group.component.html',
  styleUrl: './edit-group.component.scss'
})
export class EditGroupComponent {

  @Input() group: Group | undefined;

}
