import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { WidgetComponent } from './widget.component';
import { PushPipe } from '../../push.pipe';

@NgModule({
  declarations: [
    WidgetComponent,
    PushPipe,
  ],
  imports: [
    BrowserModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [PushPipe],
  entryComponents: [WidgetComponent],
})

export class WidgetModule {
  constructor(private injector: Injector) {
    const widgetElement = createCustomElement(WidgetComponent, { injector: this.injector});
    customElements.define('mfe-widget', widgetElement);
  }

  ngDoBootstrap() {}
}
