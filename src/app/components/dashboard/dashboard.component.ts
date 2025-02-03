import {Component} from '@angular/core';
import {ChartModule} from "primeng/chart";
import {MenuComponent} from "../menu/menu.component";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {ActiveUsersChartComponent} from "./active-users-chart/active-users-chart.component";
import {NewUsersChartComponent} from "./new-users-chart/new-users-chart.component";
import {
  ChallengeParticipationChartComponent
} from "./challenge-participation-chart/challenge-participation-chart.component";
import {EventParticipationChartComponent} from "./event-participation-chart/event-participation-chart.component";

export interface Period {
  name: string;
  value: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ChartModule,
    MenuComponent,
    DropdownModule,
    FormsModule,
    ActiveUsersChartComponent,
    NewUsersChartComponent,
    ChallengeParticipationChartComponent,
    EventParticipationChartComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [DatePipe]
})
export class DashboardComponent {

  nbActions = 0;
  nbUsers = 0;
  challengeAverageParticipants = 0;
  eventAverageParticipants = 0;

  handleNbActionsComputed(nbActions: number) {
    this.nbActions = nbActions;
  }
}
