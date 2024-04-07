import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { NewtransactionComponent } from '../newtransaction/newtransaction.component';
import { ViewtransactionComponent } from '../viewtransaction/viewtransaction.component';
import { DistributionService } from '../../services/distribution.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../../services/loader.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { debug } from 'util';

@Component({
  selector: 'app-distribution-list',
  templateUrl: './distribution-list.component.html',
  styleUrls: ['./distribution-list.component.css']
})
export class DistributionListComponent implements OnInit {

  distributionList = [];
  pageNumber: number = 0;
  p: number = 1;
  tserviceCode: any;
  constructor(private route: ActivatedRoute, private router: Router, private distributionService: DistributionService, public dialog: MatDialog, private toastr: ToastrService, private vRef: ViewContainerRef, private spinner: NgxSpinnerService, private loaderService: LoaderService) {
    //this.toastr.setRootViewContainerRef(vRef);
  }

  ngOnInit() {
    // get Transactions list data
    console.log(this.route.queryParams);
    console.log(this.route.snapshot.queryParams['sc']);
    this.tserviceCode = this.route.snapshot.queryParams['sc'] || null;
    console.log(this.tserviceCode);

    setTimeout(() => {
      this.loaderService.display(true);
      this.spinner.show();
      this.getAllTransaction(this.tserviceCode, this.pageNumber, 15, 'id', 'desc');
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
  getAllTransaction(service, page, size, sortBy, orderBy) {

    this.distributionService.getAllTransactionsBySorting(service, page, size, sortBy, orderBy).subscribe((data: any) => {
      console.log(data);
      //debugger;

      this.distributionList = data;
      this.loaderService.display(false);
      this.spinner.hide();

    }, err => {

      this.toastr.error(err, 'Error!');
      this.loaderService.display(false);
      this.spinner.hide();
    });
  }

  newTransactionDialog() {
    let dialogRef = this.dialog.open(NewtransactionComponent, {
      disableClose: true, data: { serviceCode: this.tserviceCode },
      height: '400px',
      width: '555px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loaderService.display(true);
        this.spinner.show();
        this.distributionService.createTransaction(result).subscribe((res: any) => {
          this.toastr.success(res.message, 'Success!');
          // this.getAllTransaction();
          this.p = 1;
          this.getAllTransaction(this.tserviceCode, 0, 15, 'id', 'desc');
        }, err => {

          this.toastr.error(err, 'Error!');
          this.loaderService.display(false);
          this.spinner.hide();
        });
      }

    });
  }

  viewTransactionDialog(item) {
    this.dialog.open(ViewtransactionComponent, {
      disableClose: true, data: { transactionId: item.id },
      height: '550px',
      width: '800px',
    });

  }

  refeshTransaction() {
    this.loaderService.display(true);
    this.spinner.show();
    this.getAllTransaction(this.tserviceCode, this.pageNumber, 15, 'id', 'desc');
  }
  pageChanged(ev) {
    this.p = ev;
    this.loaderService.display(true);
    this.spinner.show();
    this.pageNumber = ev - 1;
    this.getAllTransaction(this.tserviceCode, this.pageNumber, 15, 'id', 'desc');


  }
}
