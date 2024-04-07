import { Injectable } from '@angular/core';
import {
  DistributionServices, DistributionActions,
  DistributionSources, DistributionTypes, getAllTransactions, getByTransactionId
} from '../models/distributionModel';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { GlobalService } from '../../config/global.service';


@Injectable()
export class DistributionService {
  private baseUrl = '';
  private headers: any;
  // private bufferHeader: any;
  private setTransactionData: getByTransactionId[] = [];
  constructor(private http: HttpClient, private globalService: GlobalService) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // this.bufferHeader = new Headers({ 'Content-Type': 'arraybuffer' });
    this.baseUrl = globalService.apiDistributionAddress;
    console.log(this.baseUrl);
  }

  getDistributionService(typeId, categoryId): Observable<Response> {
    return this.http.get(`${this.baseUrl}/getServices/?typeId=${typeId}&categoryId=${categoryId}`)
      .pipe(map((res: Response) => res),
        catchError((error: any) => throwError(error || 'Server error')));
  }

  getDistributionActions(): Observable<DistributionActions[]> {
    return this.http.get(`${this.baseUrl}/getDistributionActions/`)
      .pipe(map((res: any) => res),
        catchError((error: any) => throwError(error || 'Server error')));
  }


  getDistributionSources(): Observable<DistributionSources[]> {
    return this.http.get(`${this.baseUrl}/getDistributionSources/`)
      .pipe(map((res: any) => res),
        catchError((error: any) => throwError(error || 'Server error')));
  }

  getDistributionTypes(): Observable<DistributionTypes[]> {
    return this.http.get(`${this.baseUrl}/getDistributionTypes/`)
      .pipe(map((res: any) => res),
        catchError((error: any) => throwError(error || 'Server error')));
  }
  getAllTransactions(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAllTransactions/`)
      .pipe(map((res: Response) => res),
        catchError((error: any) => throwError(error || 'Server error')));
  }
  // getAllTransactionsBySorting(page, size, sortBy, orderBy): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/getTransaction/?page=${page}&size=${size}&sort=${sortBy},${orderBy}`)
  //     .pipe(map((res: Response) => res.json())
  //     ,catchError((error: any) => Observable.throw(error.json().error || 'Server error')));
  // }

  getAllTransactionsBySorting(service, page, size, sortBy, orderBy): Observable<any> {
    if (service)
      var temp = 'getTransaction/mziiki';
    else
      var temp = 'getTransaction';
    return this.http.get(`${this.baseUrl}/${temp}/?page=${page}&size=${size}&sort=${sortBy},${orderBy}`)
      .pipe(map((res: Response) => res),
        catchError((error: any) => throwError(error || 'Server error')));
  }

  getByTransactionId(transactionId): Observable<any> {
    return this.http.get(`${this.baseUrl}/getByTransactionId/${transactionId}`)
      .pipe(map((res: Response) => {
        this.setTransactionDataById(res);
        return res;
      }),
        catchError((error: any) => throwError(error || 'Server error')));
  }
  setTransactionDataById(data) {
    this.setTransactionData = data;

  }

  getTransactionDataById() {
    return this.setTransactionData;
  }


  createTransaction(result): Observable<any> {
    const url = `${this.baseUrl}/createTransaction`;
    return this.http.post(`${url}`, JSON.stringify(result), { headers: this.headers }).
      pipe(map((res: Response) => res),
        catchError((error: any) => throwError(error || 'server error')));
  }


  /* downloadArtist(id): Observable<Response> {
   return this.http.get(`${this.baseUrl}/download/artists/${id}`, { responseType: 'blob' })
     // return this.http.get(`http://192.168.207.215:8081/distribution/download/artists/${id}`, {  responseType: ResponseContentType.Blob})
     .pipe(map((res: Response) => res),
       catchError((error: any) => throwError(error || 'server error')));
 } */
} 
