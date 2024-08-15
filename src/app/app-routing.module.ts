import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistracijaComponent } from './registracija/registracija.component';
import { DomovComponent } from './domov/domov.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { SlikaComponent } from './slika/slika.component';
import { NovaSlikaComponent } from './nova-slika/nova-slika.component';

const routes: Routes = [
  {path: 'registracija', component: RegistracijaComponent},
  {path: 'prijava', component: PrijavaComponent},
  {path: '', component: DomovComponent},
  {path: 'slika/:id', component: SlikaComponent},
  {path: 'nova-slika', component: NovaSlikaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
