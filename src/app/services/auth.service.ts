import {Injectable} from "@angular/core";
import {MemberService} from "./member-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token!: string;

  constructor(private memberService: MemberService) {
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

  getToken(): string | null {
    return sessionStorage.getItem('userToken');
  }
}
