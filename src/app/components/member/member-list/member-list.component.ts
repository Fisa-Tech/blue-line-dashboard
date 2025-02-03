import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../../services/user-service";
import {Table, TableModule} from "primeng/table";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {RatingModule} from "primeng/rating";
import {TagModule} from "primeng/tag";
import { FormsModule } from '@angular/forms';
import {RippleModule} from "primeng/ripple";
import {ButtonModule} from "primeng/button";
import {StyleClassModule} from "primeng/styleclass";
import {AutoFocusModule} from "primeng/autofocus";
import {Member} from "../../../models/member.model";
import {MenuComponent} from "../../menu/menu.component";
import {RouterOutlet} from "@angular/router";
import {DialogModule} from "primeng/dialog";
import {EditMemberComponent} from "../edit-member/edit-member.component";
import {RemoveMemberComponent} from "../remove-member/remove-member.component";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [
    TableModule,
    CurrencyPipe,
    RatingModule,
    TagModule,
    FormsModule,
    NgForOf,
    NgIf,
    RippleModule,
    ButtonModule,
    StyleClassModule,
    AutoFocusModule,
    MenuComponent,
    RouterOutlet,
    DialogModule,
    EditMemberComponent,
    RemoveMemberComponent,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss'
})
export class MemberListComponent implements OnInit{

  @ViewChild('dt') dataTable?: Table
  members : Member[] = [];
  loading: boolean = true;
  columns: any[] = []
  selectedMember?: Member;
  isEditionDialogOpen = false;
  isDeletionDialogOpen = false;
  isInscriptionDialogOpen = false;

  constructor(private memberService: UserService,
              private messageService: MessageService) {}

  ngOnInit() {
    this.columns = [
      { field: 'name', header: 'Nom', pSortableColumn: 'name', visible: true, frozen: true },
      { field: 'firstname', header: 'Prénom', pSortableColumn: 'firstname', visible: true},
      { field: 'address', header: 'Adresse', pSortableColumn: 'address', visible: true},
      { field: 'number', header: 'Numéro', pSortableColumn: 'number', visible: false},
      { field: 'street', header: 'Rue', pSortableColumn: 'street', visible: false},
      { field: 'city', header: 'Ville', pSortableColumn: 'city', visible: false},
      { field: 'email', header: 'Email', pSortableColumn: 'email', visible: true},
      { field: 'buttons', header: '', visible: true}
    ];
    this.loadMembers();
  }

  loadMembers() {
    /*const groupId = sessionStorage.getItem('currentGroupId');
    if(groupId != null) {
      this.memberService.getMembers(groupId).subscribe((members) => {
        for(let rawMember of members){
          const member: Member = this.memberService.parseMember(rawMember);
          this.members.push({...member, city: member.address?.city})
        }
        this.loading = false;
        this.dataTable?.reset();
      });
    }*/
  }

  onSort(event: any) {
    this.members.sort((a, b) => {
      const field = event.field === 'address' ? 'city' : event.field;
      const value1 = a[field].toLowerCase();
      const value2 = b[field].toLowerCase();

      if (value1 === null || value1 === undefined) return 1;
      if (value2 === null || value2 === undefined) return -1;

      return (event.order * (value1 < value2 ? -1 : 1));
    });
  }

  validMemberInscription(member: Member) {
    this.loadMembers();
    const message = member.firstname + ' ' + member.name + ' a bien été ajouté';
    this.messageService.add({ severity: 'success', summary: 'Succès', detail: message });
  }

  openInscriptionDialog() {
    this.isInscriptionDialogOpen = true;
  }

  openEditionDialog(member: Member) {
    this.selectedMember = member;
    this.isEditionDialogOpen = true;
  }

  closeEditionDialog() {
    this.isEditionDialogOpen = false;
  }

  openDeletionDialog(member: Member) {
    this.selectedMember = member;
    this.isDeletionDialogOpen = true;
  }

  closeDeletionDialog() {
    this.isDeletionDialogOpen = false;
  }

}
