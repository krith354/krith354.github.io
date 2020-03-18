import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareStateService {

  constructor() { }

  embedded = new BehaviorSubject<boolean>(false);
  embeddedState = this.embedded.asObservable();
  
  public toggleEmbedded() {
    this.embedded.next(!this.embedded.value);
  }
}
