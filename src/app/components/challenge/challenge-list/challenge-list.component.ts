import {Component, OnInit, ViewChild} from '@angular/core';
import {AddMaterialComponent} from "../../material/add-material/add-material.component";
import {AutoFocusModule} from "primeng/autofocus";
import {ButtonModule} from "primeng/button";
import {DatePipe, NgForOf, NgIf, NgStyle} from "@angular/common";
import {DialogModule} from "primeng/dialog";
import {EditMaterialComponent} from "../../material/edit-material/edit-material.component";
import {MenuComponent} from "../../menu/menu.component";
import {RemoveMaterialComponent} from "../../material/remove-material/remove-material.component";
import {RippleModule} from "primeng/ripple";
import {MessageService, SharedModule} from "primeng/api";
import {Table, TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {OrderMaterialComponent} from "../../material/order-material/order-material.component";
import {MyEvent} from "../../../models/myEvent.model";
import {UtilsService} from "../../../services/utils-service";
import {Challenge, ChallengeResponse} from "../../../models/challenge.model";
import {ChallengeService} from "../../../services/challenge-service";
import {AddChallengeComponent} from "../add-challenge/add-challenge.component";

@Component({
  selector: 'app-challenge-list',
  standalone: true,
  imports: [
    AddMaterialComponent,
    AutoFocusModule,
    ButtonModule,
    DatePipe,
    DialogModule,
    EditMaterialComponent,
    MenuComponent,
    NgForOf,
    NgIf,
    RemoveMaterialComponent,
    RippleModule,
    SharedModule,
    TableModule,
    ToastModule,
    NgStyle,
    AddChallengeComponent
  ],
  templateUrl: './challenge-list.component.html',
  styleUrl: './challenge-list.component.scss',
  providers: [MessageService],
})
export class ChallengeListComponent implements OnInit{

  @ViewChild('dt') dataTable?: Table
  @ViewChild('addChallengeForm', {read: AddChallengeComponent}) addChallengeForm?: AddChallengeComponent;
  @ViewChild('orderMaterialComponent', {read: OrderMaterialComponent}) orderMaterialComponent?: OrderMaterialComponent;
  challenges : Challenge[] = [];
  loading: boolean = true;
  columns: any[] = []
  selectedChallenge?: Challenge;
  isEditionDialogOpen = false;
  isDeletionDialogOpen = false;
  isShopDialogOpen = false;
  isAddDialogOpen = false;

  constructor(private challengeService: ChallengeService,
              private messageService: MessageService,
              private utilsService: UtilsService) {}

  ngOnInit() {
    this.columns = [
      { field: 'name', header: 'Nom', pSortableColumn: 'name', frozen: true },
      { field: 'description', header: 'Description', pSortableColumn: 'description'},
      { field: 'startDate', header: 'Date de début', pSortableColumn: 'startDate'},
      { field: 'endDate', header: 'Date de fin', pSortableColumn: 'endDate'},
      { field: 'type', header: 'Type de challenge', pSortableColumn: 'type'},
      { field: 'buttons', header: '', visible: true}
    ];
    this.loadChallenge();
  }

  loadChallenge() {
    this.challenges = [];
    this.challengeService.getChallenges().subscribe(challenges => {
      for(let challenge of challenges) {
        this.challenges.push(this.parseChallenge(challenge));
      }
      this.loading = false;
      this.dataTable?.reset();
    });

  }


  closeShopDialog() {
    this.isShopDialogOpen = false;
  }

  submitOrder() {
    this.isShopDialogOpen = false;
    this.orderMaterialComponent?.submitOrder();
  }

  validOrder() {
    this.loadChallenge();
    this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Ta commande est passée' });
  }

  validChallenge(challenge: Challenge) {
    this.loadChallenge();
    const message = 'Nouveau challenge: ' + challenge.name + ' créé';
    this.messageService.add({ severity: 'success', summary: 'Succès', detail: message });
  }

  openAddDialog() {
    this.isAddDialogOpen = true;
  }

  closeAddDialog() {
    this.isAddDialogOpen = false;
    this.addChallengeForm?.reset();
  }

  submitCreationForm() {
    if(this.addChallengeForm?.submit()) {
      this.isAddDialogOpen = false;
    }
  }

  openEditionDialog(event: MyEvent) {
    this.selectedChallenge = event;
    this.isEditionDialogOpen = true;
  }

  closeEditionDialog() {
    this.isEditionDialogOpen = false;
  }

  openDeletionDialog(event: MyEvent) {
    this.selectedChallenge = event;
    this.isDeletionDialogOpen = true;
  }

  closeDeletionDialog() {
    this.isDeletionDialogOpen = false;
  }


  resetChallenges() {
    this.dataTable?.reset();
    this.loadChallenge();
  }

  parseChallenge(challenge: ChallengeResponse): Challenge {
    return {
      id: challenge.id,
      name: challenge.name,
      description: challenge.description,
      startDate: this.utilsService.convertDateFormat(challenge.startDate!),
      endDate: this.utilsService.convertDateFormat(challenge.endDate!),
      type: challenge.type,
    }
  }
}
