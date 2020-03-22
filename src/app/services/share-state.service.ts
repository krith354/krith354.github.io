import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareStateService {

  constructor() { }

  embedded = new BehaviorSubject<boolean>(false);
  embeddedState = this.embedded.asObservable();

  game = new BehaviorSubject<boolean>(false);
  gameState = this.game.asObservable();

  public toggleEmbedded() {
    this.embedded.next(!this.embedded.value);
  }

  public toggleGame() {
    this.game.next(!this.game.value);
  }
}
