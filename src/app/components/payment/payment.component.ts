import {Component, EventEmitter, Output} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {PasswordModule} from "primeng/password";
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {SelectButtonModule} from "primeng/selectbutton";
import {SharedModule} from "primeng/api";
import {TooltipModule} from "primeng/tooltip";
import {Member} from "../../models/member.model";
import {Group} from "../../models/group.model";
import {regexValidator} from "../../services/regexValidator.service";
import {MemberService} from "../../services/member-service";
import {GroupService} from "../../services/group-service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-payment',
  standalone: true,
    imports: [
        ButtonModule,
        DropdownModule,
        InputNumberModule,
        InputTextModule,
        NgIf,
        PaginatorModule,
        PasswordModule,
        ReactiveFormsModule,
        SelectButtonModule,
        SharedModule,
        TooltipModule
    ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  @Output() eventUserCreated = new EventEmitter<Member>();

  userGroupId!: string | null;
  groups : Group[] = [];
  groupNames!: string[];
  missGroup = false;

  inscriptionForm = this.fb.group({
    firstName: ['', Validators.required, regexValidator(/^([A-Za-zéèàêâûôîùç\s-]{1,50})$/)],
    lastName: ['', Validators.required, regexValidator(/^([A-Za-zéèàêâûôîùç\s-]{1,50})$/)],
    email: ['', Validators.required, regexValidator(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)],
    address: this.fb.group({
      number: [null, Validators.required, regexValidator(/^\d{1,4}[A-Za-z]{0,3}$/)],
      street: ['', Validators.required, regexValidator(/^([A-Za-zéèàêâûôîùç\s-]{1,50})$/)],
      city: ['', Validators.required, regexValidator(/^([A-Za-zéèàêâûôîùç\s-]{1,50})$/)],
      cp: [null, Validators.required, regexValidator(/^\d{5}$/)]
    }),
    group:['', Validators.required],
    password: ['', Validators.required, [regexValidator(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)]],
    memberType: new FormControl('Client')
  });

  statusOptions: any[] = [
    { label: 'Client', value: 'Client' },
    { label: 'Actif', value: 'Actif' }
  ];


  constructor(private fb: FormBuilder,
              private memberService: MemberService,
              private groupService: GroupService,
              private auth: AuthService,
              private router: Router) { };

  public ngOnInit() {
    this.userGroupId = sessionStorage.getItem('currentGroupId');
    if(this.userGroupId != null) {
      this.inscriptionForm.patchValue({group: 'Valide'});
    }
    this.groupService.getGroups().subscribe(groups => {
      for(let group of groups){
        this.groups.push(this.groupService.parseGroup(group));
      }
      this.groupNames = groups
        .filter((group: { nomGroupe: undefined; }) => group.nomGroupe !== undefined)
        .map((group: { nomGroupe: any; }) => group.nomGroupe!);
    });
  }

  submit(): boolean {
    if(this.inscriptionForm && this.inscriptionForm.valid) {
      const email = this.inscriptionForm.get('email')?.value;
      const number = this.inscriptionForm.get('address')?.get('number')?.value;
      const street = this.inscriptionForm.get('address')?.get('street')?.value;
      const cp = this.inscriptionForm.get('address')?.get('cp')?.value;
      const city = this.inscriptionForm.get('address')?.get('city')?.value;
      const firstname = this.inscriptionForm.get('firstName')?.value;
      const password = this.inscriptionForm.get('password')?.value;
      const name = this.inscriptionForm.get('lastName')?.value;
      const memberType = this.inscriptionForm.get('memberType')?.value;
      const groupName = this.inscriptionForm.get('group')?.value;
      let groupId = undefined;
      if(groupName) {
        if(this.userGroupId) {
          groupId = this.userGroupId;
        } else {
          groupId = this.groups.find((group) => group.name === groupName)?.id;
        }
      }
      if(email && number && street && city && cp && city && firstname && password && name && groupId && memberType) {
        this.memberService.signIn({
          address: {
            number: number,
            street: street,
            cp: cp,
            city: city,
          },
          city: city,
          email: email,
          firstname: firstname,
          password: password,
          name: name,
          groupId: groupId,
          memberType: memberType
        }).subscribe( member => {
            const email = member.email;
            const password = member.password;
            const lastName = member.nom;
            const firstName = member.prenom;
            if(email && password && lastName && firstName){
              this.eventUserCreated.emit({
                email: email,
                password: password,
                name: lastName,
                firstname: firstname
              });
            }
          }
        );
      }
      this.missGroup = false;
      return true;
    } else {
      if(this.inscriptionForm.get('group')?.value == '') {
        this.missGroup = true;
      }
      return false;
    }
  }

  reset() {
    this.inscriptionForm.reset();
  }

}
