import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IResponse } from 'src/app/interfaces/IResponse';
import { IUserEdit } from 'src/app/interfaces/IUserEdit';
import { IUserResponse } from 'src/app/interfaces/IUserResponse';
import { UserServiceService } from 'src/app/Services/user-service.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent{

  user: IUserResponse =  {id: 0, nombre:"", apellidos: "", telefono: 0, correo: "", idRol:0, dni:"", userName: "", password:""}
  perfilForm!: FormGroup;
  constructor(
    //public activeModal: NgbActiveModal,
    //private activeModelService: NgbActiveModal,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private userService: UserServiceService
  ){}

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
        console.log('dentro del data y el nombre es: '+ userData.nombre);
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
    function emailFormatValidator(): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
        if (control.value === null || control.value === undefined || control.value === '') {
          return null;
        }

        const emailParts = control.value.split('@');

        // Validar la parte antes del "@" y después del "@"
        const usernamePattern = /^[a-zA-Z0-9._-]+$/;
        const domainPattern = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (emailParts.length !== 2 || !usernamePattern.test(emailParts[0]) || !domainPattern.test(emailParts[1])) {
          return { 'emailFormat': { value: control.value } };
        }

        return null;
      };
    }
    this.perfilForm = this.formBuilder.group({
      telefono: ['', [Validators.pattern("^[0-9]{9}$")]],
      correo: ['', [ Validators.pattern("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$"), emailFormatValidator()]],
      userName: ['', [Validators.minLength(2)]],
      password: ['', [Validators.minLength(8), Validators.maxLength(16)]]
    });

    this.perfilForm.valueChanges.subscribe(val => {
      console.log('Valores del formulario actualizados:', val);
  });
  }
  onSubmit(){
    if (this.perfilForm.valid) {
      const userEdit:IUserEdit = {
        id:this.user.id!,
        telefono:this.perfilForm.get('telefono')!.value,
        correo:this.perfilForm.get('correo')!.value,
        userName: this.perfilForm.get('userName')!.value,
        pass: this.perfilForm.get('password')!.value
     }
     const succes:IResponse={
      success: false,
      error: ''
    }
     this.userService.editUser(userEdit).subscribe(
      (resp)=>{
        succes.success = resp.success;
        succes.error = resp.error;
        if(resp.success == true){
          console.log("Datos actualizados "+ resp.success);
          this.router.navigate(['Login']);
        }else{
          console.log("Error al actualizar los datos "+ resp.error);
        }
      },
      (error) => {
        succes.error = error;
        console.error('Error en la petición:', error);
      }
    );
    }

      console.log(this.user.telefono);
  }
}
