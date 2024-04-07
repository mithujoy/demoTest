import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { GlobalService } from '../../config/global.service';

@Injectable()
export class NotificationService {
  private baseUrl = '';
  private headers: any;

  constructor(private http: HttpClient, private globalService: GlobalService) {

    this.headers = new HttpHeaders({ 'Content-Type': 'multipart/form-data' });
    // this.bufferHeader = new Headers({ 'Content-Type': 'arraybuffer' });
    this.baseUrl = globalService.apiNotificationAddress;
    console.log(this.baseUrl);
  }

  getAllService(): Observable<Response> {
    var url = `${this.baseUrl}/getServices/`;
    return this.http.get(url)
      .pipe(map((res: Response) => res),
        catchError((error: any) => { return throwError(error || 'Server Error') }))
  }

  getAllNotificationsBySorting(strt, end, page, size, service): Observable<any> {
    if (service === 'Safaricom_Beatz') {
      this.baseUrl = this.globalService.apiNotificationAddressBeatz;
    } else {
      this.baseUrl = this.globalService.apiNotificationAddress;
    }
    return this.http.get(`${this.baseUrl}/getScheduledNotification/${service}/${strt}/${end}/${page}/${size}`)
      .pipe(map((res: Response) => res),
        catchError((error: any) => throwError(error.error || 'Server error')));
  }


  pushFileToStorage(file: File, service): Observable<any> {
    if (service === 'Safaricom_Beatz') this.baseUrl = this.globalService.apiNotificationAddressBeatz;
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const url = `${this.baseUrl}/uploadImage/${service}`;
    return this.http.post(`${url}`, formdata)
      .pipe(map((res: Response) => res),
        catchError((error: any) => throwError(error || 'server error')));

  }

  getContainerItems(service): Observable<Response> {
    if (service === 'Safaricom_Beatz') this.baseUrl = this.globalService.apiNotificationAddressBeatz;
    return this.http.get(`${this.baseUrl}/getCatagory/${service}`)
      .pipe(map((res: Response) => res),
        catchError((error: any) => throwError(error || 'Server error')));
  }

  getNotificationItems(service): Observable<Response> {
    if (service === 'Safaricom_Beatz') this.baseUrl = this.globalService.apiNotificationAddressBeatz;
    return this.http.get(`${this.baseUrl}/getAllNotificationType/${service}`)
      .pipe(map((res: Response) => res),
        catchError((error: any) => throwError(error || 'Server error')));
  }

  setNotificationItems(result, service): Observable<Response> {
    if (service === 'Safaricom_Beatz') this.baseUrl = this.globalService.apiNotificationAddressBeatz;
    return this.http.post(`${this.baseUrl}/setNotification/${service}`, result)
      .pipe(map((res: Response) => res),
        catchError((error: any) => throwError(error || 'Server error')));
  }

  getNotificationinfo(service, id): Observable<Response> {
    if (service === 'Safaricom_Beatz') this.baseUrl = this.globalService.apiNotificationAddressBeatz;
    return this.http.get(`${this.baseUrl}/getDashBoardCount/${service}/${id}`)
      .pipe(map((res: Response) => res),
        catchError((error: any) => throwError(error || 'Server error')));
  }
  getContent(result): Observable<Response> {
    if (result.service === 'Safaricom_Beatz') this.baseUrl = this.globalService.apiNotificationAddressBeatz;
    //console.log(result);
    return this.http.post(`${this.baseUrl}/Search`, result)
      .pipe(map((res: Response) => res),
        catchError((error: any) => throwError(error || 'Server error')));
  }

  repeatNotificationItems(result, service): Observable<Response> {
    if (service === 'Safaricom_Beatz') this.baseUrl = this.globalService.apiNotificationAddressBeatz;
    return this.http.post(`${this.baseUrl}/repeatNotification/${service}`, result)
      .pipe(map((res: Response) => res),
        catchError((error: any) => throwError(error || 'Server error')));
  }

}
