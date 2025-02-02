import {inject, Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
class PermissionService {

  constructor(private router: Router,
              private auth: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.auth.getToken() != null) {
      return true;
    } else {
      this.router.navigateByUrl('auth/login');
      return false;
    }
  }

  canActivateActive(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const activeMember = sessionStorage.getItem('currentMemberType') === 'Actif';
    if (this.auth.getToken() != null && activeMember) {
      return true;
    } else {
      this.router.navigateByUrl('material-list');
      return false;
    }
  }

}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(PermissionService).canActivate(next, state);
}

export const AuthGuardActive: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(PermissionService).canActivateActive(next, state);
}
