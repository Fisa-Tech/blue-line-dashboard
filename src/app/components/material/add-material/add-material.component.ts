import {Component, EventEmitter, Output} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {SharedModule} from "primeng/api";
import {TooltipModule} from "primeng/tooltip";
import {regexValidator} from "../../../services/regexValidator.service";
import {InputNumberModule} from "primeng/inputnumber";
import {MaterialService} from "../../../services/material.service";
import {Material} from "../../../models/material.model";

@Component({
  selector: 'app-add-material',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    PasswordModule,
    ReactiveFormsModule,
    SharedModule,
    TooltipModule,
    InputNumberModule
  ],
  templateUrl: './add-material.component.html',
  styleUrl: './add-material.component.scss'
})
export class AddMaterialComponent {

  @Output() eventMaterialAdded = new EventEmitter<Material>();

  addMaterialForm = this.fb.group({
    serial: ['', Validators.required, regexValidator(/^([A-Za-zéèàêâûôîùç\s-]{1,50})$/)],
    brand: ['', Validators.required, regexValidator(/^([A-Za-zéèàêâûôîùç\s-]{1,50})$/)],
    model: ['', Validators.required, regexValidator(/^([A-Za-zéèàêâûôîùç\s-]{1,50})$/)],
    type: ['', Validators.required, regexValidator(/^([A-Za-zéèàêâûôîùç\s-]{1,50})$/)],
    price: [null, Validators.required]
  });

  constructor(private fb: FormBuilder,
              private  materialService: MaterialService) { };

  submit() : boolean {
    if(this.addMaterialForm && this.addMaterialForm.valid) {
      const serial = this.addMaterialForm.get('serial')?.value;
      const brand = this.addMaterialForm.get('brand')?.value;
      const model = this.addMaterialForm.get('model')?.value;
      const type = this.addMaterialForm.get('type')?.value;
      const price = this.addMaterialForm.get('price')?.value;
      const groupId = sessionStorage.getItem('currentGroupId')

      if(serial && brand && model && type && price && groupId) {
        this.materialService.addMaterial({
          serial: serial,
          brand: brand,
          model: model,
          type: type,
          price: price,
          groupId: groupId
        }).subscribe( material => {
            this.eventMaterialAdded.emit({
              brand: material.marque,
              model: material.modele
            });
          }
        );
        return true;
      } else { return false}
    } else {
      return false;
    }
  }

  reset() {
    this.addMaterialForm.reset();
  }
}
