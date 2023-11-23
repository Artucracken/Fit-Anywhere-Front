import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IListCategoryResponse } from 'src/app/interfaces/IListCategoryResponse';
import { IListRutinaDataResponse } from 'src/app/interfaces/IListRutinaDataResponse';
import { IResponse } from 'src/app/interfaces/IResponse';
import { IRutinaDataResponse } from 'src/app/interfaces/IRutinaDataResponse';
import { IUserResponse } from 'src/app/interfaces/IUserResponse';
import { CategoriaServiceService } from 'src/app/Services/categoria-service.service';
import { RutinaServiceService } from 'src/app/Services/rutina-service.service';

@Component({
  selector: 'app-rutinas',
  templateUrl: './rutinas.component.html',
  styleUrls: ['./rutinas.component.css']
})
export class RutinasComponent {
  listadoRutinas: IListRutinaDataResponse={success:false,data:[], error:""};
  rutina: IRutinaDataResponse[] = [];
  user: IUserResponse =  {id: 0, nombre:"", apellidos: "", telefono: 0, correo: "", idRol:0, dni:"", userName: "", password:""}
  categorias: IListCategoryResponse={succes:false, categorias:[], error:"" };
  selectedCategory:number| null = null;
  categoriaSeleccionada: boolean = false;
  response: IResponse = {success:false, error:""};


  constructor(private router: Router,private rutinaService: RutinaServiceService, private categoryService: CategoriaServiceService){}

  ngOnInit(){
    const jsonString = localStorage.getItem('user');
    const token = localStorage.getItem('tokenExpire');

    if(token!== null){
      const cleanToken = token.split('.')[0]; // Eliminar los milisegundos y la zona horaria
      const regex = /(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})/g;
      const match = regex.exec(cleanToken);


        const tokenExpire = new Date(match![0]);
        console.log(tokenExpire);


      console.log(tokenExpire);


      const now = new Date();
      if(tokenExpire.getTime() < now.getTime())
      {
        console.log("tempo del token "+tokenExpire.getTime());
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
    } else {
      console.log('El valor no existe en localStorage');
    }

    //RECUPERAMOS TODAS LAS CATEGORIAS
    this.categoryService.getCategorias().subscribe(
      listado =>this.categorias = listado,
      error => console.log(error)
    );

    //RECUPERAMOS TODAS LAS RUTINAS
    this.rutinaService.getRutinas().subscribe(
      rutina => this.rutina = rutina.data,
      error => console.log(error)
    );

  }
  filtrarPorCategoria(event: any) {
    const selectedCategoryId = event.target.value as number;
    this.selectedCategory = selectedCategoryId ;
    console.log(this.selectedCategory);
  }
  esCategoriaPermitida(idCategoria: number): boolean {
    const idsPermitidos = [3, 4, 5, 6, 9];
    return idsPermitidos.includes(idCategoria);
  }
  getEjerciciosFiltrados() {
    if (this.selectedCategory) {
      return this.rutina.filter(rut => rut.categoriaId.toString() === this.selectedCategory!.toString());
    } else {
      return this.rutina; // Devuelve todas las rutina si no se ha seleccionado ninguna categoría
    }
  }
  formatContent(content: string): string {
    const paragraphs = content.split('\n');
    const formattedContent = paragraphs.map(paragraph => `<p>${paragraph}</p>`).join('');
    return formattedContent;
  }

  mostrarPost(post: any){
    //this.ejercicioSeleccionado.emit(ejercicio.id);
    this.router.navigate(['/Post',post.id]);
  }
  deleteRutina(id: number){

    this.rutinaService.deleteRutina(id).subscribe(
      resp=>this.response.success = resp.success,
      error=> this.response.error = error
    );
  }

}
