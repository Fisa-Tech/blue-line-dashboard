import {Component, OnInit} from '@angular/core';
import {ChartModule} from "primeng/chart";
import {DropdownModule} from "primeng/dropdown";
import {Period} from "../dashboard.component";
import {StatsService} from "../../../services/stats.service";
import {DatePipe} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-new-users-chart',
  standalone: true,
  imports: [
    ChartModule,
    DropdownModule,
    FormsModule
  ],
  templateUrl: './new-users-chart.component.html',
  styleUrl: './new-users-chart.component.scss'
})
export class NewUsersChartComponent implements OnInit {

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
      'REGISTER'
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
            borderColor: "#3170F9",
            tension: 0.4,
            backgroundColor: "#809ee0"
          }
        ]
      };
    });
  }

}
