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

  constructor(private ss: ShareStateService) { }

  ngOnInit() {
    this.ss.embeddedState.subscribe(state => this.showing = state);
  }

  show() {
    this.ss.toggleEmbedded();
  }
}
