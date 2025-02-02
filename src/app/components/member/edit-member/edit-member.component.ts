import {Component, Input} from '@angular/core';
import {Member} from "../../../models/member.model";

@Component({
  selector: 'app-edit-member',
  standalone: true,
  imports: [],
  templateUrl: './edit-member.component.html',
  styleUrl: './edit-member.component.scss'
})
export class EditMemberComponent {

  @Input() member: Member | undefined;

}
