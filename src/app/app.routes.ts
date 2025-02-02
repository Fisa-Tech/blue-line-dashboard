import { Routes } from '@angular/router';
import {MyProfileComponent} from "./components/member/my-profile/my-profile.component";
import {ConnexionComponent} from "./components/connexion/connexion.component";
import {MemberListComponent} from "./components/member/member-list/member-list.component";
import {GroupListComponent} from "./components/group/group-list/group-list.component";
import {MaterialListComponent} from "./components/material/material-list/material-list.component";
import {AuthGuard, AuthGuardActive} from "./services/permission.service";

export const routes: Routes = [
  {path: '', component: MaterialListComponent, canActivate: [AuthGuard]},
  {path: 'member-list', component: MemberListComponent, canActivate: [AuthGuardActive]},
  {path: 'group-list', component: GroupListComponent, canActivate: [AuthGuardActive]},
  {path: 'material-list', component: MaterialListComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: MyProfileComponent, canActivate: [AuthGuard]},
  {path: 'auth/login', component: ConnexionComponent},
];
