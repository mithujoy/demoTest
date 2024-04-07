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
  selector: 'app-repeatnotification',
  templateUrl: './repeatnotification.component.html',
  styleUrls: ['./repeatnotification.component.css']
})
export class RepeatnotificationComponent implements OnInit {

  public dateTime: Date = new Date();

  notificationFrom: FormGroup;
  displayDataSelection = [];
  delItem: object;
  viewItm: object;
  // finalDisplayData=[];
  confirmMessage: string;
  private displayData: Array<Object> = [];
  osVersions = [];
  appVersions = [];
  appVersionsIOS = [];
  serviceNames: any;
  selectedService: string;
  selectedSection: Number;
  selectedCountry: number;
  selectedDevice: string;
  selectedAppVersion: string;
  selectedOsVersion: string;
  selectedUserType: string;
  selectedContentScreen: number;
  selectedImageType: number;
  deviceNames: any;
  userTypes: any;
  appVersionData: any;
  osVersionData: any;
  notificationItems: any;
  imgPath: any;

  selected: any;
  selectedOs: any;
  sectionName: any;
  countryNames: Countries[];
  sowContainer: boolean = false;
  showSavePostion: boolean = false;
  showCountry: boolean = false;
  browseStatus: boolean = true;
  validTextFileStatus: boolean = true;
  browseFileData = [];
  selectedFiles: FileList;
  currentFileUpload: File;

  constructor(
    @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private dialogRef: MatDialogRef<RepeatnotificationComponent>,
    private formBuilder: FormBuilder, private demoserviceServic: DemoserviceService,
    private notificationService: NotificationService, private spinner: NgxSpinnerService) {

    //this.toastr.setRootViewContainerRef(vRef);
    this.notificationFrom = this.formBuilder.group({
      'userType': [null, [Validators.required]],
      'deviceName': [['All'], [Validators.required]],
      'osVersion': [['All'], [Validators.required]],
      'appVersion': [['All'], [Validators.required]],
      'campaign': [null],
      'message': [null, [Validators.required]],
      'notificationItem': [null, [Validators.required]],
      'notificationId': [null],
      'imgPath': [null],
      'dateTime': [null, [Validators.required]]

    });
  }

  ngOnInit() {
    console.log(this.dialogData);
    this.notificationFrom.controls['userType'].setValue(this.dialogData._notificationData.userType);
    this.notificationFrom.controls['deviceName'].setValue(this.dialogData._notificationData.device);
    this.notificationFrom.controls['osVersion'].setValue(this.dialogData._notificationData.osVersion);
    this.notificationFrom.controls['appVersion'].setValue(this.dialogData._notificationData.appVersion);
    this.notificationFrom.controls['campaign'].setValue(this.dialogData._notificationData.caimpainName);
    this.notificationFrom.controls['message'].setValue(this.dialogData._notificationData.message);
    this.notificationFrom.controls['notificationItem'].setValue(this.dialogData._notificationData.notificationType.typeName);
    this.notificationFrom.controls['notificationId'].setValue(this.dialogData._notificationData.notificationType.id);
    this.notificationFrom.controls['imgPath'].setValue(this.dialogData._notificationData.imagePath);
    //this.notificationFrom.controls['dateTime'].setValue(this.dateTime);      
  }

  onSubmit(form: NgForm) {
    this.spinner.show();
    console.log(form);

    /* var setNotification = {
      "userType": form.value.userType,
      "device": form.value.deviceName,
      "appVersion": form.value.appVersion,
      "osVersion": form.value.osVersion,
      "imagePath": form.value.imgPath,
      "notificationId": form.value.notificationId,
      "message": form.value.message,
      "caimpainName": form.value.campaign,
      "datetime": this.dateTime.toLocaleString(),
      "forUser": "No",
      "mobileNumber": "NA",
      "country": []
    } */

    var setNotification = {

      "notificationId": this.dialogData._notificationData.id,
      "datetime": this.dateTime.toLocaleString()
    }

    /* if (form.value.appVersion == '') {
      setNotification.appVersion = 'All';
    }
    if (form.value.osVersion == '') {
      setNotification.osVersion = 'All';
    }
    if ((form.value.imgPath == '') || (form.value.imgPath == undefined)) {
      setNotification.imagePath = 'NA';
    } */

    console.log(setNotification);
    //debugger;
    this.dialogRef.close(setNotification);
  }

}
