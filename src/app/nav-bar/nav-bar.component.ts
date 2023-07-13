import { Component } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Component for the navigation bar.
 */
@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})

export class NavBarComponent {
    /**
     * Creates an instance of NavBarComponent.
     * @constructor
     * @param {Router} router - The Router used for navigating to different routes.
     */
    constructor(
        private router: Router
    ) { }

    /**
     * Navigates to the movies route.
     * @memberof NavBarComponent
     * @returns {void}
     */
    toMovies(): void {
        this.router.navigate(['movies']);
    }

    /**
     * Navigates to the profile route.
     * @memberof NavBarComponent
     * @returns {void}
     */
    toProfile(): void {
        this.router.navigate(['profile']);
    }

    /**
     * Logs out the user by navigating to the welcome route and clearing the local storage.
     * @memberof NavBarComponent
     * @returns {void}
     */
    logOut(): void {
        this.router.navigate(['welcome']);
        localStorage.clear();
    }
}