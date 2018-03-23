import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ToolbarService {

  private componentToLoad: Subject<any> = new Subject();

  constructor() { }

  getToolbarComponentToLoad(): Observable<any> {
    return this.componentToLoad.asObservable();
  }

  setComponentToLoad(component: any): void {
    this.componentToLoad.next(component);
  }
}
