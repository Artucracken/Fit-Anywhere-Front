import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IListCategoryResponse } from 'src/app/interfaces/IListCategoryResponse';
import { IListPostDataResponse } from 'src/app/interfaces/IListPostDataResponse';
import { IPostDataResponse } from 'src/app/interfaces/IPostDataResponse';
import { IResponse } from 'src/app/interfaces/IResponse';
import { IUserResponse } from 'src/app/interfaces/IUserResponse';
import { CategoriaServiceService } from 'src/app/Services/categoria-service.service';
import { PostServiceService } from 'src/app/Services/post-service.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {

  listadoPosts: IListPostDataResponse={seccess:false,data:[], error:""};
  post: IPostDataResponse[] = [];
  postsFiltrados: any[] = [];
  user: IUserResponse =  {id: 0, nombre:"", apellidos: "", telefono: 0, correo: "", idRol:0, dni:"", userName: "", password:""}
  categorias: IListCategoryResponse={succes:false, categorias:[], error:"" };
  selectedCategory:number| null = null;
  categoriaSeleccionada: boolean = false;
  response: IResponse = {success:false, error:""};
  showToast = false;
  constructor(private router: Router,private postService: PostServiceService, private categoryService: CategoriaServiceService){}

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
    //RECUPERAMOS TODOS LOS POSTS
    /*this.postService.getPosts().subscribe(
      post => this.post = post.data,
      error => console.log(error)
    );*/
    this.postService.getPosts().subscribe(
      posts => {
        // Formatea el contenido de cada post antes de asignarlo a la propiedad correspondiente
        this.post = posts.data.map(post => {
           return {
            id: post.id,
            nombre: post.nombre,
            usuarioId:post.usuarioId,
            valor: post.valor,
            categoriaId: post.categoriaId,
            contenido: this.formatContent(post.contenido),
            titulo: post.titulo
          };
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  filtrarPorCategoria(categoria: number) {
    this.selectedCategory = categoria; // Establece la categoría seleccionada
    this.categoriaSeleccionada = true;
    this.filtrarPostsPorCategoria(categoria);
  }

  filtrarPostsPorCategoria(categoria: number) {
    // Filtra los posts en función de la categoría
    this.postsFiltrados = this.post.filter(posts => posts.categoriaId === categoria);
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
  esCategoriaPermitida(idCategoria: number): boolean {
    const idsPermitidos = [1, 2, 7, 10, 11];
    return idsPermitidos.includes(idCategoria);
  }
  deletePost(id:number){
    this.categoriaSeleccionada = false;
    this.postService.deletePost(id).subscribe(
      resp=>this.response.success = resp.success,
      error=> this.response.error = error
    );
      this.showToast = true;
      this.autoCloseToast();
    //window.location.reload();
  }
  autoCloseToast() {
    setTimeout(() => {
      this.showToast = false;
      window.location.reload();
    }, 2000); // 5000 milisegundos = 5 segundos
  }
  volver(){}
}
