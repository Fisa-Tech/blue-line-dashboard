import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Material} from "../../../models/material.model";
import {NgForOf} from "@angular/common";
import {MaterialService} from "../../../services/material.service";
import {Member} from "../../../models/member.model";
import {UserService} from "../../../services/user-service";

@Component({
  selector: 'app-order-material',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './order-material.component.html',
  styleUrl: './order-material.component.scss'
})
export class OrderMaterialComponent implements OnInit{

  @Input() products!: Material[];
  @Input() totalPrice!: number;
  @Output() eventOrdered = new EventEmitter<void>();
  activeMember!: Member;

  constructor(private materialService: MaterialService,
              private memberService: UserService) {
  }

  public ngOnInit() {
    const groupId = sessionStorage.getItem('currentGroupId');
    /*if(groupId != null) {
      this.memberService.getMembers(groupId).subscribe((members) => {
        for(let rawMember of members){
          const member: Member = this.memberService.parseMember(rawMember);
          if(member.memberType === 'Actif') {
            this.activeMember = member;
            break;
          }
        }
      });
    }*/
  }

  submitOrder() {
    const clientName = sessionStorage.getItem('currentMemberName');
    const clientId = sessionStorage.getItem('currentUserId');
    const currentDate: Date = new Date();
    const isoDateString = currentDate.toISOString();

    if(clientName && clientId) {
      this.materialService.orderMaterial({
        clientName: clientName,
        activeName: this.activeMember.name,
        date: isoDateString,
        totalPrice: this.totalPrice,
        materialIds: this.products
          .filter(product => product.id !== undefined && product.id !== null)
          .map(product => product.id!),
        clientId: clientId,
        activeId: this.activeMember.id
      }).subscribe( order => {
          this.eventOrdered.emit();
        });
    }
  }

}
