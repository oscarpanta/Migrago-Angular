import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  eventoTitulo: string = '';
  eventoHorario: string = '';
  horaInicial: string = '';
  horaFinal: string = '';
  eventoId: string = '';
  constructor(public activeModal: NgbActiveModal) { }

  updateHoraFinal() {


    const horaInicialDate = new Date(`2000-01-01T${this.horaInicial}`);
    const horaFinalDate = new Date(horaInicialDate.getTime() + (60 * 60 * 1000));


    this.horaFinal = `${horaFinalDate.getHours().toString().padStart(2, '0')}:${horaFinalDate.getMinutes().toString().padStart(2, '0')}`;
  }



  save() {
    // const horaInicialDate = new Date(`2000-01-01T${this.horaInicial}`);
    // const horaFinalDate = new Date(horaInicialDate.getTime() + (60 * 60 * 1000));
    // this.horaFinal = `${horaFinalDate.getHours().toString().padStart(2, '0')}:${horaFinalDate.getMinutes().toString().padStart(2, '0')}`;

    //this.activeModal.close({ titulo: this.eventoTitulo, horario: this.eventoHorario });
    this.activeModal.close({ horaInicial: this.horaInicial, horaFinal: this.horaFinal });
  }
}
