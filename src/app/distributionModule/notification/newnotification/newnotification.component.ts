import { Component, OnInit, ViewChild, Inject, ViewContainerRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DemoserviceService } from '../../../services/demoservice.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material';
import { NotificationService } from '../../services/notification.service';
import { Countries } from '../../models/refreshmentModel';
import { LoaderService } from '../../../services/loader.service';
import { FormBuilder, Validators, NgForm, FormGroup, FormControl } from '@angular/forms';
import { ContentdialougeComponent } from '../newnotification/contentdialouge.component';
import { from } from 'rxjs';

@Component({
  selector: 'app-newnotification',
  templateUrl: './newnotification.component.html',
  styleUrls: ['./newnotification.component.css']
})
export class NewnotificationComponent implements OnInit {
  public dateTime: Date = new Date();
  public min = new Date(Date.now() - 24 * 60 * 60 * 1000);
  notificationFrom: FormGroup;
  displayDataSelection = [];
  delItem: object;
  viewItm: object;
  itemFlag: any;
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
  showContentSelection: boolean = false;
  showUserSelection: boolean = false;
  showdateSelection: boolean = false;
  showImageupload: boolean = false;
  browseFileData = [];
  selectedFiles: FileList;
  currentFileUpload: File;
  tserviceCode: any;
  content: any;
  searchResponse: any;
  contentName: any;

  constructor(private route: ActivatedRoute, private router: Router,
    // @Inject(MAT_DIALOG_DATA) private dialogData: any,
    //private dialogRef: MatDialogRef<NewnotificationComponent>,
    private formBuilder: FormBuilder, private demoserviceServic: DemoserviceService,
    private notificationService: NotificationService, vRef: ViewContainerRef, public dialog: MatDialog, private loaderService: LoaderService) {

    // this.toastr.setRootViewContainerRef(vRef);
  }

  ngOnInit() {
    this.contentName = '';
    this.content = '';
    this.selected = 'Registere';
    this.selectedOs = 'All';
    this.notificationFrom = this.formBuilder.group({
      'userType': [null, [Validators.required]],
      'deviceName': [['All'], [Validators.required]],
      'osVersion': [['All'], [Validators.required]],
      'appVersion': [['All'], [Validators.required]],
      'campaign': [null],
      'message': [null, [Validators.required, Validators.maxLength(200)]],
      'notificationItem': [null, [Validators.required]],
      'imgPath': [null],
      'isSchedule': [null],
      'dateTime': [null, [Validators.required]],
      'notificationContent': [null],
      'imageType': [null, [Validators.required]],
      'forUser': [null],
      'mobileNumber': [null]
    });

    this.selectedDevice = 'All';
    this.selectedOsVersion = 'All';
    this.selectedAppVersion = 'All';
    this.selectedUserType = 'Register';
    this.selectedContentScreen = 1;
    this.selectedImageType = 1;
    this.tserviceCode = this.route.snapshot.queryParams['sc'] || null;
    this.displayContainerData(this.tserviceCode);
    //this.displayContainerData(this.dialogData.service);
    //   this.notificationService.getAllService().subscribe(data => {

    //   this.serviceNames = data;
    //   this.loaderService.display(false);

    // }, err => {
    //   console.log(err);
    // });

  }

  // get Countries

  /*  getCountry(selectedService) {
    this.loaderService.display(true);
    this.showCountry = false;
    this.selectedSection = null;
    this.selectedCountry = null;
    this.selectedService = selectedService;

    this.sowContainer = false;
    this.demoserviceServic.getCountries(selectedService).subscribe((res: Countries[]) => {
      this.countryNames = res;
      if (this.countryNames.length > 1) {
        this.showCountry = true;
        this.loaderService.display(false);
      }
      else if (this.countryNames.length == 0)
        this.loaderService.display(false);

      else {
        this.selectedCountry = this.countryNames[0].countryId;
        this.loaderService.display(false);
        this.displayContainerData(selectedService, this.countryNames[0].countryId)
        this.getNotifications(selectedService, this.countryNames[0].countryId);
      }
    }, err => {
      console.log(err);
    })

  }*/
  // get Section
  getNotifications(selectedService) {
    this.notificationService.getNotificationItems(selectedService).subscribe(data => {
      this.notificationItems = data;
      this.loaderService.display(false);
    }, err => {
      console.log(err);
    });
  }
  // Display Container Data
  displayContainerData(selectedService) {
    this.displayData = [];
    this.showSavePostion = false;
    // this.loaderService.display(true);
    this.notificationService.getContainerItems(selectedService).subscribe((res: any) => {
      console.log(res);
      this.displayData = res;
      var osVer = [];
      this.deviceNames = res.filter(item => item.audience === 'Device');
      this.deviceNames[0].subCatagory.unshift({ audience: "All", id: 1, seq: 0 });
      this.userTypes = res.filter(item => item.audience === 'UserType');
      // this.userTypes[0].subCatagory.unshift({audience: "All", id: 1, seq: 0});
      this.appVersions = res.filter(item => item.audience === 'App Version');
      this.osVersions = res.filter(item => item.audience === 'OS Version');
      console.log(this.deviceNames);
      console.log(this.userTypes);
      console.log(this.appVersions);
      console.log(this.osVersions);
      // if(this.displayData.length==0)
      this.getNotifications(selectedService);
      this.sowContainer = true;
      this.loaderService.display(false);

    });
  }

  displayOsVersionData(selectedDevice) {

    console.log(this.osVersions);
    console.log(this.appVersions);

    var test = [];
    var tempappVersions = [];
    test = this.osVersions;
    tempappVersions = this.appVersions;

    var osversions = test.map(officer => officer.subCatagory)[0]
      .filter(osvs => osvs.audience === selectedDevice)
      .map(osv => osv.subCatagory);
    // osversions[0].unshift({audience: "All", catagoryId: 1, id: 1, seq: 0});

    this.osVersionData = osversions[0];
    // this.osVersionData.unshift({audience: "All", catagoryId: 1, id: 1, seq: 0}); 
    console.log(osversions);

    var appversions = tempappVersions.map(officer => officer.subCatagory)[0]
      .filter(appvs => appvs.audience === selectedDevice)
      .map(appv => appv.subCatagory);
    console.log(appversions);
    // appversions[0].unshift({audience: "All", catagoryId: 1, id: 1, seq: 0});
    this.appVersionData = appversions[0];
    // this.appVersionData.unshift({audience: "All", catagoryId: 1, id: 1, seq: 0});
    // debugger;

  }

  // image upload handling
  openFile(event, selectedService) {
    this.selectedFiles = event.target.files;
    let input = event.target;
    this.browseFileData = [];
    this.validTextFileStatus = true;
    console.log(event.target.files[0].type);
    if (event.target.files[0].type === 'image/png' || event.target.files[0].type === 'image/jpeg') {
      console.log(event.target.files[0]);
      this.browseStatus = true;
      this.currentFileUpload = this.selectedFiles.item(0);
      this.notificationService.pushFileToStorage(this.currentFileUpload, this.tserviceCode).subscribe((res: any) => {
        console.log(res);
        this.imgPath = res.message;

      });
    } else {
      console.log('inside else');
      this.browseStatus = false;
    }

  }

  chooseContentData(nType) {
    console.log(nType);
    if ((nType == 4) || (nType == 5) || (nType == 6) || (nType == 7)) {
      console.log("Welcome");
      this.showContentSelection = true;
      //debugger;
      console.log(this.showContentSelection);


    } else {
      this.showContentSelection = false;
    }
  }

  contentDialog(test) {
    console.log(test);

    if (test == 4) {
      this.itemFlag = 1;
    } else if (test == 5) {
      this.itemFlag = 2;
    } else if (test == 6) {
      this.itemFlag = 3;
    } else if (test == 7) {
      this.itemFlag = 4;
    }

    console.log(this.itemFlag);

    let dialogRef = this.dialog.open(ContentdialougeComponent, {
      disableClose: true,
      height: 'auto',
      width: '800px',
      data: { service: this.tserviceCode, item: this.itemFlag }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.content = result;
      this.contentName = result.title;
    });
  }

  chooseContentImage(imgType) {
    console.log(imgType);

    if (imgType == 3) {
      this.showImageupload = true;
    }
    else {
      this.showImageupload = false;

    }

  }

  onChange(isChecked: boolean) {
    if (isChecked) {
      this.showUserSelection = true;
    }
    else {
      this.showUserSelection = false;

    }
  }

  onisScheduleChange(isChecked: boolean) {
    if (isChecked) {
      this.showdateSelection = true;
    }
    else {
      this.showdateSelection = false;

    }
  }

  onSubmit(form: NgForm) {
    this.loaderService.display(true);
    console.log(form);
    var setNotification: any;
    if (this.content === '') {
      setNotification = {
        "userType": form.value.userType,
        "device": form.value.deviceName,
        "appVersion": form.value.appVersion,
        "osVersion": form.value.osVersion,
        "imagePath": form.value.imgPath,
        "notificationId": form.value.notificationItem,
        "message": form.value.message,
        "caimpainName": form.value.campaign,
        "isSchedule": false,
        "datetime": this.dateTime.toLocaleString(),
        "forUser": "No",
        "mobileNumber": form.value.mobileNumber,
        "country": []
      };
    } else {

      setNotification = {
        "userType": form.value.userType,
        "device": form.value.deviceName,
        "appVersion": form.value.appVersion,
        "osVersion": form.value.osVersion,
        "imagePath": form.value.imgPath,
        "notificationId": form.value.notificationItem,
        "message": form.value.message,
        "caimpainName": form.value.campaign,
        "isSchedule": false,
        "datetime": this.dateTime.toLocaleString(),
        "forUser": "No",
        "mobileNumber": form.value.mobileNumber,
        "country": [],
        "searchResponse": {
          "id": this.content.id,
          "image_url": this.content.image_url,
          "itemTypeID": this.content.itemTypeID,
          "itemTypeName": this.content.itemTypeName,
          "msg": "",
          "name": this.content.name,
          "status": true,
          "title": this.content.title
        }
      };
      if (form.value.imageType == 1) {
        setNotification.searchResponse.image_url = 'NA';
      } else if (form.value.imageType == 3) {
        setNotification.searchResponse.image_url = form.value.imgPath;
      }
    }

    if (form.value.appVersion === '') {
      setNotification.appVersion = 'All';
    }
    if (form.value.osVersion === '') {
      setNotification.osVersion = 'All';
    }

    if ((form.value.isSchedule === false) || (form.value.isSchedule === null) || (form.value.isSchedule === undefined)) {
      setNotification.isSchedule = false;

    } else {
      setNotification.isSchedule = true;
      const sdate = new Date(form.value.dateTime);
      //setNotification.datetime = sdate.getTime();
      var mm = sdate.getMonth() + 1;
      if (mm < 10) { mm = 0 + mm }
      var dd = sdate.getDate();
      if (dd < 10) {
        dd = 0 + dd
        console.log(dd);

      }
      setNotification.datetime = sdate.getFullYear() + "-" + mm + "-" + dd + " " + sdate.getHours() + ":" + sdate.getMinutes() + ":" + sdate.getSeconds();
    }

    if (form.value.forUser === true) {
      setNotification.forUser = 'Yes';
    }
    if ((form.value.imgPath === '') || (form.value.imgPath === undefined) || (form.value.imgPath === null)) {
      setNotification.imagePath = 'NA';
    }

    console.log(setNotification);
    // const sdate = new Date(form.value.dateTime);
    //var ms = sdate.getTime();
    //console.log(ms);

    //debugger;
    //this.dialogRef.close(setNotification);
    this.notificationService.setNotificationItems(setNotification, this.tserviceCode).subscribe((res: any) => {
      // this.toastr.success(res.message, 'Success!');
      // this.getAllTransaction();
      this.router.navigate(['notification'], { queryParams: { sc: this.tserviceCode } });

    }, err => {
      // this.toastr.error(err, 'Error!');
      this.loaderService.display(false);
    });
  }

  closewindow() {
    this.router.navigate(['notification'], { queryParams: { sc: this.tserviceCode } });
  }

}
