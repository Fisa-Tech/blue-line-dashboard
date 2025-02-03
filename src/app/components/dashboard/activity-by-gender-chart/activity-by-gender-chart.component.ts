import {Component, OnInit} from '@angular/core';
import {ChartModule} from "primeng/chart";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {Period} from "../dashboard.component";
import {StatsService} from "../../../services/stats.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-activity-by-gender-chart',
  standalone: true,
  imports: [
    ChartModule,
    DropdownModule,
    FormsModule
  ],
  templateUrl: './activity-by-gender-chart.component.html',
  styleUrl: './activity-by-gender-chart.component.scss'
})
export class ActivityByGenderChartComponent implements OnInit {

  data: any;
  options: any;
  periodOptions: Period[] | undefined;

  selectedPeriod: Period = { name: '7 jours', value: '7d' };

  constructor(private statsService: StatsService,
              private datePipe: DatePipe) { }

  ngOnInit() {

    this.periodOptions = [
      { name: '7 jours', value: '7d' },
      { name: '1 mois', value: '1m' },
      { name: '3 mois', value: '3m' },
    ];

    this.loadData();

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        tooltip: {
          mode: 'index',
          intersect: false
        },
      },
      scales: {
        x: {
          stacked: true,
          grid: {
            drawBorder: false
          }
        },
        y: {
          stacked: true,
          grid: {
            drawBorder: false
          }
        }
      }
    };
  }

  loadData() {
    this.statsService.getActiveUsers(this.statsService.computeStartDate(this.selectedPeriod.name),
      new Date().toISOString().split("T")[0],
      this.selectedPeriod.name === '3 mois' ? 'WEEK' : 'DAY',
      null,
      'FEMALE',
      null
    ).subscribe((femaleStats) => {

      this.statsService.getActiveUsers(this.statsService.computeStartDate(this.selectedPeriod.name),
        new Date().toISOString().split("T")[0],
        this.selectedPeriod.name === '3 mois' ? 'WEEK' : 'DAY',
        null,
        'MALE',
        null
      ).subscribe((maleStats) => {

        this.statsService.getActiveUsers(this.statsService.computeStartDate(this.selectedPeriod.name),
          new Date().toISOString().split("T")[0],
          this.selectedPeriod.name === '3 mois' ? 'WEEK' : 'DAY',
          null,
          'OTHER',
          null
        ).subscribe((otherStats) => {

          this.data = {
            labels: Object.keys(femaleStats.activeUsersPerPeriod).map(label => {
              const formattedDate = this.datePipe.transform(label, 'dd MMM yyyy');
              return formattedDate ? formattedDate : label;
            }),
            datasets: [
              {
                type: 'bar',
                label: 'Femme',
                backgroundColor: '#3170F9',
                data: Object.values(femaleStats.activeUsersPerPeriod),
              },
              {
                type: 'bar',
                label: 'Homme',
                backgroundColor: '#11B5AE',
                data: Object.values(maleStats.activeUsersPerPeriod),
              },
              {
                type: 'bar',
                label: 'Autre',
                backgroundColor: '#FFA726',
                data: Object.values(otherStats.activeUsersPerPeriod),
              },
            ]
          };
        });
      });
    });
  }

}
