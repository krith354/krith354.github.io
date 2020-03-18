import { Component, OnInit } from '@angular/core';
import { ShareStateService } from 'src/app/services/share-state.service';

@Component({
  selector: 'app-embedded',
  templateUrl: './embedded.component.html',
  styleUrls: ['./embedded.component.css']
})
export class EmbeddedComponent implements OnInit {

  constructor(private ss: ShareStateService) { }

  ngOnInit(): void {
  }

  back() {
    this.ss.toggleEmbedded();
  }

}
