import {Component, EventEmitter, Output} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {SharedModule} from "primeng/api";
import {TooltipModule} from "primeng/tooltip";
import {regexValidator} from "../../../services/regexValidator.service";
import {InputNumberModule} from "primeng/inputnumber";
import {EventService} from "../../../services/event.service";
import {Material} from "../../../models/material.model";
import {CalendarModule} from "primeng/calendar";
import {MyEvent} from "../../../models/myEvent.model";

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
    InputNumberModule,
    CalendarModule
  ],
  templateUrl: './add-material.component.html',
  styleUrl: './add-material.component.scss'
})
export class AddMaterialComponent {

  @Output() eventMaterialAdded = new EventEmitter<MyEvent>();

  addMaterialForm = this.fb.group({
    name: ['', Validators.required, regexValidator(/^([A-Za-zéèàêâûôîùç\s-]{1,50})$/)],
    location: ['', Validators.required, regexValidator(/^([A-Za-zéèàêâûôîùç\s-]{1,50})$/)],
    startDate: ['', Validators.required,],
    endDate: ['', Validators.required,],
    description: [null, Validators.required]
  });

  constructor(private fb: FormBuilder,
              private  eventService: EventService) { };

  submit() : boolean {
    if(this.addMaterialForm && this.addMaterialForm.valid) {
      const name = this.addMaterialForm.get('name')?.value;
      const location = this.addMaterialForm.get('location')?.value;
      const startDate = this.addMaterialForm.get('startDate')?.value;
      const endDate = this.addMaterialForm.get('endDate')?.value;
      const description = this.addMaterialForm.get('description')?.value;
      if(name && location && startDate && endDate && description) {
        this.eventService.addEvent({
          name: name,
          location: location,
          startDate: startDate,
          endDate: endDate,
          description: description,
        }).subscribe( event => {
            this.eventMaterialAdded.emit({
              name: event.name,
              location: event.location
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
