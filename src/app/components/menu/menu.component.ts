import {Component, OnInit, Renderer2, ElementRef, ViewChild, TemplateRef, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MenubarModule} from "primeng/menubar";
import { MenuItem } from 'primeng/api';
import {TabMenuModule} from "primeng/tabmenu";
import {ButtonModule} from "primeng/button";
import {SplitButtonModule} from "primeng/splitbutton";
import {AvatarModule} from "primeng/avatar";
import {MenuModule} from "primeng/menu";
import {PanelMenuModule} from "primeng/panelmenu";
import { DialogModule } from 'primeng/dialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import {ConnexionComponent} from "../connexion/connexion.component";
import {AutoFocusModule} from "primeng/autofocus";
import { Router } from '@angular/router';
import {MenuButtonComponent} from "./menu-button/menu-button.component";
import {EditMemberComponent} from "../member/edit-member/edit-member.component";
import {RemoveMemberComponent} from "../member/remove-member/remove-member.component";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MenubarModule,
    MenubarModule,
    TabMenuModule,
    CommonModule,
    ButtonModule,
    SplitButtonModule,
    AvatarModule,
    MenuModule,
    PanelMenuModule,
    DialogModule,
    AutoFocusModule,
    MenuButtonComponent,
    EditMemberComponent,
    RemoveMemberComponent,
  ],
  providers: [DialogService],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  @ViewChild('profileMenu', { read: ElementRef }) profileMenu?:ElementRef;
  @ViewChild('profileMenuButton', { read: ElementRef }) profileMenuButton?:ElementRef;
  tabs?: MenuItem[];
  profileMenuItems?: MenuItem[];
  showProfileMenu = false;

  activeTab?: MenuItem;
  ref: DynamicDialogRef | undefined;


  @Input() showTabs: boolean = true;
  @Input() tabSelected!: number;

  constructor(private renderer: Renderer2,
              private dialogService: DialogService,
              private router: Router,
              private authService: AuthService) { }


  ngOnInit() {
    const activeMember = sessionStorage.getItem('currentMemberType') === 'Actif';
    if(activeMember) {
      this.tabs = [
        { label: 'Matériel', icon: 'pi pi-fw pi-box', command: () => this.openMaterialList() },
        { label: 'Membres', icon: 'pi pi-fw pi-user', command: () => this.openMemberList() },
      ];
      this.profileMenuItems = [
        {
          label: 'Groupes',
          command: () => this.groups()
        },
        {
          label: 'Mon profil',
          command: () => this.myProfile()
        },
        {
          label: 'Déconnexion',
          command: () => this.disconnect()
        }];
    } else {
      this.tabs = [
        { label: 'Matériel', icon: 'pi pi-fw pi-box', command: () => this.openMaterialList() },
      ];
      this.profileMenuItems = [
        {
          label: 'Mon profil',
          command: () => this.myProfile()
        },
        {
          label: 'Déconnexion',
          command: () => this.disconnect()
        }];
    }

    this.activeTab = this.tabs[this.tabSelected];

    this.renderer.listen('document', 'click', (event) => {
      if (!this.profileMenu?.nativeElement.contains(event.target) && !this.profileMenuButton?.nativeElement.contains(event.target)) {
        this.showProfileMenu = false;
      }
    });
  }

  onProfileMenuButtonClick() {
    this.showProfileMenu = !this.showProfileMenu;
  }

  onActiveItemChange(event: MenuItem) {
    this.activeTab = event;
  }

  openConnexionForm() {
    this.ref = this.dialogService.open(ConnexionComponent, {
      header: 'Connexion',
      width: '50vw',
      height: '75vh',
      contentStyle: { overflow: 'auto' }
    });
  }

  disconnect() {
    this.authService.logOut();
    this.router.navigateByUrl('/auth/login');
  }

  myProfile() {
    this.router.navigateByUrl('/profile');
  }

  groups() {
    this.router.navigateByUrl('/group-list');
  }


  openMemberList() {
    this.router.navigateByUrl('member-list');
  }

  openGroupList() {
    this.router.navigateByUrl('group-list');
  }

  openMaterialList() {
    this.router.navigateByUrl('material-list');
  }


}
