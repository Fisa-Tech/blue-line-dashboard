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
        if (response.membreId !== 'null') {
          sessionStorage.setItem('currentUserId', response.membreId);
          sessionStorage.setItem('currentGroupId', response.groupeId);
          sessionStorage.setItem('currentMemberType', response.typeMembre);
          sessionStorage.setItem('currentMemberName', response.membreName);
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
    sessionStorage.removeItem('currentUserId');
    sessionStorage.removeItem('currentGroupId');
    sessionStorage.removeItem('currentMemberType');
    sessionStorage.removeItem('currentMemberName');
  }

  getToken(): string | null {
    return sessionStorage.getItem('currentUserId');
  }
}
