import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserServiceService } from 'src/app/Services/user-service.service';
import { ILogin } from 'src/app/interfaces/ILogin';
import { IUserResponse } from 'src/app/interfaces/IUserResponse';
import { FormsModule } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { ILoginDataResponse } from 'src/app/interfaces/ILoginDataResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showToast = false;
  isLoading: boolean = false;
  isLoged:boolean = false;
  //loginForm!: FormGroup;
  private subscriptions: Subscription = new Subscription();
  user: IUserResponse =  {id: 0, nombre:"", apellidos: "", telefono: 0, correo: "", idRol:0, dni:"", userName: "", password:""}
  loginForm: ILogin = {userName:"", pass:""}
  loginToken!: ILoginDataResponse;
  constructor(
    //public activeModal: NgbActiveModal,
    //private activeModelService: NgbActiveModal,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private userService: UserServiceService
  ){}

  ngOnInit(): void {
    const jsonString = localStorage.getItem('user');
//this.showToast = false;
    // Verificar si la cadena JSON existe en localStorage
    if (jsonString == null) {
      console.log(jsonString);
      this.isLoged = false;
    }
    else{
      this.isLoged = true;
    }
    if(this.isLoged==true){
      this.router.navigate(['']);
    }
    console.log(this.isLoged);
  }


  Login() {
    //this.isLoading = true;
    const userLogin: ILogin = {
      userName: this.loginForm.userName,
      pass: this.loginForm.pass,
    };
    this.subscriptions.add(
      this.userService.getToken(userLogin).subscribe(
        {
          next: (resp) => {
            //localStorage.setItem('usuario', res.idUsuario);
            let decodedJWT = resp.data.id;//JSON.parse(window.atob(res.token.split('.')[1]));
            console.log("El valor de resp es: " + resp);
            localStorage.setItem('token', JSON.stringify(resp.token.split('.')[1]));
            localStorage.setItem('tokenExpire', JSON.stringify(resp.dateLoginExpires));
            this.subscriptions.add(
              this.userService
                .getUser(decodedJWT)
                .subscribe({
                  next: (user) => {
                    //GUARDAMOS EL USUARIO EN LOCALSTORAGE
                    localStorage.setItem('user', JSON.stringify(user));
                    if (Array.isArray(user.userList) && user.userList.length > 0) {
                      this.user.nombre = user.userList[0].nombre;
                      console.log("nombre: " + this.user.nombre);
                    } else {
                      // Maneja el caso en que no haya elementos en userList
                      console.log("No se encontraron elementos en userList");
                    }
                  },
                  error: (error) => {
                    console.log(error.status);
                  },
                  complete: () => {
                    window.location.reload();
                  },
                })
            );
          },
          error: (error) => {
            this.showToast = true;
            this.autoCloseToast();
            console.log(this.showToast);
          }
        }
      )
    );
  }
  autoCloseToast() {
    setTimeout(() => {
      this.showToast = false;
    }, 5000); // 5000 milisegundos = 5 segundos
  }
  openRegisterForm(): void {
   /* this.activeModelService.close();
    this.modalService.open(SignUpModalComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
    });*/
  }
//OBTENCION DEL TOKEN DEL USUARIO
  obtenToken(){
    const Login: ILogin = {
      userName: this.loginForm.userName,
      pass: this.loginForm.pass,
    };
    const tokenConseguido:string = "";
    this.userService.getToken(Login).subscribe(
      (token) => {
        console.log('Token recibido:', token.token);
        // Ahora puedes usar el token en tu aplicación
      },
      (error) => {
        console.error('Error en la petición:', error);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
