import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEjerciciosDataResponse } from '../interfaces/IEjerciciosDataResponse';
import { EjerciciosServiceService } from '../Services/ejercicios-service.service';

@Component({
  selector: 'app-ejercicio-detail',
  templateUrl: './ejercicio-detail.component.html',
  styleUrls: ['./ejercicio-detail.component.css']
})
export class EjercicioDetailComponent {

  ejercicio: IEjerciciosDataResponse = {id:0,nombre:"",categoriaId:0,descripcion:"",imagen:""};
  ejercicioId: number = 0;

  constructor(private route: ActivatedRoute, private ejercicioService: EjerciciosServiceService){
    this.route.params.subscribe(params => {
      this.ejercicioId = params['id'];
      console.log(this.ejercicioId);
      this.ejercicioService.getEjercicio(this.ejercicioId).subscribe(
        (resp)=>{ this.ejercicio = resp;},
        (error)=>{console.log(error);}
      );
    });

  }

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
}
