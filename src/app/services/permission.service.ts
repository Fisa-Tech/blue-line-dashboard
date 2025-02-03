import {inject, Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth.service";
import {UtilsService} from "./utils-service";

@Injectable({
  providedIn: 'root'
})
class PermissionService {

  constructor(private router: Router,
              private utils: UtilsService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.utils.getToken();

    if (token) {
      const decodedToken = this.decodeToken(token);
      const expirationDate = decodedToken.exp * 1000;
      const now = new Date().getTime();

      if (expirationDate > now) {
        return true;
      } else {
        this.router.navigateByUrl('auth/login');
        return false;
      }
    } else {
      this.router.navigateByUrl('auth/login');
      return false;
    }
  }

  decodeToken(token: string): any {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid token');
    }
    const decoded = atob(parts[1]);
    return JSON.parse(decoded);
  }

}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(PermissionService).canActivate(next, state);
}
