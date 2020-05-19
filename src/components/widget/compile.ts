import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { WidgetModule } from './widget.module';

platformBrowserDynamic()
  .bootstrapModule(WidgetModule)
  .catch((err) => console.error(err));
