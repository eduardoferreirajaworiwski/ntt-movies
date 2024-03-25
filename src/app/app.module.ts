import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { HomeComponent } from './pages/home/home.component';
import { MovieGalleryComponent } from './components/movie-gallery/movie-gallery.component';
import { FavoritesService } from './shared/services/favorites.service';
import { appReducer } from './shared/store/app.state'; // Corrigido o caminho do appReducer
import { FavoritesComponent } from './pages/favorites/favorites.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchBarComponent,
    MovieDetailsComponent,
    MovieGalleryComponent,
    FavoritesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({ app: appReducer }),
  ],
  exports: [HomeComponent],
  providers: [FavoritesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
