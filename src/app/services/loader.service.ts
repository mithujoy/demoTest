import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable()
export class LoaderService {
    public status: BehaviorSubject<any> = new BehaviorSubject<any>(false);

  constructor() { }
   display(value: any) {
        this.status.next(value);
    }

}
