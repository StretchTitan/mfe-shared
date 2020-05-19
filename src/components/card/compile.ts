import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { CardModule } from './card.module';

platformBrowserDynamic()
  .bootstrapModule(CardModule)
  .catch((err) => console.error(err));
