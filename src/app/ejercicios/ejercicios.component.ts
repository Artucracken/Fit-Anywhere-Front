import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IEjercicioRequest } from '../interfaces/IEjercicioRequest';
import { EjerciciosServiceService } from '../Services/ejercicios-service.service';

@Component({
  selector: 'app-ejercicios',
  templateUrl: './ejercicios.component.html',
  styleUrls: ['./ejercicios.component.css']
})
export class EjerciciosComponent {

  nuevoEjercicio:IEjercicioRequest = {
    nombre:"",
    categoriaId:0,
    descripcion:"",
    imagen:""
  }

  constructor( private router: Router,private ejerciciosService: EjerciciosServiceService){}

  ngOnInit(){
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
  }

  changeImage(fileInput: HTMLInputElement) {
    if (!fileInput.files || fileInput.files.length === 0 ) { return; }

    if(!fileInput.files[0].name.endsWith("png") && !fileInput.files[0].name.endsWith("jpg")  && !fileInput.files[0].name.endsWith("jpeg"))
    {
      console.log("la imagen seleccionada no es vsalida");
    }
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', e => {
    this.nuevoEjercicio.imagen = reader.result as string;
    });
  }

  addEjercicio(){
    if (this.nuevoEjercicio.imagen) {
      this.nuevoEjercicio.imagen = this.nuevoEjercicio.imagen.split(",")[1];
      this.ejerciciosService.addEjercicio(this.nuevoEjercicio).subscribe(
      () =>{
        this.router.navigate(['/Ejercicios']);

      },
      error => console.error(error)
      );
    }
  }
}
