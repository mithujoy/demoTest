import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgxSpinnerModule } from 'ngx-spinner';


import { DistributionRoutingModule, routedComponents } from './distribution-routing.module';

import {
  MatInputModule, MatSelectModule, MatButtonModule, MatDialogModule, MatProgressSpinnerModule,
  MatCardModule, MatToolbarModule, MatTooltipModule, MatPaginatorModule, MatCheckboxModule,
  MatRadioModule, MatIconModule, MatFormFieldModule
} from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { DemoserviceService } from '../services/demoservice.service';
import { GlobalService } from '../config/global.service';
import { DistributionService } from './services/distribution.service';
import { PlaylistService } from './services/playlist.service';
import { RefreshmentService } from './services/refreshment.service';
import { NotificationService } from './services/notification.service';
import { NewtransactionComponent } from './distribution/newtransaction/newtransaction.component';
import { ViewtransactionComponent } from './distribution/viewtransaction/viewtransaction.component';
import { DialogExampleComponent } from './refreshment/display-content/dialog-example.component';
import { ConfirmationDialogComponent } from './../public/confirmation-dialog/confirmation-dialog.component';
import { NewplaylistComponent } from './playlist/newplaylist/newplaylist.component';
import { NewnotificationComponent } from './notification/newnotification/newnotification.component';
import { ViewnotificationComponent } from './notification/viewnotification/viewnotification.component';
import { RepeatnotificationComponent } from './notification/repeatnotification/repeatnotification.component';
import { ContentdialougeComponent } from './notification/newnotification/contentdialouge.component'


@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgxPaginationModule, DistributionRoutingModule, CommonModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatDialogModule,
    MatProgressSpinnerModule, MatCardModule, MatToolbarModule,
    MatTooltipModule, MatPaginatorModule, MatCheckboxModule, MatRadioModule, MatIconModule,
    MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, OwlDateTimeModule, OwlNativeDateTimeModule,
    NgxSpinnerModule
  ],
  entryComponents: [NewtransactionComponent, ViewtransactionComponent, DialogExampleComponent, ConfirmationDialogComponent, NewplaylistComponent, NewnotificationComponent, RepeatnotificationComponent, ViewnotificationComponent, ContentdialougeComponent],
  declarations: [routedComponents, NewtransactionComponent, ViewtransactionComponent, DialogExampleComponent, ConfirmationDialogComponent, NewplaylistComponent, NewnotificationComponent, ViewnotificationComponent, RepeatnotificationComponent, ContentdialougeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MatDatepickerModule, DemoserviceService, GlobalService, DistributionService, PlaylistService, RefreshmentService, NotificationService]
})
export class DistributionModule { }
