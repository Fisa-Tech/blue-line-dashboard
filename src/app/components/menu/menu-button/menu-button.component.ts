import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {Router} from "@angular/router";
import {Group} from "../../../models/group.model";
import {GroupService} from "../../../services/group-service";

@Component({
  selector: 'app-menu-button',
  standalone: true,
    imports: [
        ButtonModule
    ],
  templateUrl: './menu-button.component.html',
  styleUrl: './menu-button.component.scss'
})
export class MenuButtonComponent implements OnInit{

  groupName! : string;

  constructor(private router: Router,
              private groupService: GroupService) {
  }

  ngOnInit(): void {
    const groupId = sessionStorage.getItem('currentGroupId');
    if(groupId != null) {
      this.groupService.getGroup(groupId).subscribe((group) => {
        this.groupName = group.nomGroupe;
      });
    }
  }

  goToMenu() {
    this.router.navigateByUrl('material-list');
  }

}
