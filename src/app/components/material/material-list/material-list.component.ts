import {Component, OnInit, ViewChild} from '@angular/core';
import {MenuComponent} from "../../menu/menu.component";
import {AutoFocusModule} from "primeng/autofocus";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {EditMemberComponent} from "../../member/edit-member/edit-member.component";
import {DatePipe, NgForOf, NgIf, NgStyle} from "@angular/common";
import {RemoveMemberComponent} from "../../member/remove-member/remove-member.component";
import {RippleModule} from "primeng/ripple";
import {MessageService, SharedModule} from "primeng/api";
import {Table, TableModule} from "primeng/table";
import {Material} from "../../../models/material.model";
import {EventService} from "../../../services/event.service";
import {BadgeModule} from "primeng/badge";
import {EditMaterialComponent} from "../edit-material/edit-material.component";
import {RemoveMaterialComponent} from "../remove-material/remove-material.component";
import {AddMaterialComponent} from "../add-material/add-material.component";
import {OrderMaterialComponent} from "../order-material/order-material.component";
import { ToastModule } from 'primeng/toast';
import {MyEvent, MyEventResponse} from "../../../models/myEvent.model";
import {UtilsService} from "../../../services/utils-service";


@Component({
  selector: 'app-material-list',
  standalone: true,
  imports: [
    MenuComponent,
    AutoFocusModule,
    ButtonModule,
    DialogModule,
    EditMemberComponent,
    NgForOf,
    NgIf,
    RemoveMemberComponent,
    RippleModule,
    SharedModule,
    TableModule,
    BadgeModule,
    NgStyle,
    EditMaterialComponent,
    RemoveMaterialComponent,
    AddMaterialComponent,
    OrderMaterialComponent,
    ToastModule,
    DatePipe
  ],
  providers: [MessageService],
  templateUrl: './material-list.component.html',
  styleUrl: './material-list.component.scss'
})

export class MaterialListComponent implements OnInit{
  @ViewChild('dt') dataTable?: Table
  @ViewChild('addMaterialForm', {read: AddMaterialComponent}) addMaterialForm?: AddMaterialComponent;
  @ViewChild('orderMaterialComponent', {read: OrderMaterialComponent}) orderMaterialComponent?: OrderMaterialComponent;
  events : MyEvent[] = [];
  loading: boolean = true;
  columns: any[] = []
  selectedEvent?: MyEvent;
  isEditionDialogOpen = false;
  isDeletionDialogOpen = false;
  isShopDialogOpen = false;
  isAddDialogOpen = false;
  startDateFilter: string | null = null;
  endDateFilter: string | null = null;
  locationFilter: string | null = null;
  descriptionFilter: string | null = null;
  nameFilter: string | null = null;

  constructor(private eventService: EventService,
              private messageService: MessageService,
              private utilsService: UtilsService) {}

  ngOnInit() {
    this.columns = [
      { field: 'name', header: 'Nom', pSortableColumn: 'name', frozen: true },
      { field: 'location', header: 'Localisation', pSortableColumn: 'location'},
      { field: 'startDate', header: 'Date de début', pSortableColumn: 'startDate'},
      { field: 'endDate', header: 'Date de fin', pSortableColumn: 'endDate'},
      { field: 'description', header: 'Description', pSortableColumn: 'description'},
      { field: 'buttons', header: '', visible: true}
    ];
    this.loadEvents();
  }

  loadEvents() {
    this.events = [];
    this.eventService.getEvents().subscribe(events => {
      for(let event of events) {
        this.events.push(this.parseEvent(event));
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
    this.loadEvents();
    this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Ta commande est passée' });
  }

  validMaterial(event: MyEvent) {
    this.loadEvents();
    const message = 'Nouvel événement: ' + event.name + ' créé';
    this.messageService.add({ severity: 'success', summary: 'Succès', detail: message });
  }

  openAddDialog() {
    this.isAddDialogOpen = true;
  }

  closeAddDialog() {
    this.isAddDialogOpen = false;
    this.addMaterialForm?.reset();
  }

  submitCreationForm() {
    if(this.addMaterialForm?.submit()) {
      this.isAddDialogOpen = false;
    }
  }

  openEditionDialog(event: MyEvent) {
    this.selectedEvent = event;
    this.isEditionDialogOpen = true;
  }

  closeEditionDialog() {
    this.isEditionDialogOpen = false;
  }

  openDeletionDialog(event: MyEvent) {
    this.selectedEvent = event;
    this.isDeletionDialogOpen = true;
  }

  closeDeletionDialog() {
    this.isDeletionDialogOpen = false;
  }

  onFilter(event: any, filterType: string) {
    const value = event.target.value === '' ? null : event.target.value;
    if(filterType === 'name') {
      this.nameFilter = value;
    } else if(filterType === 'location') {
      this.locationFilter = value;
    } else if(filterType === 'description') {
      this.descriptionFilter = value;
    } else if(filterType === 'startDate') {
      this.startDateFilter = value;
    } else if(filterType === 'endDate') {
      this.endDateFilter = value;
    }
  }

  resetEvents() {
    this.endDateFilter = null;
    this.startDateFilter = null;
    this.nameFilter = null;
    this.locationFilter = null;
    this.descriptionFilter = null;
    this.dataTable?.reset();
    this.loadEvents();
  }

  parseEvent(event: MyEventResponse): MyEvent {
    return {
      id: event.id,
      name: event.name,
      description: event.description,
      startDate: this.utilsService.convertDateFormat(event.startDate!),
      endDate: this.utilsService.convertDateFormat(event.endDate!),
      location: event.location,
    }
  }

}
