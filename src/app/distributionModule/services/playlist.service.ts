import { Injectable } from '@angular/core';
import { SearchItems } from '../../models/loginModel';
import { Countries } from '../models/playlistModel'
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { GlobalService } from '../../config/global.service';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class PlaylistService {
  private baseUrl = '';
  private headers: any;
  constructor(private http: HttpClient, private globalService: GlobalService) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.baseUrl = globalService.apiBaseAddress;
    console.log(this.baseUrl);
  }

  getAllCountries(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAllCountryName`)
      .pipe(map((res: Response) => res),
      catchError((error: any) => throwError(error || 'Server error')));
  }

  getplayListType(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getplayListType`)
      .pipe(map((res: Response) => res),
      catchError((error: any) => throwError(error || 'Server error')));
  }

  getSearchItem(searchItems: SearchItems): Observable<any> {
    const url = `${this.baseUrl}/searchPlayList`;
    return this.http.post(`${url}`, JSON.stringify(searchItems), { headers: this.headers })
      .pipe(map((res: Response) => res),
      catchError((error: any) => throwError( error || 'server error')));
  }

  getPlayListinfo(service, id): Observable<any> {
    return this.http.get(`${this.baseUrl}/getPlayListinfo/${service}/${id}`)
      .pipe(map((res: Response) => res),
      catchError((error: any) => throwError(error || 'Server error')));
  }

  insertPlayList(result,service): Observable<any> {
    const url =`${this.baseUrl}/insertPlayList/${service}`;
    return this.http.post(`${url}`, JSON.stringify(result), { headers: this.headers })
      .pipe(map((res: Response) => res),
      catchError((error: any) => throwError(error || 'Server error')));
  }  

  updatePlayList(service,poditionData): Observable<any> {
    const url = `${this.baseUrl}/updatePlayList/${service}`;
    return this.http.post(`${url}`, JSON.stringify(poditionData), { headers: this.headers })
    .pipe(map((res: Response) => res.json()),
    catchError((error: any) => throwError(error || 'server error')));
  }

  //constructor() { }

}