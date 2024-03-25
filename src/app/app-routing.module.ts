import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { FavoritesComponent } from './pages/favorites/favorites.component'; // Importe o componente de favoritos aqui

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movie-details/:id', component: MovieDetailsComponent },
  { path: 'favorites', component: FavoritesComponent }, // Corrija a configuração da rota de favoritos
  { path: '**', redirectTo:'' } ,// Rota para redirecionar URLs inválidas para a página inicial
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
