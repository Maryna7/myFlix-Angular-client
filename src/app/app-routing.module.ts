import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/**
 * Angular module for managing routing in the application.
 */
const routes: Routes = [];

@NgModule({
  /**
   * Imports the RouterModule with the provided routes.
   * Registers the routes for the application.
   */
  imports: [RouterModule.forRoot(routes)],

  /**
   * Exports the RouterModule for other modules to use.
   */
  exports: [RouterModule]
})
export class AppRoutingModule { }
