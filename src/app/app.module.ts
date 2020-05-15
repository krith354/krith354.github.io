import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EmbeddedComponent } from './experience/embedded/embedded.component';
import { GameComponent } from './game/game/game.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    EmbeddedComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
