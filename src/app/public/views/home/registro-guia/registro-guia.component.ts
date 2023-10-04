import { Component } from '@angular/core';
import { Country } from '../../interfaces/countries.interface';
import { Cities } from '../../interfaces/cities.interface';
import { Nationalities } from '../../interfaces/nationalities.interface';
import { CountriesService } from '../../services/countries.service';
import { WaysMigrationService } from '../../services/ways-migration.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WayMigration } from '../../interfaces/waymigration.interface';
import { MigrationMode } from '../../interfaces/migration_modes.interface';
import { AutenticacionService } from 'src/app/core/services/autenticacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-guia',
  templateUrl: './registro-guia.component.html',
  styleUrls: ['./registro-guia.component.css']
})
export class RegistroGuiaComponent {
  countries: Country[] = []
  cities: Cities[] = []
  nationalities: Nationalities[] = []
  rutasmigracion: WayMigration[] = []
  modemigrations: MigrationMode[] = []
  miFormulario!: FormGroup;
  formularioEnviado = false;
  selectedOption: any = null;
  selectedCountryId: number  = 0;
  selectedCityId: number = 0;
  selectedNationalityId: number = 0;
  selectedModoMigrationId: number = 0;
  selectedRutaMigrationId: number = 0;
  selectedFecha!: Date;
  selectedFechaNac!: Date;
  textoBoton = 'Registrarme';
  ngOnInit(): void {
    //this.selectedOption = null;
    this.selectedOption = this.options[0]; // Opción por defecto después de la carga
    this.listaModoMigracion()
    this.listaPaises()
    this.listaNacionalidades()

    this.listaRutasMigracion()
  }
  constructor(private country: CountriesService, private fb: FormBuilder, private waymigration: WaysMigrationService,
    private authservice: AutenticacionService) {
    this.selectedOption = null;
    this.miFormulario = this.fb.group({
      nombre: ['', [Validators.required]],
      nacionalidad: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      countrySelect: [[0], [Validators.required]],
      genero: [[0], [Validators.required]],
      citySelect: [[0], [Validators.required]],
      numero: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      RutaMigracion: [[0], [Validators.required]],
      ModoMigracion: [[0], [Validators.required]],
      fechaNac: ['', [Validators.required]],
      titulo: ['', [Validators.required]],
      texto_historia: ['', [Validators.required]],

    });
  }

  options = [
    { text: 'Peru', image: 'assets/images/flags/tiny/Peru.png' },
    { text: 'EE.UU', image: 'assets/images/flags/tiny/United_States_of_America.png' },
    // ... Agregar más opciones con rutas de imágenes
  ];

  onOptionSelect(option: any) {
    // Manejar la opción seleccionada
    this.selectedOption = option;
    console.log('Selected:', option);

    //   this.cdr.detectChanges();

  }
  listaPaises() {
    const requestData = {
      request: {
        contry_name: null,
        status: true
      },
      order: {

        column: null,
        mode: null
      },
      page_size: 100,
      pgination_key: 1
    };

    this.country.getCountries(requestData).subscribe(
      response => {
        this.countries = response[0].data;

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

      this.country.getAllCities(req).subscribe(

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

    this.country.getNationalities(requestData).subscribe(
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
  listaModoMigracion() {
    const requestData = {
      request: {
        migration_mode: {
          name: null
        },
        status: true
      },
      order: {

        column: null,
        mode: null
      },
      page_size: 100,
      pgination_key: 1
    };

    this.waymigration.getModesMigration(requestData).subscribe(
      response => {
        console.log('Modos Migracion' + JSON.stringify(response));
        this.modemigrations = response[0].data;
        console.log(this.modemigrations)

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
  onCountrySelect(event: any) {
    const selectedCountryId = event.target.value;
    this.selectedCountryId = selectedCountryId;
    this.listaCiudades();
  }
  onCitySelect(event: any) {
    this.selectedCityId = event.target.value;
  }
  onNationalitySelect(event: any) {
    const selectedNationalityId = event.target.value;
    this.selectedNationalityId = selectedNationalityId
    console.log(this.selectedNationalityId)
  }
  onFecha(event: any) {
    this.selectedFecha = event.target.value;
  }
  onFechaNac(event: any) {
    this.selectedFechaNac = event.target.value;
  }



  onWayMigrationSelect(event: any) {
    this.selectedModoMigrationId = event.target.value;
  }

  onRutaMigrationSelect(event: any) {
    this.selectedRutaMigrationId = event.target.value;
  }

  registroGuia() {
    this.formularioEnviado = true;
    this.textoBoton = 'Esperando registro';
    const { nombre, nacionalidad, apellidos, countrySelect, genero, citySelect, numero, fecha, correo, RutaMigracion, ModoMigracion
      , fechaNac, titulo, texto_historia } = this.miFormulario.value;

    const primeraLetraNombre = nombre.charAt(0);
    const contrasena = `${primeraLetraNombre}12345@`;
    console.log(this.miFormulario.value)

    let req = {
      request: {
        id: 0,
        dni: null,
        name: nombre,
        lastname: apellidos,
        username: correo,
        password: contrasena,
        sexo: genero,
        photo: null,
        status: true,
        phone: numero.toString(),
        birth_date: fechaNac,
        rol: 7,
        mascota:0
      },
      story: {
        story_id: 0,
        country_id: countrySelect,
        city_id: citySelect,
        nationality_id: nacionalidad,
        migration_mode_id: ModoMigracion,
        way_migration_id: RutaMigracion,
        title: titulo,
        arrival_date: fecha,
        story_text: texto_historia,
        status: "PENDING"
      }
    }
    console.log(req)
    this.authservice.registro(req)
      .subscribe(res => {
        console.log(res);
        if (res.msg === "Usuario registrado") {
          this.textoBoton = 'Registrarme';
          Swal.fire('Registro exitoso', 'Gracias por registrarte. Evaluaremos tu registro en un plazo de 48 horas y te enviaremos un correo para que continúes tu proceso'
          , 'success')
          this.formularioEnviado = false;
        } else {
          this.textoBoton = 'Registrarme';
          this.formularioEnviado = false;
          Swal.fire('Error', res.msg, 'error')

        }
      });

  }

}
