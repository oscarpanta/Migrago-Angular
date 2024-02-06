import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AutenticacionService } from '../../../../../core/services/autenticacion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-guia',
  templateUrl: './guia.component.html',
  styleUrls: ['./guia.component.css']
})
export class GuiaComponent implements OnInit{
  @ViewChild('modalContent') modalContent: any;
  miFormulario!: FormGroup;
  selectedEstado: any = null;
  searchTerm: string = '';
  tamanopagina: number = 6;
  total$: number = 0;
  nropagina: number = 1;
  formularioEnviado = false;
  textoBoton = 'Guardar cambios';

  listaguias: any[] = []
  listaguiasfiltradas: any[] = [];
  constructor(public authService: AutenticacionService, private modalService: NgbModal,
    private changeDetectorRef: ChangeDetectorRef, private fb: FormBuilder) {
    this.miFormulario = this.fb.group({
      nombre: [{value: '', disabled: true}, [Validators.required]],
      apellido: [{value: '', disabled: true}, [Validators.required]],
      correo: [{value: '', disabled: true}, [Validators.required]],
     // dni: ['', [Validators.required]],
      estado: [[-1], [Validators.required]],
      texto_historia: [{value: '', disabled: true}, [Validators.required]],
      user_id: ['', [Validators.required]],

    });
  }
  ngOnInit() {
    this.listaGuias()
  }


  listaGuias(){

    if (this.selectedEstado == "")
      this.selectedEstado = null

      const requestData = {
        request: {
          name_user: null,
          status: true,
          status_guide:this.selectedEstado
        },
        order: {

          column: "g.id",
          mode: "desc"
        },
        page_size: this.tamanopagina,
        pgination_key: this.nropagina
      };

      this.authService.getListaGuias(requestData).subscribe(
        response => {
          this.listaguias = response.guides.data;
          this.listaguiasfiltradas = this.listaguias;
          this.total$ = +response.guides.totalElements;
        }

      );

  }
  onEstadoSelect(event: any) {
    this.selectedEstado = event.target.value;
    console.log(this.selectedEstado)
    this.listaGuias();
  }

  buscarLocalmente() {
    if (this.searchTerm.trim() === '') {
      this.listaguiasfiltradas = this.listaguias; // Si el término de búsqueda está vacío, muestra todas las historias
    } else {
      this.listaguiasfiltradas = this.listaguias.filter(guia =>
        guia.name.toLowerCase().includes(this.searchTerm.trim().toLowerCase())
      );
    }

  }

  editarGuia(guia: any) {
    this.modalService.open(this.modalContent, { size: 'lg' });



    this.authService.getDetalleGuia(guia.id).subscribe(response => {

      this.miFormulario.patchValue({
        nombre: response.guide.user_name,
        apellido: response.guide.user_lastname,
        correo: response.guide.user_username,
      //  dni: response.guide.user_dni,
        estado: response.guide.user_status,
        texto_historia: response.guide.user_texto,
        user_id: response.guide.user_id,
      });





    });


    // $('#modalEditarHistoria').modal('show');



  }

  eliminarGuia(historia: any) {
    // Lógica para eliminar la historia
    console.log('Eliminar historia', historia);
  }

  onPageChange(page: number) {
    this.nropagina = page;
    this.listaGuias();
    //this.filtrado()

  }
  onPageSizeChange() {
    this.listaGuias();
    this.changeDetectorRef.markForCheck();

  }

  cerrarModal() {
    this.modalService.dismissAll();
    this.miFormulario.reset();

  }

  registroGuia(){
    this.formularioEnviado = true;
    this.textoBoton = 'Esperando registro';
    const requestData = {
      request: {
        status: this.miFormulario.controls['estado'].value,
        user_id: this.miFormulario.controls['user_id'].value
      },
    };
    console.log(JSON.stringify(requestData))

    this.authService.updateGuia(requestData).subscribe(response => {
      console.log(response)
      if (response) {
        this.formularioEnviado = false;
        this.textoBoton = 'Guardar cambios';
        this.listaGuias()
        Swal.fire('Hecho', 'Se ha actualizados.', 'success')
        this.cerrarModal()
      } else {
        this.formularioEnviado = false;
        this.textoBoton = 'Guardar cambios';
        Swal.fire('Error', 'No se pudo registrar', 'error')
        this.cerrarModal()
      }
    })
  }
}
