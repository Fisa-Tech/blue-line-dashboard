import {Component, OnInit} from '@angular/core';
import {ChartModule} from "primeng/chart";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {Period} from "../dashboard.component";
import {UserService} from "../../../services/user-service";

@Component({
  selector: 'app-gender-chart',
  standalone: true,
  imports: [
    ChartModule,
    DropdownModule,
    FormsModule
  ],
  templateUrl: './gender-chart.component.html',
  styleUrl: './gender-chart.component.scss'
})
export class GenderChartComponent implements OnInit {

  data: any;
  options: any;
  periodOptions: Period[] | undefined;

  selectedPeriod: Period = { name: '7 jours', value: '7d' };
  nbTotalUsers: string | undefined;

  constructor(private userService: UserService) { }

  ngOnInit() {

    this.periodOptions = [
      { name: '7 jours', value: '7d' },
      { name: '1 mois', value: '1m' },
      { name: '3 mois', value: '3m' },
    ];

    this.loadData();

    this.options = {
      cutout: '60%',
      plugins: {
        legend: {
          display: true,
          position: "bottom"
        }
      }
    };
  }

  loadData() {
    this.userService.getUsers().subscribe(users => {
      this.data = {
        labels: ['Femme', 'Homme', 'Autre'],
        datasets: [
          {
            data: [
              users.filter(female => female.gender === 'FEMALE').length,
              users.filter(male => male.gender === 'MALE').length,
              users.filter(other => other.gender === 'OTHER').length
            ],
            backgroundColor: ["#3170F9", "#11B5AE", "#FFA726"],
          }
        ]
      };
    });
  }
}
