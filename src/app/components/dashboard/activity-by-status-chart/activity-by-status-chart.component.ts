import {Component, OnInit} from '@angular/core';
import {ChartModule} from "primeng/chart";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {Period} from "../dashboard.component";
import {StatsService} from "../../../services/stats.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-activity-by-status-chart',
  standalone: true,
  imports: [
    ChartModule,
    DropdownModule,
    FormsModule
  ],
  templateUrl: './activity-by-status-chart.component.html',
  styleUrl: './activity-by-status-chart.component.scss'
})
export class ActivityByStatusChartComponent  implements OnInit {

  data: any;
  options: any;
  periodOptions: Period[] | undefined;

  selectedPeriod: Period = { name: '7 jours', value: '7d' };
  nbTotalUsers: string | undefined;

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
      'LYCEE',
      null,
      null
    ).subscribe((lyceeStats) => {

      this.statsService.getActiveUsers(this.statsService.computeStartDate(this.selectedPeriod.name),
        new Date().toISOString().split("T")[0],
        this.selectedPeriod.name === '3 mois' ? 'WEEK' : 'DAY',
        'COLLEGE',
        null,
        null
      ).subscribe((collegeStats) => {

        this.statsService.getActiveUsers(this.statsService.computeStartDate(this.selectedPeriod.name),
          new Date().toISOString().split("T")[0],
          this.selectedPeriod.name === '3 mois' ? 'WEEK' : 'DAY',
          'ETUDIANT',
          null,
          null
        ).subscribe((etudiantStats) => {

          this.statsService.getActiveUsers(this.statsService.computeStartDate(this.selectedPeriod.name),
            new Date().toISOString().split("T")[0],
            this.selectedPeriod.name === '3 mois' ? 'WEEK' : 'DAY',
            'PERSONNEL',
            null,
            null
          ).subscribe((personnelStats) => {

            this.statsService.getActiveUsers(this.statsService.computeStartDate(this.selectedPeriod.name),
              new Date().toISOString().split("T")[0],
              this.selectedPeriod.name === '3 mois' ? 'WEEK' : 'DAY',
              'AUTRES',
              null,
              null
            ).subscribe((autresStats) => {
              this.data = {
                labels: Object.keys(autresStats.activeUsersPerPeriod).map(label => {
                  const formattedDate = this.datePipe.transform(label, 'dd MMM yyyy');
                  return formattedDate ? formattedDate : label;
                }),
                datasets: [
                  {
                    type: 'bar',
                    label: 'Etudiant',
                    backgroundColor: '#3170F9',
                    data: Object.values(etudiantStats.activeUsersPerPeriod),
                  },
                  {
                    type: 'bar',
                    label: 'Lycéen',
                    backgroundColor: '#11B5AE',
                    data: Object.values(lyceeStats.activeUsersPerPeriod),
                  },
                  {
                    type: 'bar',
                    label: 'Personnel',
                    backgroundColor: '#FFA726',
                    data: Object.values(personnelStats.activeUsersPerPeriod),
                  },
                  {
                    type: 'bar',
                    label: 'Collégien',
                    backgroundColor: '#EF5350',
                    data: Object.values(collegeStats.activeUsersPerPeriod),
                  },
                  {
                    type: 'bar',
                    label: 'Autre',
                    backgroundColor: '#AB47BC',
                    data: Object.values(autresStats.activeUsersPerPeriod),
                  },
                ]
              };
            });
          });
        });
      });
    });
  }
}
