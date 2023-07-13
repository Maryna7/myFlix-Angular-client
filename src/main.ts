import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
/**
 * This is the entry point of the Angular application.
 * It dynamically bootstraps the AppModule to start the application.
 *
 * Bootstraps the AppModule to start the Angular application.
 * @memberof AppComponent
 * @returns {void}
 */
platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));