import {Component, EventEmitter, Output} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {PasswordModule} from "primeng/password";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {SharedModule} from "primeng/api";
import {TooltipModule} from "primeng/tooltip";
import {regexValidator} from "../../../services/regexValidator.service";
import {GroupService} from "../../../services/group-service";
import {Material} from "../../../models/material.model";

@Component({
  selector: 'app-add-group',
  standalone: true,
    imports: [
        ButtonModule,
        InputTextModule,
        PaginatorModule,
        PasswordModule,
        ReactiveFormsModule,
        SharedModule,
        TooltipModule
    ],
  templateUrl: './add-group.component.html',
  styleUrl: './add-group.component.scss'
})
export class AddGroupComponent {

  @Output() eventGroupAdded = new EventEmitter<string>();

  addGroupForm = this.fb.group({
    name: ['', Validators.required, regexValidator(/^([A-Za-zéèàêâûôîùç\s-]{1,50})$/)],
    city: ['', Validators.required, regexValidator(/^([A-Za-zéèàêâûôîùç\s-]{1,50})$/)],
    cp: [null, Validators.required, regexValidator(/^\d{5}$/)]
  });

  constructor(private fb: FormBuilder,
              private groupService: GroupService) { };

  submit() : boolean {
    if(this.addGroupForm && this.addGroupForm.valid) {
      const name = this.addGroupForm.get('name')?.value;
      const city = this.addGroupForm.get('city')?.value;
      const cp = this.addGroupForm.get('cp')?.value;
      if(name && city && cp) {
        this.groupService.addGroup({
          name: name,
          city: city,
          cp: cp,
        }).subscribe( group => {
            this.eventGroupAdded.emit(group.nomGroupe);
          }
        );
        return true;
      } else { return false}
    } else {
      return false;
    }
  }

  reset() {
    this.addGroupForm.reset();
  }

}
