import { Routes } from '@angular/router';
import {MyProfileComponent} from "./components/member/my-profile/my-profile.component";
import {ConnexionComponent} from "./components/connexion/connexion.component";
import {MemberListComponent} from "./components/member/member-list/member-list.component";
import {GroupListComponent} from "./components/group/group-list/group-list.component";
import {MaterialListComponent} from "./components/material/material-list/material-list.component";
import {AuthGuard} from "./services/permission.service";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ChallengeListComponent} from "./components/challenge/challenge-list/challenge-list.component";

export const routes: Routes = [
  {path: '', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'member-list', component: MemberListComponent, canActivate: [AuthGuard]},
  {path: 'group-list', component: GroupListComponent, canActivate: [AuthGuard]},
  {path: 'events', component: MaterialListComponent, canActivate: [AuthGuard]},
  {path: 'challenges', component: ChallengeListComponent, canActivate: [AuthGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: MyProfileComponent, canActivate: [AuthGuard]},
  {path: 'auth/login', component: ConnexionComponent},
];
