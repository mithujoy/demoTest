import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { NewnotificationComponent } from '../newnotification/newnotification.component';
import { RepeatnotificationComponent } from '../repeatnotification/repeatnotification.component';
import { ViewnotificationComponent } from '../viewnotification/viewnotification.component';
import { DistributionService } from '../../services/distribution.service';
import { NotificationService } from '../../services/notification.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../../services/loader.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {

  serviceNames: any;
  totalElements: any;
  size: number;
  selectedService: string;
  distributionList = [];
  pageNumber: number = 0;
  p: number = 1;
  tserviceCode: any;
  constructor(private route: ActivatedRoute, private router: Router, private distributionService: DistributionService, private notificationService: NotificationService, public dialog: MatDialog, private toastr: ToastrService, private vRef: ViewContainerRef, private spinner: NgxSpinnerService, private loaderService: LoaderService) {
    //this.toastr.setRootViewContainerRef(vRef);
  }

  ngOnInit() {

    /*     this.notificationService.getAllService().subscribe(data => {
    
          this.serviceNames = data;
          this.loaderService.display(false);
    
        }, err => {
          console.log(err);
        }); */

    console.log(this.route.queryParams);
    console.log(this.route.snapshot.queryParams['sc']);
    this.tserviceCode = this.route.snapshot.queryParams['sc'] || null;
    console.log(this.tserviceCode);
    // if (this.tserviceCode == null) {
    //   this.notificationService.getAllService().subscribe(data => {

    //     this.serviceNames = data;
    //     this.loaderService.display(false);

    //   }, err => {
    //     console.log(err);
    //   });
    // } else {
    //   var newService = [{
    //     "service": this.tserviceCode,
    //     "serviceCode": this.tserviceCode,
    //     "description": this.tserviceCode
    //   }]
    //   this.serviceNames = data;
    //   this.selectedService = this.tserviceCode; 
    //   this.getCountry(this.selectedService);
    // }

    // get Transactions list data

    this.notificationService.getAllService().subscribe(data => {

      this.serviceNames = data;
      this.loaderService.display(false);

    }, err => {
      console.log(err);
    });
    if (this.tserviceCode == null) {
      this.selectedService = '';
    } else {
      this.selectedService = this.tserviceCode;
      this.getCountry(this.selectedService);
    }

  }

  getCountry(selectedService) {

    setTimeout(() => {
      //this.loaderService.display(true);
      this.spinner.show();
      var startp = this.pageNumber * 15;
      var endp = startp + 15;
      this.getAllTransaction(startp, endp, this.pageNumber, 15, selectedService);
    }, 0);
  }

  getAllTransaction1() {

    this.distributionService.getAllTransactions().subscribe(data => {
      this.distributionList = data;
      this.loaderService.display(false);
      this.spinner.hide();

    }, err => {

      this.toastr.error(err, 'Error!');
      this.loaderService.display(false);
      this.spinner.hide();
    });
  }
  getAllTransaction(st, end, page, size, selectedService) {

    this.notificationService.getAllNotificationsBySorting(st, end, page, size, selectedService).subscribe((data: any) => {

      this.distributionList = data;
      var totlElements = data.page.total;
      var tmpSize = data.page.size;
      this.totalElements = totlElements;
      this.size = tmpSize;
      this.loaderService.display(false);
      this.spinner.hide();

    }, err => {

      this.toastr.error(err, 'Error!');
      this.loaderService.display(false);
      this.spinner.hide();
    });
  }

  newNotification() {
    this.router.navigate(['newnotification'], { queryParams: { sc: this.selectedService } });
  }

  newNotificationDialog() {

    //this.loaderService.display(true);
    let dialogRef = this.dialog.open(NewnotificationComponent, {
      disableClose: true,
      height: '650px',
      width: '755px',
      data: { service: this.selectedService }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loaderService.display(true);
        this.spinner.show();
        this.notificationService.setNotificationItems(result, this.selectedService).subscribe((res: any) => {
          this.toastr.success(res.message, 'Success!');
          // this.getAllTransaction();
          this.p = 1;
          var startp = this.pageNumber * 15;
          var endp = startp + 15;
          this.getAllTransaction(startp, endp, this.pageNumber, 15, this.selectedService);
          //this.getAllTransaction(0, 15, 'id', 'desc', this.selectedService);
        }, err => {

          this.toastr.error(err, 'Error!');
          this.loaderService.display(false);
        });
      }

    });
  }

  editNotificationDialog(item) {
    console.log(item);
    //this.loaderService.display(true);
    let dialogRef = this.dialog.open(RepeatnotificationComponent, {
      disableClose: true,
      height: '550px',
      width: '755px',
      data: { _notificationData: item, service: this.selectedService }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loaderService.display(true);
        this.notificationService.repeatNotificationItems(result, this.selectedService).subscribe((res: any) => {
          this.toastr.success(res.message, 'Success!');
          // this.getAllTransaction();
          this.p = 1;
          var startp = this.pageNumber * 15;
          var endp = startp + 15;
          this.getAllTransaction(startp, endp, this.pageNumber, 15, this.selectedService);
          //this.getAllTransaction(0, 15, 'id', 'desc', this.selectedService);
        }, err => {

          this.toastr.error(err, 'Error!');
          this.loaderService.display(false);
        });
      }

    });

  }

  viewNotificationDialog(item) {
    this.dialog.open(ViewnotificationComponent, {
      disableClose: true, data: { notificationId: item.id, service: this.selectedService },
      height: 'auto',
      width: '800px',
    });

  }

  refeshTransaction() {
    this.spinner.show();
    var startp = this.pageNumber * 15;
    var endp = startp + 15;
    this.getAllTransaction(startp, endp, this.pageNumber, 15, this.selectedService);
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
