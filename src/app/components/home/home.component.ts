import { Component } from '@angular/core';
import { IUserResponse } from 'src/app/interfaces/IUserResponse';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  user: IUserResponse =  {id: 0, nombre:"", apellidos: "", telefono: 0, correo: "", idRol:0, dni:"", userName: "", password:""}

  ngOnInit(): void {

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

        // Ahora 'user' contiene los datos de 'userList'
        console.log(this.user);
      } else {
        // Manejar el caso en que 'userList' esté vacío
        console.log('userList está vacío o no es un array');
      }
    } else {
      // Manejar el caso en que el valor no existe en localStorage
      console.log('El valor no existe en localStorage');
    }



  }
}
