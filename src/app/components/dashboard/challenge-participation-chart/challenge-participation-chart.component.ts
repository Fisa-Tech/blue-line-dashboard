import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ChartModule} from "primeng/chart";
import {DropdownModule} from "primeng/dropdown";
import {Period} from "../dashboard.component";
import {StatsService} from "../../../services/stats.service";
import {DatePipe} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-challenge-participation-chart',
  standalone: true,
  imports: [
    ChartModule,
    DropdownModule,
    FormsModule
  ],
  templateUrl: './challenge-participation-chart.component.html',
  styleUrl: './challenge-participation-chart.component.scss'
})
export class ChallengeParticipationChartComponent implements OnInit {

  @Output() nbParticipantsByChallenge = new EventEmitter<number>();

  data: any;
  options: any;
  periodOptions: Period[] | undefined;

  selectedPeriod: Period = { name: '7 jours', value: '7d' };
  nbTotalUsers: string | undefined;

  constructor(private statsService: StatsService,
              private datePipe: DatePipe) { }

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);

    this.periodOptions = [
      { name: '7 jours', value: '7d' },
      { name: '1 mois', value: '1m' },
      { name: '3 mois', value: '3m' },
    ];

    this.loadData();

    this.options = {
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          display: false
        },
        y: {
          display: false
        }
      }
    };
  }

  loadData() {
    this.statsService.getActiveUsers(this.statsService.computeStartDate(this.selectedPeriod.name),
      new Date().toISOString().split("T")[0],
      this.selectedPeriod.name === '3 mois' ? 'WEEK' : 'DAY',
      null,
      null,
      'JOIN_CHALLENGE'
    ).subscribe((stats) => {
      this.nbTotalUsers = stats.totalActiveUsers.toString();
      this.data = {
        labels: Object.keys(stats.activeUsersPerPeriod).map(label => {
          const formattedDate = this.datePipe.transform(label, 'dd MMM yyyy');
          return formattedDate ? formattedDate : label;
        }),
        datasets: [
          {
            data: Object.values(stats.activeUsersPerPeriod),
            fill: true,
            borderColor: "#11B5AE",
            tension: 0.4,
            backgroundColor: "#56d3c9"
          }
        ]
      };

      this.statsService.getActiveUsers(this.statsService.computeStartDate(this.selectedPeriod.name),
        new Date().toISOString().split("T")[0],
        this.selectedPeriod.name === '3 mois' ? 'WEEK' : 'DAY',
        null,
        null,
        'CREATE_CHALLENGE'
      ).subscribe((creationStats) => {
        this.nbParticipantsByChallenge.emit(stats.totalActiveUsers / creationStats.totalActiveUsers);
      });
    });
  }
}
