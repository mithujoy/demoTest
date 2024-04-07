import { Component, OnInit, ViewChild, Inject, ViewContainerRef, OnDestroy } from '@angular/core';
import { DemoserviceService } from '../../../services/demoservice.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogRef } from '@angular/material';
import { NotificationService } from '../../services/notification.service';
import { Countries } from '../../models/refreshmentModel';
import { LoaderService } from '../../../services/loader.service';
import { FormBuilder, Validators, NgForm, FormGroup, FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-viewnotification',
  templateUrl: './viewnotification.component.html',
  styleUrls: ['./viewnotification.component.css']
})
export class ViewnotificationComponent implements OnInit {
  showLoader: boolean = true;
  displayData: any;
  date: Date = new Date();
  settings = {
    bigBanner: true,
    timePicker: true,
    format: 'dd-MM-yyyy hh:mm',
    defaultOpen: false
  }

  constructor(@Inject(MAT_DIALOG_DATA) private dialogData: any,
    private dialogRef: MatDialogRef<ViewnotificationComponent>,
    private formBuilder: FormBuilder, private demoserviceServic: DemoserviceService,
    private notificationService: NotificationService, private loaderService: LoaderService) { }

  ngOnInit() {

    this.notificationService.getNotificationinfo(this.dialogData.service, this.dialogData.notificationId).subscribe(data => {
      console.log(data);
      this.displayData = data;
      this.showLoader = false;
    }, err => {
      console.log(err);
    });

  }

}