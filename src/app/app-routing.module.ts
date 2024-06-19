import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroeComponent } from './pages/heroe/heroe.component';
import { HeroesComponent } from './pages/heroes/heroes.component';

const routes: Routes = [
  //para entrar a la pagina del heroe se necesita un parametro y se hace de la siguiente manera
  { path: 'heroe/:id', component: HeroeComponent },
  { path: 'heroes', component: HeroesComponent },
{ path: '**', pathMatch: 'full', redirectTo: 'heroes' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
