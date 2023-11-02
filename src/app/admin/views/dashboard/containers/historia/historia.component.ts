import { ChangeDetectorRef, Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomMinTableDirective } from 'src/app/core/directives/custom-min-table.directive';
import { Cities } from 'src/app/public/views/interfaces/cities.interface';
import { Country } from 'src/app/public/views/interfaces/countries.interface';
import { MigrationMode } from 'src/app/public/views/interfaces/migration_modes.interface';
import { Nationalities } from 'src/app/public/views/interfaces/nationalities.interface';
import { WayMigration } from 'src/app/public/views/interfaces/waymigration.interface';
import { CountriesService } from 'src/app/public/views/services/countries.service';
import { ImagenesService } from 'src/app/public/views/services/imagenes.service';
import { StoriesService } from 'src/app/public/views/services/stories.service';
import { TemasService } from 'src/app/public/views/services/temas.service';
import { WaysMigrationService } from 'src/app/public/views/services/ways-migration.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-historia',
  templateUrl: './historia.component.html',
  styleUrls: ['./historia.component.css']
})
export class HistoriaComponent {
  @ViewChild('modalContent') modalContent: any; // Agrega esta línea
  historias: any[] = []
  historiasFiltradas: any[] = [];
  searchTerm: string = '';
  //@Input() pageSize = 4;
  tamanopagina: number = 6;
  //  countries$!: Observable<Country[]>;
  total$: number = 0;
  sortedColumn!: string;
  sortedDirection!: string;
  nropagina: number = 1;

  countries: Country[] = []
  cities: Cities[] = []
  nationalities: Nationalities[] = []
  themas: any[] = []
  rutasmigracion: WayMigration[] = []
  modemigrations: MigrationMode[] = []
  selectedCountryId: number | null = null;
  selectedCityId: number = 0;
  selectedEstado: any = null;
  //idhistoria: any;
  selectedFile!: File;
  selectedFile2!: File;
  selectedFile3!: File;
  archivos: any = []
  archivos2: any = []
  archivos3: any = []
  imageSrc!: string;
  imageSrc2!: string;
  imageSrc3!: string;
  idhistory: number = 0;
  selectedNationalityId: number = 0;
  selectedModoMigrationId: number = 0;
  selectedRutaMigrationId: number = 0;
  selectedFecha!: Date;
  miFormulario!: FormGroup;
  groupThemeIds: any[] = [];
  @ViewChildren(CustomMinTableDirective) headers!: QueryList<CustomMinTableDirective>;

  constructor(public historiasService: StoriesService, private modalService: NgbModal,
    private changeDetectorRef: ChangeDetectorRef, private country: CountriesService, private fb: FormBuilder, private waymigration: WaysMigrationService,
    private temas: TemasService, private imagenservice: ImagenesService,) {
    this.miFormulario = this.fb.group({
      id: ['', [Validators.required]],
      titulo: ['', [Validators.required]],
      countrySelect: [[-1], [Validators.required]],
      citySelect: [[-1], [Validators.required]],
      Nacionalidad: [[-1], [Validators.required]],
      ModoMigracion: [[-1], [Validators.required]],
      RutaMigracion: [[-1], [Validators.required]],
      estado: [[-1], [Validators.required]],
      texto_historia: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      temas: [this.groupThemeIds, [Validators.required]],
      user_created_id: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.listaHistorias()
    this.listaPaises()
    this.listaNacionalidades()
    this.listaModoMigracion()
    this.listaRutasMigracion()
    this.obtenerDataTema()
  }
  listaHistorias() {
    // this.mostrarLoad=false
    // if(this.sek)
    if (this.selectedEstado == "")
      this.selectedEstado = null

    const requestData = {
      request: {
        id_country: 0,
        id_city: 0,
        id_nationality: 0,
        id_way_migration: 0,
        id_migration_mode: "",
        id_group_themes: "",
        status: this.selectedEstado
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
        //        console.log('hist' + JSON.stringify(response));
        //    this.mostrarLoad=true
        this.historias = response[0].data;
        this.historiasFiltradas = this.historias;
        this.total$ = +response[0].totalElements;
        //    this.totalelementos = +response[0].totalElements;
        // this.historias.forEach(historia => {
        //   if (historia.photo) {
        //     historia.urlImagen = this.imagenservice.getImageUrl(historia.photo);
        //   }else{
        //     historia.urlImagen = 'assets/images/perfiles/profile1.jpg';
        //   }

        //   // Obtener la URL de la imagen

        //   console.log(historia.urlImagen)
        // });
        // this.historias.forEach(historia => {
        //   if (historia.image_story.image_story) {
        //     historia.urlImagenStory = this.imagenservice.getImageUrlHistoria(historia.image_story.image_story);
        //   }else{
        //     historia.urlImagenStory = 'assets/images/imagen_prueba.png';
        //   }



        //   console.log(historia.urlImagenStory)
      });
  }


  buscarLocalmente() {
    if (this.searchTerm.trim() === '') {
      this.historiasFiltradas = this.historias; // Si el término de búsqueda está vacío, muestra todas las historias
    } else {
      this.historiasFiltradas = this.historias.filter(historia =>
        historia.title.toLowerCase().includes(this.searchTerm.trim().toLowerCase())
      );
    }
    console.log(this.historiasFiltradas)
  }
  onPageChange(page: number) {
    this.nropagina = page;
    this.listaHistorias();
    //this.filtrado()

  }
  onPageSizeChange() {
    this.listaHistorias();
    this.changeDetectorRef.markForCheck();

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


  obtenerDataTema() {
    const requestData = {
      request: {
        themes_name: "",
        status: true
      },
      order: {
        column: null,
        mode: null
      },
      page_size: 10,
      pgination_key: 1
    };

    this.temas.getDataTema(requestData).subscribe(response => {

      if (response) {

        this.themas = response[0];
        console.log(this.themas)
        console.log(this.themas[0].details.data)
        console.log(this.themas[0].images.data)
      }
    });
  }
  onCountrySelect(event: any) {
    const selectedCountryId = event.target.value;
    this.selectedCountryId = selectedCountryId;
    this.listaCiudades();
  }
  onCitySelect(event: any) {
    this.selectedCityId = event.target.value;
  }

  onChange(id: string, event: any) {
    const arr = this.miFormulario.get('temas') as FormArray;
    const isChecked = (event.target as HTMLInputElement).checked;



    if (isChecked) {
      // arr.push(new FormControl(id));
      // this.array.push({ id });
      this.groupThemeIds.push(Number(id)); // Agrega el mismo valor a groupThemeIds
    }

    else {
      const index = arr.controls?.findIndex(x => x.value == id)
      if (index >= 0) {
        arr.removeAt(index);
      }
      // const arrayIndex = this.array.findIndex((item: any) => item.id == id);
      // if (arrayIndex >= 0) {
      //  // this.array.splice(arrayIndex, 1);
      // }
      const groupThemeIndex = this.groupThemeIds.findIndex(item => parseInt(item) === parseInt(id));
      if (groupThemeIndex >= 0) {
        this.groupThemeIds.splice(groupThemeIndex, 1);
      }
    }
    console.log('formul' + JSON.stringify(this.miFormulario.value));
    console.log(arr.value);
    // console.log(this.array);
    console.log(this.groupThemeIds);

  }
  onEstadoSelect(event: any) {
    this.selectedEstado = event.target.value;
    console.log(this.selectedEstado)
    this.listaHistorias();
  }

  // onFileSelected(event: any) {

  //   const flagimg1 = 1;
  //   this.selectedFile = event.target.files[0];
  //   this.archivos.push(this.selectedFile);
  //   if (this.selectedFile) {
  //     // cargar la imagen imageSrc
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.imageSrc = reader.result as string;
  //     };
  //     reader.readAsDataURL(this.selectedFile);
  //   }


  //   console.log(event)
  //   console.log(event.target.files)
  //   console.log(this.selectedFile)
  //   console.log(this.archivos)
  //   //console.log(this.opc)
  //     const imagen = new FormData();
  //     console.log(this.idhistory.toString())
  //     try {
  //       this.archivos.forEach((archivo: any) => {
  //         console.log(archivo)
  //         imagen.append('file', archivo)
  //       });
  //       imagen.append('request[story_id]', this.idhistory.toString());
  //       imagen.append('request[flag]', flagimg1.toString());
  //       imagen.append('request[id_user]', this.usuario.id.toString());
  //       console.log(imagen)
  //       this.imagenservice.enviarImageHistoria(imagen).subscribe(
  //         (response) => {
  //           console.log('Imagen subida con éxito:', response);
  //           this.archivos = [];

  //         },
  //         (error) => {
  //           console.error('Error al subir imagen:', error);
  //         }
  //       );

  //     } catch (e) {
  //       console.log('ERROR', e)
  //     }




  // }
  // onFileSelected2(event: any) {

  //   const flagimg = 2;
  //   this.selectedFile2 = event.target.files[0];
  //   this.archivos2.push(this.selectedFile2);
  //   if (this.selectedFile2) {

  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.imageSrc2 = reader.result as string;
  //     };
  //     reader.readAsDataURL(this.selectedFile2);
  //   }
  //   console.log(event)
  //   console.log(event.target.files)
  //   console.log(this.selectedFile2)
  //   console.log(this.archivos2)

  //   if (this.opc == 0) {

  //     const imagen = new FormData();
  //     console.log(this.idhistory.toString())
  //     try {
  //       this.archivos2.forEach((archivo: any) => {
  //         console.log(archivo)
  //         imagen.append('file', archivo)
  //       });
  //       imagen.append('request[story_id]', this.idhistory.toString());
  //       /* if (this.historiaDetalle.images_story.data.length != 0) {
  //          if (this.historiaDetalle.images_story.data[0].flag)
  //            this.flagimage1 = this.historiaDetalle.images_story.data[0].flag

  //          else
  //            this.flagimage1 = 1

  //        }*/
  //       imagen.append('request[flag]', flagimg.toString());
  //       imagen.append('request[id_user]', this.usuario.id.toString());
  //       console.log(imagen)
  //       this.imagenservice.enviarImageHistoria(imagen).subscribe(
  //         (response) => {
  //           console.log('Imagen subida con éxito:', response);
  //           this.archivos2 = [];
  //           // for (const image of this.historiaDetalle.images_story.data) {
  //           //   if (image.flag === '1') {
  //           //    // this.imageSrc = this.imagenservice.getImageUrlHistoria(`image_${image.flag}_${image.story_id}`);
  //           //     this.imageSrc = this.imagenservice.getImageUrlHistoria(image.image_story);
  //           //     this.archivos=[];
  //           //     // Haz lo que necesites con imageUrl, por ejemplo, cargar la imagen en un elemento HTML.
  //           //   }
  //           // }
  //           // this.historiaDetalle.images_story.data
  //           // this.fileInput2!.nativeElement.value = '';
  //         },
  //         (error) => {
  //           console.error('Error al subir imagen:', error);
  //         }
  //       );

  //     } catch (e) {
  //       console.log('ERROR', e)
  //     }

  //   }




  // }
  // onFileSelected3(event: any) {

  //   const flagimg = 3;
  //   this.selectedFile3 = event.target.files[0];
  //   this.archivos3.push(this.selectedFile3);

  //   if (this.selectedFile3) {

  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.imageSrc3 = reader.result as string;
  //     };
  //     reader.readAsDataURL(this.selectedFile3);
  //   }

  //   console.log(event)
  //   console.log(event.target.files)
  //   console.log(this.selectedFile3)
  //   console.log(this.archivos3)
  //   if (this.opc == 0) {
  //     const imagen = new FormData();
  //     console.log(this.idhistory.toString())
  //     try {
  //       this.archivos3.forEach((archivo: any) => {
  //         console.log(archivo)
  //         imagen.append('file', archivo)
  //       });
  //       imagen.append('request[story_id]', this.idhistory.toString());
  //       /* if (this.historiaDetalle.images_story.data.length != 0) {
  //          if (this.historiaDetalle.images_story.data[0].flag)
  //            this.flagimage1 = this.historiaDetalle.images_story.data[0].flag

  //          else
  //            this.flagimage1 = 1

  //        }*/
  //       imagen.append('request[flag]', flagimg.toString());
  //       imagen.append('request[id_user]', this.usuario.id.toString());
  //       console.log(imagen)
  //       this.imagenservice.enviarImageHistoria(imagen).subscribe(
  //         (response) => {
  //           console.log('Imagen subida con éxito:', response);
  //           this.archivos3 = [];
  //           // for (const image of this.historiaDetalle.images_story.data) {
  //           //   if (image.flag === '1') {
  //           //    // this.imageSrc = this.imagenservice.getImageUrlHistoria(`image_${image.flag}_${image.story_id}`);
  //           //     this.imageSrc = this.imagenservice.getImageUrlHistoria(image.image_story);
  //           //     this.archivos=[];
  //           //     // Haz lo que necesites con imageUrl, por ejemplo, cargar la imagen en un elemento HTML.
  //           //   }
  //           // }
  //           // this.historiaDetalle.images_story.data
  //         },
  //         (error) => {
  //           console.error('Error al subir imagen:', error);
  //         }
  //       );

  //     } catch (e) {
  //       console.log('ERROR', e)
  //     }

  //   }



  // }

  // openFileInput() {
  //   if (this.fileInput) {
  //     const fileInputElement = this.fileInput.nativeElement as HTMLInputElement;
  //     fileInputElement.click();
  //   }
  // }
  // openFileInput2() {
  //   if (this.fileInput2) {
  //     const fileInputElement = this.fileInput2.nativeElement as HTMLInputElement;
  //     fileInputElement.click();
  //   }
  // }
  // openFileInput3() {
  //   if (this.fileInput3) {
  //     const fileInputElement = this.fileInput3.nativeElement as HTMLInputElement;
  //     fileInputElement.click();
  //   }
  // }

  obtenerDetalleHistoria(guia: any) { }

  editarHistoria(historia: any) {
    this.modalService.open(this.modalContent, { size: 'lg' });


    this.idhistory = historia.id
    const requestData = {
      request: {
        story_id: historia.id,
        //status: "PENDING"
        status: null
      },
      order: {
        column: null,
        mode: null
      },
      page_size: 10,
      pgination_key: 1
    };

    this.historiasService.getStoriesDetalle(requestData).subscribe(response => {

      if (response) {

        this.selectedCountryId = response.story.data[0].contry_id;


        this.selectedCityId = response.story.data[0].city_id;
        this.selectedNationalityId = response.story.data[0].nationality_id;
        this.selectedModoMigrationId = response.story.data[0].migration_mode_id;
        this.selectedRutaMigrationId = response.story.data[0].way_migration_id;
        this.idhistory = response.story.data[0].storie_id
        this.selectedFecha = response.story.data[0].arrival_date

        this.listaCiudades();


        // this.cdr.detectChanges();
      }
      if (response.group_themes.data) {
        this.groupThemeIds = response.group_themes.data.map((theme: { group_themes_id: any; }) => theme.group_themes_id);
        console.log("groupthemeids:" + this.groupThemeIds)
      }
      console.log(response);


      this.miFormulario.patchValue({
        id: response.story.data[0].storie_id,
        titulo: response.story.data[0].title,
        countrySelect: response.story.data[0].contry_id,
        citySelect: response.story.data[0].city_id,
        Nacionalidad: response.story.data[0].nationality_id,
        ModoMigracion: response.story.data[0].migration_mode_id,
        RutaMigracion: response.story.data[0].way_migration_id,
        estado: response.story.data[0].status,
        texto_historia: response.story.data[0].story_text,
        fecha: response.story.data[0].arrival_date,
        temas: this.groupThemeIds,
        user_created_id: response.story.data[0].user_created_id
      });

      console.log(this.miFormulario.value)

      if (response.images_story.data.length > 0) {

        for (const image of response.images_story.data) {
          if (image.flag === '1') {
            this.imageSrc = this.imagenservice.getImageUrlHistoria(image.image_story);
          } else if (image.flag === '2') {
            this.imageSrc2 = this.imagenservice.getImageUrlHistoria(image.image_story);
          } else if (image.flag === '3') {
            this.imageSrc3 = this.imagenservice.getImageUrlHistoria(image.image_story);
          }
        }
        if (!response.images_story.data.some((image: any) => image.flag === '1')) {
          this.imageSrc = '';
        }
        if (!response.images_story.data.some((image: any) => image.flag === '2')) {
          this.imageSrc2 = '';
        }
        if (!response.images_story.data.some((image: any) => image.flag === '3')) {
          this.imageSrc3 = '';
        }
      }
      else {
        this.imageSrc = '';
        this.imageSrc2 = '';
        this.imageSrc3 = ''
      }


    });


    // $('#modalEditarHistoria').modal('show');


    console.log('Editar historia', historia);
  }

  eliminarHistoria(historia: any) {
    // Lógica para eliminar la historia
    console.log('Eliminar historia', historia);
  }
  cerrarModal() {
    this.modalService.dismissAll();
    this.miFormulario.reset();

  }
  registroHistoria() {
    const requestData = {
      request: {
        story_id: this.miFormulario.controls['id'].value,
        status: this.miFormulario.controls['estado'].value,
        user_id: this.miFormulario.controls['user_created_id'].value
      },
    };

    this.historiasService.CambiarEstadoHistoria(requestData).subscribe(response => {
      console.log(response)
      if (response) {

        Swal.fire('Hecho', 'Se ha actualizados.', 'success')
      } else {
        Swal.fire('Error', 'No se pudo registrar', 'error')
      }
    })

  }
}
