import { Injectable } from '@angular/core';
import { GlobalService } from '../config/global.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Login, AllService, ContainerItems, SearchItems, CreateItem } from '../models/loginModel';
import { RefreshmentModel } from '../models/loginModel';
//import { Countries } from '../distributionModule/models/refreshmentModel';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable()
export class DemoserviceService {

  private baseUrl = '';
  private seobaseUrl = '';
  private header: HttpHeaders;

  constructor(private http: HttpClient, private globalConfig: GlobalService) {
    this.baseUrl = globalConfig.apiBaseAddress;
    this.seobaseUrl = globalConfig.apiSeocontentAddress;
    this.header = new HttpHeaders({ 'content-type': 'application/json' });
  }

  login(user: Login): Observable<Response> {
    return this.http.post(`${this.baseUrl}`, JSON.stringify(user), { headers: this.header }).
      pipe(map((res: Response) => res),
      catchError((error: any) => throwError(error || 'server error')));
  }

  getAllService(): Observable<any> {
    var url = `${this.baseUrl}/getServices/`;
    return this.http.get(url).
      pipe(map((res: Response) => res) ,
      catchError((error: any) => { 
        return throwError(error || 'Server Error')
      }
      ));
  }


  getSections(serviceName,countryId): Observable<any> {
    const url = `${this.baseUrl}/getSection/${serviceName}/${countryId}`;
    return this.http.get(url);
  }

  getContainerItems(serviceName, containerId): Observable<any> {
    const url = `${this.baseUrl}/getContainerItems/${serviceName}/${containerId}`;
    return this.http.get(url);
  }

  getSearchItem(searchItems: SearchItems): Observable<any> {
    const url = `${this.baseUrl}/Search`;
    return this.http.post(`${url}`, JSON.stringify(searchItems), { headers: this.header }).
      pipe(map((res: Response) => res),
      catchError((error: any) => throwError(error || 'server error')))
  }

  addNewItem(result): Observable<any> {
    const url = `${this.baseUrl}/addNewItems`;
    return this.http.post(`${url}`, JSON.stringify(result[0]), { headers: this.header }).
      pipe(map((res: Response) => res),
      catchError((error: any) => throwError(error || 'server error')));
  }

  deleteItem(result): Observable<any> {
    const url = `${this.baseUrl}/deletecontentitem`;
    return this.http.post(`${url}`, JSON.stringify(result[0]), { headers: this.header }).
      pipe(map((res: Response) => res),
      catchError((error: any) => throwError(error || 'server error')));
  }

  setContainerItemPosition(poditionData): Observable<any> {
    const url = `${this.baseUrl}/setContainerItemPosition`;
    return this.http.post(`${url}`, JSON.stringify(poditionData), { headers: this.header }).
      pipe(map((res: Response) => res),
      catchError((error: any) => throwError(error || 'server error')));
  }

   getCountries(service): Observable<any> {
    return this.http.get(`${this.baseUrl}/getCountry/${service}`);
  }

   getSeoContent(itemTypeId,evt): Observable<any> {
    return this.http.get(`${this.seobaseUrl}?itemTypeId=${itemTypeId}&evt=${evt}`)
      .pipe(map((res: Response) => res),
      catchError((error: any) => throwError(error || 'Server error')));
  }
}
