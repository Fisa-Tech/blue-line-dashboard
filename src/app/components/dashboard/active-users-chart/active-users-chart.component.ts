import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {StatsService} from "../../../services/stats.service";
import {DatePipe} from "@angular/common";
import {Period} from "../dashboard.component";
import {ChartModule} from "primeng/chart";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-active-users-chart',
  standalone: true,
  imports: [
    ChartModule,
    DropdownModule,
    FormsModule
  ],
  templateUrl: './active-users-chart.component.html',
  styleUrl: './active-users-chart.component.scss'
})
export class ActiveUsersChartComponent implements OnInit {

  @Output() nbActions = new EventEmitter<number>();

  data: any;
  options: any;
  periodOptions: Period[] | undefined;

  selectedPeriod: Period = { name: '7 jours', value: '7d' };
  nbTotalUsers: string | undefined;

  constructor(private statsService: StatsService,
              private datePipe: DatePipe) { }

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

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
      null
    ).subscribe((stats) => {
      this.nbActions.emit(stats.totalActions);
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
            borderColor: "#3170F9",
            tension: 0.4,
            backgroundColor: "#3170F9"
          }
        ]
      };
    });
  }
}
