import {Component, OnInit} from '@angular/core';
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
import {UserService} from "../../services/user-service";

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
export class DashboardComponent implements OnInit {

  nbActions = 0;
  nbUsers = 0;
  challengeAverageParticipants = 0;
  eventAverageParticipants = 0;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.nbUsers = users.length;
    });
  }

  handleNbActionsComputed(nbActions: number) {
    this.nbActions = nbActions;
  }

  handleChallengeParticipationsComputed(nbParticipations: number) {
    this.challengeAverageParticipants = nbParticipations;
  }

  handleEventParticipationsComputed(nbParticipations: number) {
    this.eventAverageParticipants = nbParticipations;
  }
}
