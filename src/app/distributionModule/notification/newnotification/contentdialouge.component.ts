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


@Component({
  selector: 'app-contentdialouge',
  templateUrl: './contentdialouge.component.html',
  styleUrls: ['./contentdialouge.component.css']
})
export class ContentdialougeComponent implements OnInit {

  serviceNames: any;
  totalElements: any;
  size: number;
  selectedService: string;
  displayData = [];
  pageNumber: number = 0;
  p: number = 1;

  constructor(
    @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private router: Router,
    private dialogRef: MatDialogRef<ContentdialougeComponent>,
    private formBuilder: FormBuilder, private demoserviceServic: DemoserviceService,
    private notificationService: NotificationService, vRef: ViewContainerRef, public dialog: MatDialog, private loaderService: LoaderService) { }

  ngOnInit() {
    console.log(this.dialogData);
    this.selectedService = this.dialogData.service;
    var startp = this.pageNumber * 15;
    var endp = startp + 15;
    this.getAllTransaction(startp, endp, this.pageNumber, 15, this.selectedService);
  }



  getAllTransaction(st, end, page, size, service) {

    var result = {
      "endLimit": end,
      "itemFlag": this.dialogData.item,
      "search": "",
      "sectionId": 0,
      "service": service,
      "startLimit": st,
      "page": page,
      "size": size
    };
    this.notificationService.getContent(result).subscribe((data: any) => {


      console.log(data);
      //debugger;
      this.displayData = data;
      var totlElements = data.page.total;
      var tmpSize = data.page.size;
      this.totalElements = totlElements;
      this.size = tmpSize;
      this.loaderService.display(false);

    }, err => {

      //this.toastr.error(err, 'Error!');
      this.loaderService.display(false);
    });
  }

  searchitem(query) {
    var req = {
      "endLimit": 15,
      "itemFlag": this.dialogData.item,
      "search": query,
      "sectionId": 0,
      "service": this.selectedService,
      "startLimit": 0,
      "page": 0,
      "size": 15
    };
    this.notificationService.getContent(req).subscribe((data: any) => {

      console.log(data);
      //debugger;
      this.displayData = data;
      var totlElements = data.page.total;
      var tmpSize = data.page.size;
      this.totalElements = totlElements;
      this.size = tmpSize;
      this.loaderService.display(false);

    }, err => {

      //this.toastr.error(err, 'Error!');
      this.loaderService.display(false);
    });

    
  }

  selectedContent(item) {
    console.log(item);
    this.dialogRef.close(item);
  }  

  pageChanged(ev) {
    this.p = ev;
    this.loaderService.display(true);
    this.pageNumber = ev - 1;
    var startp = this.pageNumber * 15;
    var endp = startp + 15;
    this.getAllTransaction(startp, endp, this.pageNumber, 15, this.selectedService);
    //this.getAllTransaction(this.pageNumber, 15, 'id', 'desc');
  }

}
