import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RutinasComponent } from './components/rutinas/rutinas.component';
import { RegisterComponent } from './components/register/register.component';
import { EjerciciosComponent } from './ejercicios/ejercicios.component';
import { ListadoEjerciciosComponent } from './components/listado-ejercicios/listado-ejercicios.component';
import { EjercicioDetailComponent } from './ejercicio-detail/ejercicio-detail.component';
import { PostsComponent } from './components/posts/posts.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { PostComponent } from './components/post/post.component';
import { CreateRutinaComponent } from './components/create-rutina/create-rutina.component';
import { PerfilComponent } from './components/perfil/perfil.component';
//import { FontAwesomeModule } from '@fortawesome/fontawesome-free'

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RutinasComponent,
    RegisterComponent,
    EjerciciosComponent,
    ListadoEjerciciosComponent,
    EjercicioDetailComponent,
    PostsComponent,
    CreatePostComponent,
    PostComponent,
    CreateRutinaComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
