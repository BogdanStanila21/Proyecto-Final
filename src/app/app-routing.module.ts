import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MostrarLibrosComponent } from "./pages/mostrar-libros/mostrar-libros.component";
import { PerfilComponent } from "./pages/perfil/perfil.component";
import { FavoritosComponent } from "./pages/favoritos/favoritos.component";
import { MisLibrosComponent } from "./pages/mis-libros/mis-libros.component";
import { SolicitudesComponent } from "./pages/solicitudes/solicitudes.component";
import { ModalIntercambioComponent } from "./pages/modal-intercambio/modal-intercambio.component";

const routes: Routes = [
  { path: "", redirectTo: "/perfil", pathMatch: "full" },
  { path: "perfil", component: PerfilComponent },
  { path: "mostrarLibro", component: MostrarLibrosComponent },
  { path: "favoritos", component: FavoritosComponent },
  { path: "misLibros", component: MisLibrosComponent },
  { path: "solicitudes", component: SolicitudesComponent },
  { path: "intercambio", component: ModalIntercambioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
