import { Routes } from '@angular/router';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { CVComponent } from './cv/cv.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
    {path: 'acceuil', component: AcceuilComponent},
    {path: 'portfolio', component: PortfolioComponent},
    {path: 'cv', component: CVComponent},
    {path: 'contact', component: ContactComponent},
];
