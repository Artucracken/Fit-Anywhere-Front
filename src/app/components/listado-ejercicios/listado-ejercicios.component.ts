import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IEjerciciosDataResponse } from 'src/app/interfaces/IEjerciciosDataResponse';
import { IEjerciciosListDataResponse } from 'src/app/interfaces/IEjerciciosListDataResponse';
import { IListCategoryResponse } from 'src/app/interfaces/IListCategoryResponse';
import { IUserResponse } from 'src/app/interfaces/IUserResponse';
import { CategoriaServiceService } from 'src/app/Services/categoria-service.service';
import { EjerciciosServiceService } from 'src/app/Services/ejercicios-service.service';

@Component({
  selector: 'app-listado-ejercicios',
  templateUrl: './listado-ejercicios.component.html',
  styleUrls: ['./listado-ejercicios.component.css']
})
export class ListadoEjerciciosComponent {

  listadoEjercicios!: IEjerciciosListDataResponse;
  ejercicio: IEjerciciosDataResponse[] = [];
  @Output() ejercicioSeleccionado = new EventEmitter<any>();
  user: IUserResponse =  {id: 0, nombre:"", apellidos: "", telefono: 0, correo: "", idRol:0, dni:"", userName: "", password:""}
  categorias: IListCategoryResponse={succes:false, categorias:[], error:"" };
  selectedCategory:number| null = null;
  constructor(private router: Router,private ejerciciosService: EjerciciosServiceService, private categoryService: CategoriaServiceService){}

  ngOnInit(){
    const jsonString = localStorage.getItem('user');
    const token = localStorage.getItem('tokenExpire');

    if(token!== null){
      const cleanToken = token.split('.')[0]; // Eliminar los milisegundos y la zona horaria
      const regex = /(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})/g;
      const match = regex.exec(cleanToken);

      const tokenExpire = new Date(match![0]);
      const now = new Date();
      if(tokenExpire.getTime() < now.getTime())
      {
        localStorage.clear();
        window.location.reload();
      }else{
        console.log("dentro del else");
      }
    }
    if (jsonString !== null) {
      const jsonObject = JSON.parse(jsonString);

      if (Array.isArray(jsonObject.userList) && jsonObject.userList.length > 0) {
        const userData = jsonObject.userList[0];
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
      } else {
        console.log('userList está vacío o no es un array');
      }
    }else {
      console.log('El valor no existe en localStorage');
    }
    //RECUPERAMOS TODAS LAS CATEGORIAS
    this.categoryService.getCategorias().subscribe(
      listado =>this.categorias = listado,
      error => console.log(error)
    );

    //RECUPERAMOS TODOS LOS EJERCICIOS
    this.ejerciciosService.getEjercicios().subscribe(
      ejercicio => this.ejercicio = ejercicio.data,
      error => console.log(error)
    );
  }

      mostrarEjercicio(ejercicio: any){
        this.ejercicioSeleccionado.emit(ejercicio.id);
        this.router.navigate(['/EjercicioDetail',ejercicio.id]);
      }

      filtrarPorCategoria(event: any) {
        const selectedCategoryId = event.target.value as number;
        this.selectedCategory = selectedCategoryId ;
        console.log(this.selectedCategory);
      }
      getEjerciciosFiltrados() {
        if (this.selectedCategory) {
          return this.ejercicio.filter(ejer => ejer.categoriaId.toString() === this.selectedCategory!.toString());
        } else {
          return this.ejercicio; // Devuelve todos los ejercicios si no se ha seleccionado ninguna categoría
        }
      }
}
