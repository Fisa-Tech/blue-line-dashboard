import {Component, EventEmitter, Output} from '@angular/core';
import {CalendarModule} from "primeng/calendar";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {regexValidator} from "../../../services/regexValidator.service";
import {Challenge} from "../../../models/challenge.model";
import {ChallengeService} from "../../../services/challenge-service";
import {SelectButtonModule} from "primeng/selectbutton";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-add-challenge',
  standalone: true,
  imports: [
    CalendarModule,
    InputTextModule,
    PaginatorModule,
    ReactiveFormsModule,
    SelectButtonModule,
    NgIf
  ],
  templateUrl: './add-challenge.component.html',
  styleUrl: './add-challenge.component.scss'
})
export class AddChallengeComponent {

  @Output() eventChallengeAdded = new EventEmitter<Challenge>();

  addChallengeForm = this.fb.group({
    name: ['', Validators.required, regexValidator(/^([A-Za-zéèàêâûôîùç\s-]{1,50})$/)],
    type: ['', Validators.required, regexValidator(/^([A-Za-zéèàêâûôîùç\s-]{1,50})$/)],
    startDate: ['', Validators.required,],
    endDate: ['', Validators.required,],
    description: ['', Validators.required],
    goal: [null, Validators.required],
  });

  types = [
    {name: 'Distance', value: 'DISTANCE'},
    {name: 'Temps', value: 'TIME'},
  ]

  constructor(private fb: FormBuilder,
              private  challengeService: ChallengeService) { };

  submit() : boolean {
    if(this.addChallengeForm && this.addChallengeForm.valid) {
      const name = this.addChallengeForm.get('name')?.value;
      const type = this.addChallengeForm.get('type')?.value;
      const startDate = this.addChallengeForm.get('startDate')?.value;
      const endDate = this.addChallengeForm.get('endDate')?.value;
      const description = this.addChallengeForm.get('description')?.value;
      const goal = this.addChallengeForm.get('goal')?.value;
      if(name && type && startDate && endDate && description && goal) {
        this.challengeService.addChallenge({
          name: name,
          type: type,
          startDate: startDate,
          endDate: endDate,
          description: description,
          distanceGoal: type === 'DISTANCE' ? goal : null,
          timeGoal: type === 'TIME' ? goal : null,
        }).subscribe( event => {
            this.eventChallengeAdded.emit({
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
    this.addChallengeForm.reset();
  }
}
