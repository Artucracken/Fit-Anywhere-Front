import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUserResponse } from 'src/app/interfaces/IUserResponse';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  isLoged:boolean = false;
  muestra: boolean = false;
  user: IUserResponse =  {id: 0, nombre:"", apellidos: "", telefono: 0, correo: "", idRol:0, dni:"", userName: "", password:""}
  constructor(private router: Router){

  }

  ngOnInit(){
       // Obtener la cadena JSON desde localStorage
       const jsonString = localStorage.getItem('user');

       // Verificar si la cadena JSON existe en localStorage
      if (jsonString !== null) {
         // Parsear la cadena JSON a un objeto JavaScript
         const jsonObject = JSON.parse(jsonString);

         // Asignar la parte 'userList' al objeto 'user'
        if (Array.isArray(jsonObject.userList) && jsonObject.userList.length > 0) {
           const userData = jsonObject.userList[0]; // Tomar el primer elemento del array
           this.user = {
             id: userData.id,
             nombre: userData.nombre,
             apellidos: userData.apellidos,
             telefono: userData.telefono,
             correo: userData.correo,
             idRol: userData.rolId,
             dni: userData.dni,
             userName: userData.userName,
             password: userData.pass,
           };
           if(this.user.id != 0) this.isLoged = true;
           if(this.user.idRol != 0) this.muestra = true;
        }
      }
  }

  signOut()
  {
    localStorage.removeItem('user');
    this.isLoged = false;
    console.log(this.router.url);
    if(this.router.url == '/')
    {
      window.location.reload();
    }
    else
    {
      this.router.navigate(['']);
    }
  }
}
