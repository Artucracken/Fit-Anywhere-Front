import { ɵHttpInterceptorHandler } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPostDataResponse } from 'src/app/interfaces/IPostDataResponse';
import { PostServiceService } from 'src/app/Services/post-service.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  post: IPostDataResponse = {id:0,categoriaId:0,usuarioId:0,valor:"",contenido:"",titulo:"", nombre:"",};
  postId: number = 0;

  constructor(private route: ActivatedRoute, private ejercicioService: PostServiceService){
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

    this.route.params.subscribe(params => {
      this.postId = params['id'];
      console.log(this.postId);
      this.ejercicioService.getPost(this.postId).subscribe(
        (resp)=>{ this.post = resp;},
        (error)=>{console.log(error);}
      );
    });

  }
}
