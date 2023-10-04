import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

//import { HttpCoreService } from 'src/app/core/services/http-core.service';
//import * as $ from 'jquery';
//import { FilterMultiSelect } from 'filter-multi-select';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CountriesService } from '../../services/countries.service';
import { Cities } from '../../interfaces/cities.interface';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/countries.interface';
import { Nationalities } from '../../interfaces/nationalities.interface';
import { WaysMigrationService } from '../../services/ways-migration.service';
import { WayMigration } from '../../interfaces/waymigration.interface';
import { MigrationMode } from '../../interfaces/migration_modes.interface';
import { StoriesService } from '../../services/stories.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { Themes } from '../../interfaces/themes.interface';
import { ImagenesService } from '../../services/imagenes.service';
declare var $: any;



@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit, AfterViewInit {
  selectedCountryId: number | null = null;

  //@ViewChild('countrySelect') countrySelect?: ElementRef;
  countries: Country[] = []
  cities: Cities[] = []
  nationalities: Nationalities[] = []
  rutasmigracion: WayMigration[] = []
  modemigrations: MigrationMode[] = []
  temas: Themes[] = []
  dropdownSettings: any = {};
  selectedItems: any[] = [];
  selectedItemsTemas: any[] = [];
  serviceLst: any = [];
  selectedModes: any[] = [];

  //citiesss = [];
  selectedCityIds!: string[];
  //selectedMigrationIds:any = [];
  selectedMigrationIds: string = '';
  selectedTemasIds: string = '';
  //selectedCountryId: number = 0; // Para almacenar el id del país seleccionado
  selectedCityId: number = 0; // Para almacenar el id de la ciudad seleccionada
  selectedNationalityId: number = 0; // Para almacenar el id de la nacionalidad seleccionada
  selectedWayMigrationId: number = 0; // Para almacenar el id de la ruta de migración seleccionada
  //selectedItems: { [id: string]: boolean } = {};
  resp_historias: any[] = []

  nropagina: number = 1; // Página actual
  tamanopagina: number = 6; // Tamaño de página
  totalelementos: number = 0; // Total de elementos



  constructor(private http: HttpClient,
    private country: CountriesService, private waymigration: WaysMigrationService,
    private historiasService: StoriesService, private paginationConfig: NgbPaginationConfig, private imagenservice: ImagenesService,) {
    this.paginationConfig.maxSize = 1;
    this.paginationConfig.boundaryLinks = true;
  }
  ngAfterViewInit(): void {
    //this.filtrado();
  }
  // apiUrl = 'http://localhost:8080/api/countries/list';

  ngOnInit(): void {

    this.filtrado();
    this.listaPaises();
    this.listaCiudades();
    this.listaNacionalidades();
    this.listaRutasMigracion();

    this.listaModoMigracion();
    this.listaTemasMigracion();
    this.listaHistorias();

  }




  onMaterialGroupChangeTemas(event: any[]) {

    if (Array.isArray(event)) {
      this.selectedItemsTemas = event;
      const selectedIds = this.selectedItemsTemas.map(item => item.id);
      this.selectedTemasIds = selectedIds.join(',');
      console.log(event);
      console.log(this.selectedTemasIds);
      this.listaHistorias();
      // this.listaHistorias(this.selectedMigrationIds, this.selectedTemasIds,this.selectedCountryId!,this.selectedCityId,this.selectedNationalityId,this.selectedWayMigrationId);
    }
  }


  onMaterialGroupChangeModo(event: any[]) {

    if (Array.isArray(event)) {
      this.selectedItems = event;
      const selectedIds = this.selectedItems.map(item => item.id);
      this.selectedMigrationIds = selectedIds.join(',');
      console.log(event);
      console.log(this.selectedMigrationIds);
      //this.listaHistorias(this.selectedMigrationIds, this.selectedTemasIds);
      this.listaHistorias();
      // this.listaHistorias(this.selectedMigrationIds, this.selectedTemasIds,this.selectedCountryId!,this.selectedCityId,this.selectedNationalityId,this.selectedWayMigrationId);

    }
  }




  filtrado() {

    // const languages = (<any>$('#languages').filterMultiSelect)({

    //   // displayed when no options are selected
    //   placeholderText: "Elige los temas más urgentes para ti",

    //   // placeholder for search field
    //   filterText: "Filtrar",

    //   // Select All text
    //   selectAllText: "Seleccionar Todo",

    //   // Label text
    //   labelText: "",

    //   // the number of items able to be selected
    //   // 0 means no limit
    //   selectionLimit: 0,

    //   // determine if is case sensitive
    //   caseSensitive: false,

    //   // allows the user to disable and enable options programmatically
    //   allowEnablingAndDisabling: true,

    // });
    // const opciones2 = (<any>$('#opciones2').filterMultiSelect)({

    //   // displayed when no options are selected
    //   placeholderText: "Elige el tipo de guía",

    //   // placeholder for search field
    //   filterText: "Filtrar",

    //   // Select All text
    //   selectAllText: "Seleccionar Todo",

    //   // Label text
    //   labelText: "",

    //   // the number of items able to be selected
    //   // 0 means no limit
    //   selectionLimit: 0,

    //   // determine if is case sensitive
    //   caseSensitive: false,

    //   // allows the user to disable and enable options programmatically
    //   allowEnablingAndDisabling: true,

    // });


  }
  // cargarPaises(req: any) {
  //   //const headers = new HttpHeaders().set('Content-Type', 'application/json');
  //   // this.http.post('/api/countries/list?'+req).subscribe(
  //   this.httpCoreService.post(req, '/countries/list').subscribe(
  //     countries => {
  //       //  this.countries = countries
  //       console.log(countries);
  //     }
  //   )
  // }
  // cargar() {
  //   const apiUrl = 'http://localhost:8080/api/countries/list';
  // const body = {
  //   "request": {
  //     "contry_name": null,
  //     "status": true,
  //   },
  //   "order": {
  //     "column": null,
  //     "mode": null,
  //   },
  //   "page_size": 100,
  //   "pgination_key": 1,
  // };

  //   const headers = new HttpHeaders().set('Content-Type', 'application/json');

  //   this.http.post(apiUrl, body, { headers }).subscribe(
  //     (data) => {
  //       console.log('Respuesta:', data);
  //     },
  //     (error) => {
  //       console.error('Error:', error);
  //     }
  //   );
  // }



  //adic
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
        console.log('Paises=' + JSON.stringify(response));
        this.countries = response[0].data;
        console.log(this.countries)
        // console.log('obtenido='+this.countries.id)

      }


      // (response) => {
      //   console.log('Response:', response);
      //   // Aquí puedes manejar la respuesta como desees
      // },
      // (error) => {
      //   console.error('Error:', error);
      //   // Aquí puedes manejar el error
      // }
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
          console.log('Ciudad=' + JSON.stringify(response));
          this.cities = response[0].data;
          console.log(this.cities)

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
  listaTemasMigracion() {
    const requestData = {
      request: {
        themes_name: '',
        status: true
      },
      order: {
        column: null,
        mode: null
      },
      page_size: 100,
      pgination_key: 1
    };

    this.waymigration.getThemes(requestData).subscribe(
      response => {
        console.log('Temas:' + JSON.stringify(response));
        this.temas = response[0].data;
        console.log(this.temas)

      }
    );
  }
  // listaHistorias(idsmigra: string,idstemas:string,idpais:number,idciudad:number,idnacionalidad:number,idruta:number){
  listaHistorias() {
    const requestData = {
      request: {
        id_country: this.selectedCountryId,
        id_city: this.selectedCityId,
        id_nationality: this.selectedNationalityId,
        id_way_migration: this.selectedWayMigrationId,
        id_migration_mode: this.selectedMigrationIds,
        id_group_themes: this.selectedTemasIds,
        // id_country: idpais,
        // id_city:idciudad,
        // id_nationality:idnacionalidad,
        // id_way_migration:idruta,
        // id_migration_mode:"",

        status: "APROBADO"
      },
      order: {
        column: null,
        mode: null
      },
      page_size: this.tamanopagina,
      pgination_key: this.nropagina
    };

    this.historiasService.getStories(requestData).subscribe(
      response => {
        console.log('hist' + JSON.stringify(response));
        this.resp_historias = response[0].data;
        this.totalelementos = +response[0].totalElements;
        this.resp_historias.forEach(historia => {
          if (historia.photo) {
            historia.urlImagen = this.imagenservice.getImageUrl(historia.photo);
          }else{
            historia.urlImagen = 'assets/images/perfiles/profile1.jpg';
          }

          // Obtener la URL de la imagen

          console.log(historia.urlImagen)
        });
        // console.log(this.resp_historias)
        // console.log(this.totalelementos)
      }


    );

  }
  onPageChange(page: number) {
    this.nropagina = page;
    this.listaHistorias();
    //this.filtrado()

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
    this.selectedNationalityId = event.target.value;
  }

  onWayMigrationSelect(event: any) {
    this.selectedWayMigrationId = event.target.value;
  }
  filtrarHistorias() {
    const reqfiltro = {
      request: {
        id_country: this.selectedCountryId,
        id_city: this.selectedCityId,
        id_nationality: this.selectedNationalityId,
        id_way_migration: this.selectedWayMigrationId,
        id_migration_mode: this.selectedMigrationIds,
        id_group_themes: this.selectedTemasIds,
        status: "APROBADO"
      },
      order: {
        column: null,
        mode: null
      },
      page_size: this.tamanopagina,
      pgination_key: this.nropagina
      // Resto del código...
    };
    this.historiasService.getStories(reqfiltro).subscribe(
      response => {
        console.log('hist' + JSON.stringify(response));
        //   console.log('hist' + JSON.stringify(response));
        this.resp_historias = response[0].data;
        this.totalelementos = +response[0].totalElements;
        this.resp_historias.forEach(historia => {
          if (historia.photo) {
            historia.urlImagen = this.imagenservice.getImageUrl(historia.photo);
          }else{
            historia.urlImagen = 'assets/images/perfiles/profile1.jpg';
          }

          // Obtener la URL de la imagen

          console.log(historia.urlImagen)
        });
        // console.log(this.resp_historias)
        // console.log(this.totalelementos)
      }


    );
  }


}




