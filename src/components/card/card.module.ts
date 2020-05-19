import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { CardComponent } from './card.component';

@NgModule({
  declarations: [
    CardComponent
  ],
  imports: [
    BrowserModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  entryComponents: [CardComponent],
})

export class CardModule {
  constructor(private injector: Injector) {
    const cardElement = createCustomElement(CardComponent, { injector: this.injector});
    customElements.define('mfe-card', cardElement);
  }

  ngDoBootstrap() {}
}
