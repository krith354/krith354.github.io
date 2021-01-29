import { Component, OnInit } from '@angular/core';
import { ShareStateService } from 'src/app/services/share-state.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {
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
