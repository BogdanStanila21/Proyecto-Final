import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MostrarLibrosComponent } from './pages/mostrar-libros/mostrar-libros.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { FavoritosComponent } from './pages/favoritos/favoritos.component';
import { MisLibrosComponent } from './pages/mis-libros/mis-libros.component';
import { SolicitudesComponent } from './pages/solicitudes/solicitudes.component';
import { ModalIntercambioComponent } from './pages/modal-intercambio/modal-intercambio.component';


@NgModule({
  declarations: [
    AppComponent,
    MostrarLibrosComponent,
    PerfilComponent,
    FavoritosComponent,
    MisLibrosComponent,
    SolicitudesComponent,
    ModalIntercambioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
