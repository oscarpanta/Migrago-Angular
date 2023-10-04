import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit{
  ocultarpasreg: boolean = true;
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }



  ocultarpass1() {
    this.ocultarpasreg = !this.ocultarpasreg;
  }
}
