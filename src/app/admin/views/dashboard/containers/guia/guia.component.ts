import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AutenticacionService } from '../../../../../core/services/autenticacion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { CountriesService } from 'src/app/public/views/services/countries.service';
import { Nationalities } from 'src/app/public/views/interfaces/nationalities.interface';
import { WaysMigrationService } from 'src/app/public/views/services/ways-migration.service';

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
  countries: any[] = []
  cities:any[]=[]
  nationalities: Nationalities[] = []
  rutasmigracion:any[]=[]
  listaguias: any[] = []
  listaguiasfiltradas: any[] = [];
  selectedCountryId: number | null = null;
  constructor(public authService: AutenticacionService, private modalService: NgbModal,public countryService: CountriesService,private waymigration: WaysMigrationService,
    private changeDetectorRef: ChangeDetectorRef, private fb: FormBuilder) {
    this.miFormulario = this.fb.group({
      nombre: [{value: '', disabled: true}, [Validators.required]],
      apellido: [{value: '', disabled: true}, [Validators.required]],
      correo: [{value: '', disabled: true}, [Validators.required]],
     // dni: ['', [Validators.required]],
      estado: [[-1], [Validators.required]],
      texto_historia: [{value: '', disabled: true}, [Validators.required]],
      user_id: ['', [Validators.required]],
      countrySelect: [{value: '', disabled: true}, [Validators.required]],
      citySelect: [{value: '', disabled: true}, [Validators.required]],
      nacionalidad:[{value: '', disabled: true}, [Validators.required]],
      numero:[{value: '', disabled: true}, [Validators.required]],
      fechanac:[{value: '', disabled: true}, [Validators.required]],
      contenido:[{value: '', disabled: true}, [Validators.required]],
      llegadamascota:[{value: '', disabled: true}, [Validators.required]],
      RutaMigracion:[{value: '', disabled: true}, [Validators.required]],
      fecha:[{value: '', disabled: true}, [Validators.required]]
    });
  }
  ngOnInit() {
    this.listaGuias();
    this.listaPaises();
    // this.listaCiudades();
    this.listaNacionalidades()
    this.listaRutasMigracion()
  }

  listaPaises() {
    const requestData = {
      request: {
        contry_name: null,
        status: true,
        flag_tipo: null
      },
      order: {

        column: null,
        mode: null
      },
      page_size: 100,
      pgination_key: 1
    };

    this.countryService.getCountries(requestData).subscribe(
      response => {
        this.countries = response[0].data;

        console.log(this.countries)
      }

    );
  }
  listaCiudades() {
    if (this.selectedCountryId !== null) {
      const req = {

        request: {
          country_id: this.selectedCountryId,
          city_name: null,
          status: true
        },
        order: {
          column: null,
          mode: null
        },
        page_size: 100,
        pgination_key: 1

      };

      this.countryService.getAllCities(req).subscribe(

        response => {
          this.cities = response[0].data;

        }

      )

    }
    else {
      this.cities = [];

    }


  }
  listaNacionalidades() {
    const requestData = {
      request: {
        nationality_name: null,
        status: true
      },
      order: {
        column: null,
        mode: null
      },
      page_size: 100,
      pgination_key: 1
    };

    this.countryService.getNationalities(requestData).subscribe(
      response => {
        console.log('Nacionalidades=' + JSON.stringify(response));
        this.nationalities = response[0].data;
        //  this.nationalities = response;
        console.log(this.nationalities)

      },
      error => {
        console.error('Error :', error);
      }


    );
  }
  listaRutasMigracion() {
    const requestData = {
      request: {
        waymigration_name: null,
        status: true
      },
      order: {

        column: null,
        mode: null
      },
      page_size: 100,
      pgination_key: 1
    };

    this.waymigration.getWayMigrations(requestData).subscribe(
      response => {
        console.log('Migraciones=' + JSON.stringify(response));
        this.rutasmigracion = response[0].data;
        console.log(this.rutasmigracion)

      }


    );
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
  onCountrySelect(event: any) {
    const selectedCountryId = event.target.value;
    this.selectedCountryId = selectedCountryId;
    this.listaCiudades();
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
      console.log(response.guide.user_city)
      this.selectedCountryId=response.guide.user_country;
      this.listaCiudades()
      const arrivalDate = response.guide.user_arrival_date.split(' ')[0];

      this.miFormulario.patchValue({
        nombre: response.guide.user_name,
        apellido: response.guide.user_lastname,
        correo: response.guide.user_username,
      //  dni: response.guide.user_dni,
        estado: response.guide.user_status,
        texto_historia: response.guide.user_texto,
        user_id: response.guide.user_id,
        countrySelect:response.guide.user_country,
        citySelect:response.guide.user_city,
        nacionalidad:response.guide.user_nationality,
        numero:response.guide.user_phone,
        fechanac:response.guide.user_fecha_nac,
        contenido:response.guide.user_content_social,
        llegadamascota:response.guide.user_mascota,
        RutaMigracion:response.guide.user_way_migration_id,
        fecha:arrivalDate,
      });




    });
    console.log(this.miFormulario)


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
