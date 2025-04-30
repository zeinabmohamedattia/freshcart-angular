import { Component, Input, input } from '@angular/core';
import { NavbarComponent } from "../../../shared/components/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-auth',
    imports: [NavbarComponent, RouterOutlet],
    templateUrl: './auth-layout.component.html',
    styleUrl: './auth-layout.component.css'
})
export class AuthComponent {
}
