import {Component, Input} from '@angular/core';
import {Material} from "../../../models/material.model";
import {MyEvent} from "../../../models/myEvent.model";

@Component({
  selector: 'app-edit-material',
  standalone: true,
  imports: [],
  templateUrl: './edit-material.component.html',
  styleUrl: './edit-material.component.scss'
})
export class EditMaterialComponent {

  @Input() event: MyEvent | undefined;
}
