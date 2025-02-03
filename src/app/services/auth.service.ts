import {Injectable} from "@angular/core";
import {UserService} from "./user-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token!: string;

  constructor(private memberService: UserService) {
  }

  login(email: string, password: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.memberService.login(email, password).subscribe(response => {
        if (response) {
          sessionStorage.setItem('userToken', response);
          resolve(true);
        } else {
          resolve(false);
        }
      }, error => {
        resolve(false);
      });
    });
  }

  logOut() {
    sessionStorage.removeItem('userToken');
  }
}
