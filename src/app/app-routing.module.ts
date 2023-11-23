import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { CreateRutinaComponent } from './components/create-rutina/create-rutina.component';
import { HomeComponent } from './components/home/home.component';
import { ListadoEjerciciosComponent } from './components/listado-ejercicios/listado-ejercicios.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PostComponent } from './components/post/post.component';
import { PostsComponent } from './components/posts/posts.component';
import { RegisterComponent } from './components/register/register.component';
import { RutinasComponent } from './components/rutinas/rutinas.component';
import { EjercicioDetailComponent } from './ejercicio-detail/ejercicio-detail.component';
import { EjerciciosComponent } from './ejercicios/ejercicios.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'Login', component: LoginComponent},
  {path: 'Register', component: RegisterComponent},
  {path: 'Perfil', component: PerfilComponent, canActivate: [AuthGuard]},
  {path: 'Ejercicios', component: EjerciciosComponent, canActivate: [AuthGuard]},
  {path: 'ListadoEjercicios', component: ListadoEjerciciosComponent, canActivate: [AuthGuard]},
  {path: 'EjercicioDetail/:id', component: EjercicioDetailComponent, canActivate: [AuthGuard]},
  {path: 'Posts', component: PostsComponent, canActivate: [AuthGuard]},
  {path: 'Post/:id', component: PostComponent, canActivate: [AuthGuard]},
  {path: 'NewPost', component: CreatePostComponent, canActivate: [AuthGuard]},
  {path: 'Rutinas', component: RutinasComponent, canActivate: [AuthGuard]},
  {path: 'NewRutina', component: CreateRutinaComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
