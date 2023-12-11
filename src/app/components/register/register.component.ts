import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IPlanDataResponse } from 'src/app/interfaces/IPlanDataResponse';
import { IRegister } from 'src/app/interfaces/IRegister';
import { IResponse } from 'src/app/interfaces/IResponse';
import { PlanServiceService } from 'src/app/Services/plan-service.service';
import { UserServiceService } from 'src/app/Services/user-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm!: FormGroup;
  showToast = false;
  newUser: IRegister = {
    nombre: "",
    apellidos: "",
    telefono: 0,
    correo: "",
    rolId: 2,
    planId: 0,
    dni: "",
    pass: "",
    userName: ""
  }
  plans:IPlanDataResponse[] = [];
  count:number = 0;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private userService: UserServiceService,
    private planService: PlanServiceService
  ){}

  ngOnInit(): void{
    this.planService.getPlans().subscribe(
      (resp)=>{
        if (Array.isArray(resp.data) && resp.data.length > 0) {
          resp.data.forEach(plan => {
            this.plans[this.count] = {id:0,valor:"",precio:0};
            this.plans[this.count].id = plan.id;
            this.plans[this.count].valor = plan.valor;
            this.plans[this.count].precio = plan.precio;
            this.count++;
          });
        } else {
          // Maneja el caso en que no haya elementos en userList
          console.log("No se encontraron elementos en plans");
        }
      },
      (error) => {
        console.error('Error en la petición:', error);
      }
    );

    this.registerForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellidos: ['', [Validators.required, Validators.minLength(2)]],
      telefono: ['', [Validators.required, Validators.pattern("^[0-9]{9}$")]],
      correo: ['', [Validators.required, Validators.email]],
      plan: ['', Validators.required],
      userName: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      dni: ['', [Validators.required, Validators.pattern("^[0-9]{8}[a-zA-Z]$")]]
    });

    this.registerForm.valueChanges.subscribe(val => {
      console.log('Valores del formulario actualizados:', val);
  });
  }

  createUser(){

    console.log("apellidos: " + this.newUser.apellidos);
    console.log("telefono: " + this.newUser.telefono);
    console.log("correo: " + this.newUser.correo);
    console.log("rolId: " + this.newUser.rolId);
    console.log("planId: " + this.newUser.planId);
    console.log("userName: " + this.newUser.userName);
    console.log("pass: " + this.newUser.pass);
    console.log("dni: " + this.newUser.dni);
    /*this.plans.forEach(plan=>{
      console.log("id: "+ plan.id);
      console.log("valor: "+ plan.valor);
      console.log("precio: "+ plan.precio);
    });*/
  }
  onSubmit() {
    if (this.registerForm.valid) {
      this.newUser.nombre = this.registerForm.get('nombre')!.value;
      this.newUser.apellidos = this.registerForm.get('apellidos')!.value;
      this.newUser.telefono = this.registerForm.get('telefono')!.value;
      this.newUser.correo = this.registerForm.get('correo')!.value;
      this.newUser.planId = this.registerForm.get('plan')!.value;
      this.newUser.dni = this.registerForm.get('dni')!.value;
      this.newUser.pass = this.registerForm.get('password')!.value;
      this.newUser.userName = this.registerForm.get('userName')!.value;

      const succes:IResponse={
        success: false,
        error: ''
      }
      this.userService.createUser(this.newUser).subscribe(
        (resp)=>{
          succes.success = resp.success;
          succes.error = resp.error;
          if(resp.success == true){
            this.showToast = true;
            this.autoCloseToast();
            //this.router.navigate(['Login']);
          }else{
            console.log("el registro se ha completado mal "+ resp.error);
          }
        },
        (error) => {
          succes.error = error;
          console.error('Error en la petición:', error);
        }
      );
    }
  }
  redirige(){
    this.router.navigate(['Login']);
  }
  autoCloseToast() {
    setTimeout(() => {
      this.showToast = false;
      this.router.navigate(['Login']);
    }, 2000); // 5000 milisegundos = 5 segundos
  }
}


