import {Component, Input} from '@angular/core';
import {Material} from "../../../models/material.model";

@Component({
  selector: 'app-remove-material',
  standalone: true,
  imports: [],
  templateUrl: './remove-material.component.html',
  styleUrl: './remove-material.component.scss'
})
export class RemoveMaterialComponent {

  @Input() material: Material | undefined;
}
