import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'
import { ModalModule } from 'ngx-bootstrap'
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MostrarLibrosComponent } from './pages/mostrar-libros/mostrar-libros.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { FavoritosComponent } from './pages/favoritos/favoritos.component';
import { MisLibrosComponent } from './pages/mis-libros/mis-libros.component';
import { SolicitudesComponent } from './pages/solicitudes/solicitudes.component';
import { ModalIntercambioComponent } from './pages/modal-intercambio/modal-intercambio.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { HomeComponent } from './pages/home/home.component';
import { NavComponent } from './pages/nav/nav.component';
import { PeticionesComponent } from './pages/peticiones/peticiones.component';
import { MasInformacionComponent } from './pages/mas-informacion/mas-informacion.component';
import { FilterPipe } from './pipes/filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    MostrarLibrosComponent,
    PerfilComponent,
    FavoritosComponent,
    MisLibrosComponent,
    SolicitudesComponent,
    ModalIntercambioComponent,
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    NavComponent,
    PeticionesComponent,
    MasInformacionComponent,
    FilterPipe,
  ],
  imports: [

  BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
