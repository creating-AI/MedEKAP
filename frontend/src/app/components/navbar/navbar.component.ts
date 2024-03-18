import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  showNavbar: boolean = true

  /** Expand and collapse the navigation bar by clicking the toggle icon */
  toggleNavbar() {
    this.showNavbar = !this.showNavbar;
  }
}