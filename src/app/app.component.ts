import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { HeaderComponent } from "./header/header.component";
import { NavComponent } from "./nav/nav.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TooltipModule, HeaderComponent, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngularPortfolioWebsite';
}
