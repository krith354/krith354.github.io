import { Component, OnInit } from '@angular/core';
import { ShareStateService } from 'src/app/services/share-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'portfolio';
  showing: boolean;
  game: boolean;

  constructor(private ss: ShareStateService) { }

  ngOnInit() {
    this.ss.embeddedState.subscribe(state => this.showing = state);
    this.ss.gameState.subscribe(state => this.game = state);
  }

  show() {
    this.ss.toggleEmbedded();
  }

  showGame() {
    this.ss.toggleGame();
  }
}
