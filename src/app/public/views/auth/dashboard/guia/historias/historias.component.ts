import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { StoriesService } from 'src/app/public/views/services/stories.service';
import { Usuario } from '../../../../../../core/interfaces/login.interface';
import { AutenticacionService } from 'src/app/core/services/autenticacion.service';
import { CountriesService } from 'src/app/public/views/services/countries.service';
import { Cities } from 'src/app/public/views/interfaces/cities.interface';
import { Country } from 'src/app/public/views/interfaces/countries.interface';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Nationalities } from 'src/app/public/views/interfaces/nationalities.interface';
import { MigrationMode } from 'src/app/public/views/interfaces/migration_modes.interface';
import { WaysMigrationService } from 'src/app/public/views/services/ways-migration.service';
import { TemasService } from 'src/app/public/views/services/temas.service';
import { WayMigration } from 'src/app/public/views/interfaces/waymigration.interface';
import Swal from 'sweetalert2';
import { ImagenesService } from 'src/app/public/views/services/imagenes.service';
declare var $: any;
@Component({
  selector: 'app-historias',
  templateUrl: './historias.component.html',
  styleUrls: ['./historias.component.css']
})
export class HistoriasComponent implements OnInit {
  @ViewChild('myModalClose') modalClose: any;
  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  @ViewChild('fileInput2') fileInput2: ElementRef | undefined;
  @ViewChild('fileInput3') fileInput3: ElementRef | undefined;
  archivos: any = []
  archivos2: any = []
  archivos3: any = []
  imageSrc!: string;
  imageSrc2!: string;
  imageSrc3!: string;


  historiasporGuia: any[] = [];
  historiaDetalle: any;
  countries: Country[] = []
  cities: Cities[] = []
  nationalities: Nationalities[] = []
  themas: any[] = []
  rutasmigracion: WayMigration[] = []
  modemigrations: MigrationMode[] = []
  selectedCountryId: number | null = null;
  selectedCityId: number = 0;
  //idhistoria: any;

  selectedNationalityId: number = 0;
  selectedModoMigrationId: number = 0;
  selectedRutaMigrationId: number = 0;
  selectedFecha!: Date;
  selectedFile!: File;
  selectedFile2!: File;
  selectedFile3!: File;

  arr: any;
  usuario!: Usuario;
  guiaSelecc: any = '';
  guiasSeleccionadas: any[] = [];
  modalAbierta = false;
  idguia!: any;
  // temasForm!:FormGroup
  array: any[] = [];
  groupThemeIds: any[] = [];
  miFormulario!: FormGroup;

  temasSeleccionados: number[] = [];
  opc: number = 0;
  idhistory: number = 0;



  constructor(private historiaguiaservice: StoriesService, private authService: AutenticacionService,
    private country: CountriesService, private fb: FormBuilder, private waymigration: WaysMigrationService,
    private temas: TemasService, private cdRef: ChangeDetectorRef, private imagenservice: ImagenesService,
    private ngZone: NgZone) {
    // this.temasForm = this.fb.group({});
    this.miFormulario = this.fb.group({
      titulo: ['', [Validators.required]],
      countrySelect: [[-1], [Validators.required]],
      citySelect: [[-1], [Validators.required]],
      Nacionalidad: [[-1], [Validators.required]],
      ModoMigracion: [[-1], [Validators.required]],
      RutaMigracion: [[-1], [Validators.required]],
      texto_historia: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      temas: [this.groupThemeIds, [Validators.required]]

    });
  }
  ngOnInit(): void {
    // this.browse();
    this.GetUsuario()
    this.GetGuiaId()
    this.listahistoriasGuia()
    this.listaPaises()
    this.listaNacionalidades()
    this.listaModoMigracion()
    this.listaRutasMigracion()
    this.obtenerDataTema()
    // this.listaCiudades()



  }

  GetUsuario() {
    //this.usuario =  this.authService.usuario;
    this.usuario = this.authService.getUsuario();
  }
  GetGuiaId() {
    this.idguia = this.authService.getGuia();
    this.idguia = Number(this.idguia.replace(/[^0-9]/g, ''));
  }
  // browse() {

  //   $(document).off("click", ".browse1");
  //   $('.file1').off("change");
  //   $(document).off("click", ".browse2");
  //   $('.file2').off("change");
  //   $(document).off("click", ".browse3");
  //   $('.file3').off("change");


  //   $(document).on("click", ".browse1", function (this: HTMLInputElement, e: Event) {
  //     e.preventDefault();
  //     const file = $(this)
  //       .parent()
  //       .parent()
  //       .parent()
  //       .find(".file1");
  //     file.trigger("click");
  //   });

  //   $('.file1 ').on('change', function (this: HTMLInputElement, e: Event) {
  //     const fileName = (e.target as HTMLInputElement)?.files?.[0]?.name;
  //     // $("#file1").val(fileName);



  //     if (this.files?.length && this.files[0]) {
  //       const reader = new FileReader();
  //       reader.onload = function (e) {
  //         // get loaded data and render thumbnail.
  //         const preview = document.getElementById("preview1") as HTMLImageElement;
  //         preview.src = e?.target?.result as string;
  //       };
  //       // read the image file as a data URL.
  //       reader.readAsDataURL(this.files[0]);
  //     }
  //   });

  //   $(document).on("click", ".browse2", function (this: HTMLInputElement, e: Event) {
  //     e.preventDefault();
  //     const file = $(this)
  //       .parent()
  //       .parent()
  //       .parent()
  //       .find(".file2");
  //     file.trigger("click");
  //   });

  //   $('.file2 ').on('change', function (this: HTMLInputElement, e: Event) {
  //     const fileName = (e.target as HTMLInputElement).files?.[0]?.name;
  //     // $("#file2").val(fileName);



  //     if (this.files?.length && this.files[0]) {
  //       const reader = new FileReader();
  //       reader.onload = function (e) {
  //         // get loaded data and render thumbnail.
  //         const preview = document.getElementById("preview2") as HTMLImageElement;
  //         preview.src = e?.target?.result as string;
  //       };
  //       // read the image file as a data URL.
  //       reader.readAsDataURL(this.files[0]);
  //     }


  //   });

  //   $(document).on("click", ".browse3", function (this: HTMLInputElement, e: Event) {
  //     e.preventDefault();
  //     const file = $(this)
  //       .parent()
  //       .parent()
  //       .parent()
  //       .find(".file3");
  //     file.trigger("click");
  //   });

  //   $('.file3 ').on('change', function (this: HTMLInputElement, e: Event) {
  //     const fileName = (e.target as HTMLInputElement).files?.[0]?.name;
  //     // $("#file3").val(fileName);

  //     if (this.files?.length && this.files[0]) {
  //       const reader = new FileReader();
  //       reader.onload = function (e) {
  //         // get loaded data and render thumbnail.
  //         const preview = document.getElementById("preview3") as HTMLImageElement;
  //         preview.src = e?.target?.result as string;
  //       };
  //       // read the image file as a data URL.
  //       reader.readAsDataURL(this.files[0]);
  //     }

  //   });
  // }

  listahistoriasGuia() {
    const requestData = {
      request: {
        id_user: this.usuario.id
      },
      order: {

        column: null,
        mode: null
      },
      page_size: 100,
      pagination_key: 1
    };

    this.historiaguiaservice.getStoriesGuide(requestData).subscribe(
      response => {
        console.log('historias guia=' + JSON.stringify(response));
        this.historiasporGuia = response[0].data;
        console.log(this.historiasporGuia)
        //if(this.historiasporGuia[0])
         // this.idguia = this.historiasporGuia[0].guide_id

      }


    );

  }

  obtenerDetalleHistoria(guia: any) {

    //this.temas

    this.limpiarFormulario()
    this.opc = 0;
    this.cdRef.detectChanges();
    console.log('formul' + JSON.stringify(this.miFormulario.value))
    this.array = []
    this.historiaDetalle = true
    this.idhistory = guia.id
    const requestData = {
      request: {
        story_id: guia.id,
        status: "APROBADO"
      },
      order: {
        column: null,
        mode: null
      },
      page_size: 10,
      pgination_key: 1
    };

    this.historiaguiaservice.getStoriesDetalle(requestData).subscribe(response => {
      console.log(response.story.data[0].title)
      console.log(response.story.data[0].lastname)
      console.log(response.story.data[0].arrival_date)
      console.log(response.images_story.totalElements)
      console.log(response.group_themes.data)
      // console.log(response.images_story.data.length)
      if (response) {

        this.historiaDetalle = response;
        console.log('a' + this.historiaDetalle)
        this.selectedCountryId = response.story.data[0].contry_id;


        this.selectedCityId = response.story.data[0].city_id;
        this.selectedNationalityId = response.story.data[0].nationality_id;
        this.selectedModoMigrationId = response.story.data[0].migration_mode_id;
        this.selectedRutaMigrationId = response.story.data[0].way_migration_id;
        this.idhistory = response.story.data[0].storie_id
        this.selectedFecha = response.story.data[0].arrival_date
        // this.flagimage1 = response.images_story.data;
        this.guiaSelecc = {
          guia: guia,
          detalles: response
        }

        if (this.guiaSelecc.guia.group_theme_id)
          this.array.push(this.guiaSelecc.guia.group_theme_id)

        console.log("this array:" + this.array)
        console.log(this.guiaSelecc)
        // console.log(this.valorGuiaSelec)
        this.listaCiudades();


        // this.cdr.detectChanges();
      }
      if (response.group_themes.data) {
        this.groupThemeIds = response.group_themes.data.map((theme: { group_themes_id: any; }) => theme.group_themes_id);
        console.log("groupthemeids:" + this.groupThemeIds)
      }
      console.log(response);

      setTimeout(() => {
        if (this.miFormulario.controls['titulo']) {
          this.miFormulario.patchValue({
            titulo: response.story.data[0].title,
            countrySelect: response.story.data[0].contry_id,
            citySelect: response.story.data[0].city_id,
            Nacionalidad: response.story.data[0].nationality_id,
            ModoMigracion: response.story.data[0].migration_mode_id,
            RutaMigracion: response.story.data[0].way_migration_id,
            texto_historia: response.story.data[0].story_text,
            fecha: response.story.data[0].arrival_date,
            temas: this.groupThemeIds,
          });
        }

      },);

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
  onNationalitySelect(event: any) {
    const selectedNationalityId = event.target.value;
    this.selectedNationalityId = selectedNationalityId
    console.log(this.selectedNationalityId)
  }
  onFecha(event: any) {
    this.selectedFecha = event.target.value;
  }



  onWayMigrationSelect(event: any) {
    this.selectedModoMigrationId = event.target.value;
  }

  onRutaMigrationSelect(event: any) {
    this.selectedRutaMigrationId = event.target.value;
  }

  // isSelected(temaId: string): boolean {


  //   return this.array.some(item => item.id === temaId);
  // }

  limpiarDetalle() {


    // this.guiaSelecc=''
    this.groupThemeIds = [],
      this.themas = []
    this.guiaSelecc = {
      guia: {
        id: '',
        group_theme_id: ''

      },
      detalles: ''
    }
    this.obtenerDataTema()
    this.array = []

    //this.historiaDetalle=''
    // this.historiaDetalle = {
    //   story: {
    //     data: [{
    //       storie_id:'',
    //       title: '',
    //       contry_id: 0,
    //       country_name: "",
    //       city_id: 0,
    //       city_name: "",
    //     }]
    //   },

    // }

    this.opc = 0;

    // Otros datos necesarios para el formulario

  }
  limpiarFormulario() {
    // this.guiaSelecc=''
    this.historiaDetalle = false
    this.imageSrc = '';
    this.imageSrc2 = '';
    this.imageSrc3 = ''
    this.groupThemeIds = [],
      this.themas = []
    this.guiaSelecc = {
      guia: {
        id: '',
        group_theme_id: ''

      },
      detalles: ''
    }
    this.obtenerDataTema()
    console.log('aber1:' + this.guiaSelecc.guia.group_theme_id)
    console.log('aber2:' + this.guiaSelecc.guia.id)
    this.array = []
    this.miFormulario = this.fb.group({
      titulo: ['', [Validators.required]],
      countrySelect: [[0], [Validators.required]],
      citySelect: [[0], [Validators.required]],
      Nacionalidad: [[0], [Validators.required]],
      ModoMigracion: [[0], [Validators.required]],
      RutaMigracion: [[0], [Validators.required]],
      texto_historia: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      temas: this.groupThemeIds,
    });
    if (this.historiaDetalle) {
      this.historiaDetalle.story.data[0] = []
      this.historiaDetalle.reviews.data[0] = []
      this.historiaDetalle.rates.data[0] = []
      this.historiaDetalle.images_story.data[0] = []
      this.idhistory = -1;
      // console.log(this.historiaDetalle)
    }
    console.log(this.historiaDetalle)

    // this.historiaDetalle = {
    //   story: {
    //     data: [{
    //       storie_id: '',
    //       title: '',
    //       contry_id: 0,
    //       country_name: "",
    //       city_id: 0,
    //       city_name: "",
    //     }]
    //   },

    // }

    this.opc = 1;
    this.cdRef.detectChanges();

    // Otros datos necesarios para el formulario
  }

  registroHistoria() {
    const { titulo, countrySelect, citySelect, Nacionalidad, ModoMigracion, RutaMigracion, texto_historia, fecha, temas } = this.miFormulario.value;
    console.log(temas)
    // console.log(temas.length)
    console.log(this.miFormulario.value)
    console.log(this.miFormulario)
    console.log(this.groupThemeIds)
    if (this.miFormulario.invalid || this.groupThemeIds.length == 0) {
      Swal.fire('Error', 'LLene todos los campos porfavor', 'error')
      return
    }

    if (this.opc == 0) { // edita
      // console.log("abc")
      if (this.imageSrc == '' && this.imageSrc2 == '' && this.imageSrc3 == '') {
        Swal.fire('Error', 'Debe ingresar almenos una imagen', 'error')
        return
      }
      let req = {
        request: {
          story_id: this.idhistory,
          guide_id: this.idguia,
          user_id: this.usuario.id,
          country_id: countrySelect,
          city_id: citySelect,
          nationality_id: Nacionalidad,
          migration_mode_id: ModoMigracion,
          way_migration_id: RutaMigracion,
          group_theme_id: 8,
          title: titulo,
          arrival_date: fecha,
          story_text: texto_historia,
          rating: 0,
          status: "APROBADO",
          group_themes: this.groupThemeIds!.map((id: any) => ({
            group_theme_id: id
          }))

        }
      }
      this.historiaguiaservice.insertarHistoria(req)
        .subscribe(res => {
          //  console.log(res[0].in_id);
          if (res[0][0].out_rpta === "OK") {
            this.modalClose.nativeElement.click();
            this.listahistoriasGuia()
            Swal.fire('Success', 'Historia editada con exito', 'success')
          } else {
            Swal.fire('Error', 'No se pudo editar historia', 'error')
          }
        });


    }
    else {  //inserta
      if (this.imageSrc == '') {
        Swal.fire('Error', 'Debe ingresar una imagen', 'error')
        return
      }
      let req = {
        request: {
          story_id: 0,
          guide_id: this.idguia,
          user_id: this.usuario.id,
          country_id: countrySelect,
          city_id: citySelect,
          nationality_id: Nacionalidad,
          migration_mode_id: ModoMigracion,
          way_migration_id: RutaMigracion,
          group_theme_id: 8,//temas
          title: titulo,
          arrival_date: fecha,
          story_text: texto_historia,
          rating: 0,
          status: "PENDING",
          // group_themes:{
          //   temasSeleccionados
          // }
          group_themes: this.groupThemeIds!.map((id: any) => ({
            group_theme_id: id
          }))

        }
      }
      console.log(req)
      console.log(this.guiaSelecc.guia.id)
      this.historiaguiaservice.insertarHistoria(req)
        .subscribe(res => {
          console.log(res);
          if (res[0][0].out_rpta === "OK") {
            // const imagen = new FormData();
            // const flagimg1 = 1;

            // try {
            //   this.archivos.forEach((archivo: any) => {
            //     console.log(archivo)
            //     imagen.append('file', archivo)
            //   });
            //   imagen.append('request[story_id]', res[0][0].in_id);
            //   imagen.append('request[flag]', flagimg1.toString());
            //   imagen.append('request[id_user]', this.usuario.id.toString());
            //   console.log(imagen)
            //   this.imagenservice.enviarImageHistoria(imagen).subscribe(
            //     (response) => {
            //       console.log('Imagen subida con éxito:', response);
            //       this.archivos = [];

            //     },
            //     (error) => {
            //       console.error('Error al subir imagen:', error);
            //     }
            //   );

            // } catch (e) {
            //   console.log('ERROR', e)
            // }

            const flagimg1 = 1;
            const flagimg2 = 2;
            const flagimg3 = 3;

            if (this.imageSrc != '') {
              const imagen1 = new FormData();

             this.archivos.forEach((archivo: any) => {
                console.log(archivo)
                imagen1.append('file', archivo)
              });
              imagen1.append('request[story_id]', res[0][0].in_id);
              imagen1.append('request[flag]', flagimg1.toString());
              imagen1.append('request[id_user]', this.usuario.id.toString());

              this.imagenservice.enviarImageHistoria(imagen1).subscribe(
                (response) => {
                  console.log('Imagen 1 subida con éxito:', response);
                },
                (error) => {
                  console.error('Error al subir imagen 1:', error);
                }
              );

            }
            if (this.imageSrc2 != '') {
              const imagen2 = new FormData();
              //imagen2.append('file', this.archivos[1]);

              this.archivos2.forEach((archivo: any) => {
                console.log(archivo)
                imagen2.append('file', archivo)
              });
              imagen2.append('request[story_id]', res[0][0].in_id);
              imagen2.append('request[flag]', flagimg2.toString());
              imagen2.append('request[id_user]', this.usuario.id.toString());
              this.imagenservice.enviarImageHistoria(imagen2).subscribe(
                (response) => {
                  console.log('Imagen 2 subida con éxito:', response);
                },
                (error) => {
                  console.error('Error al subir imagen 2:', error);
                }
              );

            }
            if (this.imageSrc3 != '') {
              const imagen3 = new FormData();
              this.archivos3.forEach((archivo: any) => {
                console.log(archivo)
                imagen3.append('file', archivo)
              });
              imagen3.append('request[story_id]', res[0][0].in_id);
              imagen3.append('request[flag]', flagimg3.toString());
              imagen3.append('request[id_user]', this.usuario.id.toString());
              this.imagenservice.enviarImageHistoria(imagen3).subscribe(
                (response) => {
                  console.log('Imagen 3 subida con éxito:', response);
                },
                (error) => {
                  console.error('Error al subir imagen 3:', error);
                }
              );
            }


            this.modalClose.nativeElement.click();
            this.listahistoriasGuia()
            Swal.fire('!Tu historia ha sido guardada con éxito!', 'Nos tomaremos hasta 72 horas para revisarla. Si tenemos alguna sugerencia, lo haremos por correo', 'success')
          } else {
            Swal.fire('Error', 'No se pudo registrar historia', 'error')
          }
        });
    }
    console.log("abc")



  };




  // onChange(id: string, event: any) {
  //   const arr = this.miFormulario.get('temas') as FormArray;
  //   //  if(this.groupThemeIds)
  //   //  {
  //   //   arr.push(this.groupThemeIds)
  //   //  }
  //   // const arr = <FormArray>this.miFormulario.controls['temas']
  //   const isChecked = (event.target as HTMLInputElement).checked;
  //   console.log(id)
  //   console.log('Valor de isChecked:', isChecked);
  //   if (isChecked) {
  //     arr.push(new FormControl(id));
  //     //this.temasFormControls.push(this.fb.group({id}))
  //     console.log("ab")
  //     this.array.push({ id });

  //   } else {
  //     //if(this.historiaDetalle){
  //     const index = arr.controls?.findIndex(x => x.value == id)
  //     if (index >= 0) {
  //       arr.removeAt(index)
  //       console.log("bc")
  //     }
  //     const arrayIndex = this.array.findIndex((item: any) => item.id == id);
  //     const arrayIndex2 = this.groupThemeIds.findIndex((item: any) => item.id == id);
  //     if (arrayIndex >= 0) {
  //       this.array.splice(arrayIndex, 1);

  //       console.log("ID eliminado del array");

  //     }
  //     if(arrayIndex2>=0){
  //       this.groupThemeIds.splice(arrayIndex,1);
  //       console.log(this.groupThemeIds);
  //     }
  //     //}


  //     //  this.array.pop();
  //   }
  //   console.log('formul' + JSON.stringify(this.miFormulario.value))
  //   console.log(arr.value);
  //   console.log(this.array)

  // }

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
    console.log(this.array);
    console.log(this.groupThemeIds);

  }

  onFileSelected(event: any) {

    const flagimg1 = 1;
    this.selectedFile = event.target.files[0];
    this.archivos.push(this.selectedFile);
    if (this.selectedFile) {
      // cargar la imagen imageSrc
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }


    console.log(event)
    console.log(event.target.files)
    console.log(this.selectedFile)
    console.log(this.archivos)
    //console.log(this.opc)
    if (this.opc == 0) {
      const imagen = new FormData();
      console.log(this.idhistory.toString())
      try {
        this.archivos.forEach((archivo: any) => {
          console.log(archivo)
          imagen.append('file', archivo)
        });
        imagen.append('request[story_id]', this.idhistory.toString());
        imagen.append('request[flag]', flagimg1.toString());
        imagen.append('request[id_user]', this.usuario.id.toString());
        console.log(imagen)
        this.imagenservice.enviarImageHistoria(imagen).subscribe(
          (response) => {
            console.log('Imagen subida con éxito:', response);
            this.archivos = [];

          },
          (error) => {
            console.error('Error al subir imagen:', error);
          }
        );

      } catch (e) {
        console.log('ERROR', e)
      }
    }



  }
  onFileSelected2(event: any) {

    const flagimg = 2;
    this.selectedFile2 = event.target.files[0];
    this.archivos2.push(this.selectedFile2);
    if (this.selectedFile2) {

      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc2 = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile2);
    }
    console.log(event)
    console.log(event.target.files)
    console.log(this.selectedFile2)
    console.log(this.archivos2)

    if (this.opc == 0) {

      const imagen = new FormData();
      console.log(this.idhistory.toString())
      try {
        this.archivos2.forEach((archivo: any) => {
          console.log(archivo)
          imagen.append('file', archivo)
        });
        imagen.append('request[story_id]', this.idhistory.toString());
        /* if (this.historiaDetalle.images_story.data.length != 0) {
           if (this.historiaDetalle.images_story.data[0].flag)
             this.flagimage1 = this.historiaDetalle.images_story.data[0].flag

           else
             this.flagimage1 = 1

         }*/
        imagen.append('request[flag]', flagimg.toString());
        imagen.append('request[id_user]', this.usuario.id.toString());
        console.log(imagen)
        this.imagenservice.enviarImageHistoria(imagen).subscribe(
          (response) => {
            console.log('Imagen subida con éxito:', response);
            this.archivos2 = [];
            // for (const image of this.historiaDetalle.images_story.data) {
            //   if (image.flag === '1') {
            //    // this.imageSrc = this.imagenservice.getImageUrlHistoria(`image_${image.flag}_${image.story_id}`);
            //     this.imageSrc = this.imagenservice.getImageUrlHistoria(image.image_story);
            //     this.archivos=[];
            //     // Haz lo que necesites con imageUrl, por ejemplo, cargar la imagen en un elemento HTML.
            //   }
            // }
            // this.historiaDetalle.images_story.data
            // this.fileInput2!.nativeElement.value = '';
          },
          (error) => {
            console.error('Error al subir imagen:', error);
          }
        );

      } catch (e) {
        console.log('ERROR', e)
      }

    }




  }
  onFileSelected3(event: any) {

    const flagimg = 3;
    this.selectedFile3 = event.target.files[0];
    this.archivos3.push(this.selectedFile3);

    if (this.selectedFile3) {

      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc3 = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile3);
    }

    console.log(event)
    console.log(event.target.files)
    console.log(this.selectedFile3)
    console.log(this.archivos3)
    if (this.opc == 0) {
      const imagen = new FormData();
      console.log(this.idhistory.toString())
      try {
        this.archivos3.forEach((archivo: any) => {
          console.log(archivo)
          imagen.append('file', archivo)
        });
        imagen.append('request[story_id]', this.idhistory.toString());
        /* if (this.historiaDetalle.images_story.data.length != 0) {
           if (this.historiaDetalle.images_story.data[0].flag)
             this.flagimage1 = this.historiaDetalle.images_story.data[0].flag

           else
             this.flagimage1 = 1

         }*/
        imagen.append('request[flag]', flagimg.toString());
        imagen.append('request[id_user]', this.usuario.id.toString());
        console.log(imagen)
        this.imagenservice.enviarImageHistoria(imagen).subscribe(
          (response) => {
            console.log('Imagen subida con éxito:', response);
            this.archivos3 = [];
            // for (const image of this.historiaDetalle.images_story.data) {
            //   if (image.flag === '1') {
            //    // this.imageSrc = this.imagenservice.getImageUrlHistoria(`image_${image.flag}_${image.story_id}`);
            //     this.imageSrc = this.imagenservice.getImageUrlHistoria(image.image_story);
            //     this.archivos=[];
            //     // Haz lo que necesites con imageUrl, por ejemplo, cargar la imagen en un elemento HTML.
            //   }
            // }
            // this.historiaDetalle.images_story.data
          },
          (error) => {
            console.error('Error al subir imagen:', error);
          }
        );

      } catch (e) {
        console.log('ERROR', e)
      }

    }



  }

  openFileInput() {
    if (this.fileInput) {
      const fileInputElement = this.fileInput.nativeElement as HTMLInputElement;
      fileInputElement.click();
    }
  }
  openFileInput2() {
    if (this.fileInput2) {
      const fileInputElement = this.fileInput2.nativeElement as HTMLInputElement;
      fileInputElement.click();
    }
  }
  openFileInput3() {
    if (this.fileInput3) {
      const fileInputElement = this.fileInput3.nativeElement as HTMLInputElement;
      fileInputElement.click();
    }
  }
}









// get temasFormControls(): FormArray {
//   return <FormArray>this.miFormulario.get('temas');
// }





