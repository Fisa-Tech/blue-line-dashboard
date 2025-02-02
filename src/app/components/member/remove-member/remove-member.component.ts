import {Component, Input} from '@angular/core';
import {Member} from "../../../models/member.model";

@Component({
  selector: 'app-remove-member',
  standalone: true,
  imports: [],
  templateUrl: './remove-member.component.html',
  styleUrl: './remove-member.component.scss'
})
export class RemoveMemberComponent {

  @Input() member: Member | undefined;

}
