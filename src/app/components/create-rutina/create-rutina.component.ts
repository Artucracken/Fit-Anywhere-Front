import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IListCategoryResponse } from 'src/app/interfaces/IListCategoryResponse';
import { IListRutinaDataResponse } from 'src/app/interfaces/IListRutinaDataResponse';
import { IRutinaDataResponse } from 'src/app/interfaces/IRutinaDataResponse';
import { IRutinaRequest } from 'src/app/interfaces/IRutinaRequest';
import { IUserResponse } from 'src/app/interfaces/IUserResponse';
import { CategoriaServiceService } from 'src/app/Services/categoria-service.service';
import { RutinaServiceService } from 'src/app/Services/rutina-service.service';

@Component({
  selector: 'app-create-rutina',
  templateUrl: './create-rutina.component.html',
  styleUrls: ['./create-rutina.component.css']
})
export class CreateRutinaComponent {
  listadoRutinas: IListRutinaDataResponse={success:false,data:[], error:""};
  rutina: IRutinaDataResponse[] = [];
  user: IUserResponse =  {id: 0, nombre:"", apellidos: "", telefono: 0, correo: "", idRol:0, dni:"", userName: "", password:""}
  categorias: IListCategoryResponse={succes:false, categorias:[], error:"" };
  selectedCategory:number| null = null;
  categoriaSeleccionada: boolean = false;
  nuevaRutina: IRutinaRequest = {categoriaId:0, contenido:""};
  creado:boolean = false;

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
  }

  crear(){

    const contenidoFormateado = this.formatContent(this.nuevaRutina.contenido);
    this.nuevaRutina.contenido = contenidoFormateado;
    this.rutinaService.createRutina(this.nuevaRutina).subscribe(
      succes=>this.creado = succes.success,
      error => console.log(error)
    );
      this.router.navigate(['Rutinas']);
  }

  formatContent(content: string): string {
    // Reemplaza los saltos de línea con etiquetas <br> y conserva los espacios en blanco
    const paragraphs = content.split('\n');
    const formattedContent = paragraphs.map(paragraph => `<p>${paragraph}</p>`).join('');
    return formattedContent;
  }
}
