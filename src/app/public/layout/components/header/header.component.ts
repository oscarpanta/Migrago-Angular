import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../layout.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AutenticacionService } from 'src/app/core/services/autenticacion.service';
import { Usuario } from 'src/app/core/interfaces/login.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  estalogeado:boolean=false;
  rolUsuario : string |null ="";
  usuario!: Usuario;
  ocultarpasreg: boolean = true;
  constructor(private router:Router,private modalService: NgbModal,
        private authService: AutenticacionService
      ) {
  }
  ngOnInit(): void {
   // this.isLoggedIn$ = this.authService.isLoggedIn;
    const nav = document.getElementById("navbarprinc")!
    const butIngresa = document.getElementById("ingresaprinc")!;
    // const nav = document.querySelector(".nav")! as HTMLElement;
    //const navlink = document.querySelectorAll(".nav-link")!;

      window.onscroll = function () { scrollFunction() };
      function scrollFunction() {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {

          // nav.style.background = "#000000";
          // nav.style.position = "fixed";
          // nav.style.top = "0";


          // nav.style.right = "0";
          // nav.style.left = "0";
          // nav.style.zIndex = "1030";
          // navli.style.color = "#000"
          nav.classList.add("navScrollPrinc");
         // butIngresa.style.background="#5a2395"


        } else {

          // nav.style.background = "none";
          // nav.style.position = "absolute";
          // nav.style.top = "";
          // nav.style.right = "0";
          // nav.style.left = "0";
          // nav.style.zIndex = "1030";
          nav.classList.remove("navScrollPrinc");
         // butIngresa.style.background="#ffffff"
         // navli.style.color = "#fff"
        }
      }

      this.logeado()

  }

  ocultarpass1() {
    this.ocultarpasreg = !this.ocultarpasreg;
  }

  onLogout() {
    //this.authService.logout();
  }
  openModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modalRegister' }).result.then(
      (result) => {
        // Manejar acciones después de que se cierre la modal (si es necesario).
      },
      (reason) => {
        // Manejar acciones si la modal se cierra de forma inesperada (si es necesario).
      }
    );
  }
  cerrarModal() {
    this.modalService.dismissAll();

  }
  GetUsuario(){
    //this.usuario =  this.authService.usuario;
    this.usuario = this.authService.getUsuario();
  }
  logeado(){
    if(!this.authService.estalogeado()){
      this.estalogeado=false

    }
    else{
      this.estalogeado=true
      this.rolUsuario =this.authService.getRolUsuario();
      this.rolUsuario = this.rolUsuario!.replace(/"/g, '')
      this.GetUsuario();
      console.log(this.rolUsuario)

    }
  }
  logout(){
    this.router.navigateByUrl('/auth');
    this.authService.logout();
  }
}
