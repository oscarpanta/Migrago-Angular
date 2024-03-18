import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { notZeroValidator } from 'src/app/core/directives/not-zero.directive';
import { Usuario } from 'src/app/core/interfaces/login.interface';
import { AutenticacionService } from 'src/app/core/services/autenticacion.service';
import { Cities } from 'src/app/public/views/interfaces/cities.interface';
import { Country } from 'src/app/public/views/interfaces/countries.interface';
import { MigrationMode } from 'src/app/public/views/interfaces/migration_modes.interface';
import { Nationalities } from 'src/app/public/views/interfaces/nationalities.interface';
import { WayMigration } from 'src/app/public/views/interfaces/waymigration.interface';
import { CountriesService } from 'src/app/public/views/services/countries.service';
import { ImagenesService } from 'src/app/public/views/services/imagenes.service';
import { RubroService } from 'src/app/public/views/services/rubro.service';
import { SharedImageService } from 'src/app/public/views/services/shared-image.service';
import { TemasService } from 'src/app/public/views/services/temas.service';
import { WaysMigrationService } from 'src/app/public/views/services/ways-migration.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-perfil-guia',
  templateUrl: './perfil-guia.component.html',
  styleUrls: ['./perfil-guia.component.css']
})
export class PerfilGuiaComponent implements OnInit {
  countries: Country[] = []
  cities: Cities[] = []
  nationalities: Nationalities[] = []
  rutasmigracion: WayMigration[] = []
  modemigrations: MigrationMode[] = []
  rubros: any[] = []
  guia: any[] = [];
  miFormulario!: FormGroup;
  // idusuario : any;
  idguia: any;
  usuario!: Usuario;
  archivos: any = []
  imageSrc!: string;
  formularioEnviado = false;
  textoBoton = 'Guardar';

  selectedOption: any = null;
  selectedCountryId: number | null = null;
  selectedCityId: number = 0;
  selectedNationalityId: number = 0;
  selectedModoMigrationId: number = 0;
  selectedRutaMigrationId: number = 0;
  selectedRubroId: number = 0;
  selectedFecha!: Date;
  selectedFechaNac!: Date;
  guidework!: any;
  guiaTrabajando!: number;
  selectedFile!: File;
  //selectedMigranteId : number=0
  isCountrySelectDisabled: boolean = false;
  constructor(private authService: AutenticacionService,
    private country: CountriesService, private fb: FormBuilder, private waymigration: WaysMigrationService,
    private temas: TemasService, private imagenservice: ImagenesService, private rubroservice: RubroService,
    private sharedImageService: SharedImageService, private router: Router) {
    this.miFormulario = this.fb.group({
      nombre: ['', [Validators.required]],
      nacionalidad: [{ value: [0], disabled: true }, [Validators.required, notZeroValidator]],
      apellidos: ['', [Validators.required]],
      countrySelect: [{ value: [0], disabled: true }, [Validators.required, notZeroValidator]],
      genero: [{ value: [0], disabled: true }, [Validators.required, notZeroValidator]],
      citySelect: [{ value: [0], disabled: true }, [Validators.required, notZeroValidator]],
      numero: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      fechanac: ['', [Validators.required]],
      aplicante: ['', [Validators.required, notZeroValidator]],
      contenido: [[0], [Validators.required]],
      llegadamascota: [[0], [Validators.required]],
      rubro: [[0], [Validators.required, notZeroValidator]],
      guidework: ['0', [Validators.required]],

    });

  }
  ngOnInit(): void {
    this.isCountrySelectDisabled = true;
    this.PasosPerfilGuia();
    // this.entradainput();
    this.GetUsuario()
    this.GetGuiaId()
    this.listaPaises()
    this.listaNacionalidades()
    this.listaModoMigracion()
    this.listaRutasMigracion()
    this.listaRubro()
    this.cargarUsuario()
  }

  PasosPerfilGuia() {
    const navigateToFormStep = (stepNumber: number) => {
      /**
       * Hide all form steps.
       */
      document.querySelectorAll(".form-step").forEach((formStepElement: Element) => {
        formStepElement.classList.add("d-none");
      });

      /**
       * Mark all form steps as unfinished.
       */
      document.querySelectorAll(".form-stepper-list").forEach((formStepHeader: Element) => {
        formStepHeader.classList.add("form-stepper-unfinished");
        formStepHeader.classList.remove("form-stepper-active", "form-stepper-completed");
      });

      /**
       * Show the current form step (as passed to the function).
       */
      const currentFormStep = document.querySelector(`#step-${stepNumber}`);
      if (currentFormStep) {
        currentFormStep.classList.remove("d-none");
      }

      /**
       * Select the form step circle (progress bar).
       */
      const formStepCircle = document.querySelector(`li[step="${stepNumber}"]`);
      if (formStepCircle) {
        /**
         * Mark the current form step as active.
         */
        formStepCircle.classList.remove("form-stepper-unfinished", "form-stepper-completed");
        formStepCircle.classList.add("form-stepper-active");

        /**
         * Loop through each form step circle.
         * This loop will continue up to the current step number.
         * Example: If the current step is 3,
         * then the loop will perform operations for step 1 and 2.
         */
        for (let index = 0; index < stepNumber; index++) {
          /**
           * Select the form step circle (progress bar).
           */
          const formStepCircle = document.querySelector(`li[step="${index}"]`);
          if (formStepCircle) {
            /**
             * Mark the form step as completed.
             */
            formStepCircle.classList.remove("form-stepper-unfinished", "form-stepper-active");
            formStepCircle.classList.add("form-stepper-completed");
          }
        }
      }
    };

    /**
     * Select all form navigation buttons, and loop through them.
     */
    document.querySelectorAll(".btn-navigate-form-step").forEach((formNavigationBtn: Element) => {
      /**
       * Add a click event listener to the button.
       */
      formNavigationBtn.addEventListener("click", (e: Event) => {
        /**
         * Get the value of the step.
         */
        const stepNumber = parseInt(formNavigationBtn.getAttribute("step_number") || "1", 10);

        /**
         * Call the function to navigate to the target form step.
         */
        navigateToFormStep(stepNumber);
      });
    });

    $(document).off("click", ".browse");
    $('input[type="file"]').off("change");

    $(document).on("click", ".browse", function (this: HTMLInputElement, e: Event) {
      e.preventDefault(); // Prevenimos el comportamiento predeterminado del enlace

      const file = $(this)
        .parent()
        .parent()
        .parent()
        .find(".file");
      file.trigger("click");
    });

    $('input[type="file"]').on('change', function (this: HTMLInputElement, e: Event) {

      const fileName = (e.target as HTMLInputElement)?.files?.[0]?.name;
      $("#file").val(fileName!);

      if (this.files?.length && this.files[0]) {
        const reader = new FileReader();
        reader.onload = (event) => {
          // get loaded data and render thumbnail.
          const preview = document.getElementById("preview") as HTMLImageElement;
          preview.src = event?.target?.result as string;
        };
        // read the image file as a data URL.
        reader.readAsDataURL(this.files[0]);
      }
    });

  }
  entradainput() {
    const input = document.getElementById("credit-card-input") as HTMLInputElement;
    input.addEventListener("input", () => input.value = formatNumber(input.value.replaceAll(" ", "")));

    const formatNumber = (number: string): string => number.split("").reduce((seed: string, next: string, index: number) => {
      if (index !== 0 && !(index % 4)) seed += " ";
      return seed + next;
    }, "");
  }
  onOptionSelect(option: any) {
    // Manejar la opción seleccionada
    this.selectedOption = option;
    console.log('Selected:', option);


  }
  listaPaises() {
    const requestData = {
      request: {
        contry_name: null,
        status: true,
        flag_tipo: 1
      },
      order: {

        column: null,
        mode: null
      },
      page_size: 200,
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
        page_size: 2000,
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
  listaRubro() {
    const requestData = {
      request: {
        rubro_id: null,
        in_rubro_name: null,
        status: true
      },
      order: {

        column: null,
        mode: null
      },
      page_size: 100,
      pgination_key: 1
    };

    this.rubroservice.getRubros(requestData).subscribe(
      response => {
        this.rubros = response[0].data;
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
  // onMigranteSelect(event: any) {
  //   this.selectedMigranteId= event.target.value;

  // }
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
  onRubroSelect(event: any) {
    this.selectedRubroId = event.target.value;
  }

  onRutaMigrationSelect(event: any) {
    this.selectedRutaMigrationId = event.target.value;
  }
  GetUsuario() {
    //this.usuario = this.authService.getUsuario();
    this.authService.getUsuario().subscribe((usuario: any) => {
      this.usuario = usuario;
      console.log(this.usuario);
    });
  }
  GetGuiaId() {
    this.idguia = this.authService.getGuia();
  }
  onFileSelected(event: any) {


    this.selectedFile = event.target.files[0];
    this.archivos.push(this.selectedFile);
    // if (this.selectedFile) {
    //   // cargar la imagen imageSrc
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     this.imageSrc = reader.result as string;
    //   };
    //   reader.readAsDataURL(this.selectedFile);
    // }
    console.log(event)
    console.log(event.target.files)
    console.log(this.selectedFile)
    console.log(this.archivos)

    //const imagen = new FormData();

    // try {
    //   this.archivos.forEach((archivo: any) => {
    //     console.log(archivo)
    //     imagen.append('file', archivo)
    //   });
    //   imagen.append('request[id_user]', this.usuario.id.toString());
    //   //const url = '/api/stories/guardar_images';
    //   //const url = '/api/guardar_images';
    //   console.log(imagen)
    //   this.imagenservice.enviarImage(imagen).subscribe(
    //     (response) => {
    //       console.log('Imagen subida con éxito:', response);

    //       this.usuario = {
    //         ...this.usuario,
    //         photo: response.msg
    //       };
    //       localStorage.setItem('userdata', JSON.stringify(this.usuario));
    //       this.imagenservice.getImageUrl(response.msg);
    //       //  console.log(response.msg)
    //       //this.sharedImageService.changeImage(response.msg, imageUrl);
    //     },
    //     (error) => {
    //       console.error('Error al subir imagen:', error);
    //     }
    //   );

    // } catch (e) {
    //   console.log('ERROR', e)
    // }





  }

  cargarUsuario() {
    // if (this.usuario.photo)
    //   this.imageSrc = this.imagenservice.getImageUrl(this.usuario.photo);
    if (this.usuario.photo) {
      this.imageSrc = this.imagenservice.getImageUrlUser(this.usuario.photo);
      // this.imagenservice.getImageUrl(this.usuario.photo)
      // this.imagenservice.imageUrl$.subscribe(
      //   (url: string) => {

      //     this.imageSrc = url.toString();
      //   }
      // );


    }
    else
      this.imageSrc = ''


    let req = {
      request: {
        id_user: this.usuario.id,
      }
    }

    this.authService.getDataGuia(req).subscribe(response => {
      console.log(response[0].id)

      if (response) {

        this.guia = response;
        console.log(this.guia)
        this.selectedCountryId = response[0].country_id;
        this.selectedCityId = response[0].city_id;
        this.guidework = Number(response[0].guide_work);
        this.guiaTrabajando = this.guidework;
        // this.selectedMigranteId =this.guia[0].content_social;
        // this.selectedNationalityId = response.story.data[0].nationality_id;
        //  this.selectedModoMigrationId = response.story.data[0].migration_mode_id;
        //  this.selectedRutaMigrationId = response.story.data[0].way_migration_id;
        // this.selectedFecha=response.story.data[0].arrival_date

        this.listaCiudades();


        // this.cdr.detectChanges();
      }

      this.miFormulario.patchValue({

        nombre: this.usuario.name,
        nacionalidad: this.guia[0].nationality_id,
        apellidos: this.usuario.lastname,
        countrySelect: this.guia[0].country_id,
        genero: this.usuario.sex,
        citySelect: this.guia[0].city_id,
        numero: this.usuario.phone,
        correo: this.usuario.username,
        fechanac: this.usuario.birth_date,
        aplicante: this.guia[0].family_principal,
        contenido: this.guia[0].content_social,
        llegadamascota: this.guia[0].mascota_flag,
        rubro: this.guia[0].rubro_iid,
        guidework: this.guidework
      });
      console.log(this.miFormulario)
      //guide_work

    });



  }


  ActualizarPerfil() {
    // const { nombre, nacionalidad, apellidos, countrySelect, genero, citySelect, numero, correo, fechanac
    //   , aplicante, contenido, llegadamascota, rubro, guidework } = this.miFormulario.value;
    //----


    const countrySelectControl = this.miFormulario.get('countrySelect');
    const citySelectControl = this.miFormulario.get('citySelect');
    const nacionalidadControl = this.miFormulario.get('nacionalidad');
    const generoControl = this.miFormulario.get('genero');
    // Habilitar temporalmente los controles
    countrySelectControl?.enable();
    citySelectControl?.enable();
    nacionalidadControl?.enable();
    generoControl?.enable();

    const { nombre, nacionalidad, apellidos, countrySelect, genero, citySelect, numero, correo, fechanac, aplicante, contenido, llegadamascota, rubro, guidework } = this.miFormulario.value;

    // Deshabilitar nuevamente los controles
    countrySelectControl?.disable();
    citySelectControl?.disable();
    nacionalidadControl?.disable();
    generoControl?.disable();
//----
    console.log(this.miFormulario.value)

    if (this.miFormulario.invalid) {
      Swal.fire('Error', 'LLene todos los campos porfavor', 'error')
      return
    }

    if ((this.archivos.length == 0 || (this.archivos.every((file: any) => file === undefined))) && this.imageSrc == '') {
      Swal.fire('Error', 'Debe insertar una imagen', 'error')
      return
    }

    this.formularioEnviado = true;
    this.textoBoton = 'Esperando registro';


    let req = {
      request: {
        id_user: this.usuario.id,
        id_guide: this.guia[0].id_guia,
        nationality_id: nacionalidad,
        id_nacionalidad: this.guia[0].id_nacionalidad,
        dni: null,
        name: nombre,
        lastname: apellidos,
        username: correo,
        password: "",
        sexo: genero,
        photo: "",
        status: true,
        phone: numero.toString(),
        birth_date: fechanac,
        rol: 7,
        country_id: countrySelect,
        city_id: citySelect,
        mascota: llegadamascota,
        contenido_red_social: contenido,
        guia_trabaja: guidework,
        rubro_id: rubro,
        familia_principal: aplicante,
        tipo_login:0


      }
    }
    console.log(req)
    this.authService.actualizarUsuarioGuia(req)
      .subscribe(async res => {
        console.log(res.msg);
        if (res.msg[0].out_rpta === "OK") {
          //this.lista
          this.usuario = {
            ...this.usuario,
            id: this.usuario.id,
            dni: this.usuario.dni,
            name: nombre,
            lastname: apellidos,
            username: correo,
            sex: genero,
            enabled: true,
            first_session: true,
            cod_gen: this.usuario.cod_gen,
            user_created_id: this.usuario.user_created_id,
            created_at: this.usuario.created_at,
            user_updated_id: this.usuario.user_updated_id,
            updated_at: this.usuario.updated_at,
            phone: numero,
            birth_date: fechanac,
            flagdata: "1"
          };


          // if ((this.archivos.length !== 0 || this.archivos.some((file: any) => file !== undefined)) && this.imageSrc != '') {
          if ((this.archivos.length !== 0 || this.archivos.some((file: any) => file !== undefined))) {
            const imagen = new FormData();


            this.archivos.forEach((archivo: any) => {
              console.log(archivo)
              imagen.append('file', archivo)
            });
            imagen.append('request[id_user]', this.usuario.id.toString());

            console.log(imagen)
            this.imagenservice.enviarImage(imagen).subscribe(
              (response) => {
                console.log('Imagen subida con éxito:', response);
                this.usuario = {
                  ...this.usuario,
                  photo: response.msg
                };
                localStorage.setItem('userdata', JSON.stringify(this.usuario));
                // this.imagenservice.getImageUrl(response.msg)
                // this.imagenservice.imageUrl$.subscribe(
                //   (url: string) => {

                //     //    this.imageSrc = url.toString();

                //     console.log('asgda' + this.imageSrc)
                //   }
                // );

              },
              (error) => {
                console.error('Error al subir imagen:', error);
              }
            );


          }

          localStorage.setItem('userdata', JSON.stringify(this.usuario));

          this.formularioEnviado = false;
          this.textoBoton = 'Guardar';
          this.GetUsuario()
          Swal.fire({
            title: 'Exito',
            text: 'Datos actualizados',
            icon: 'success',
            timer: 2000, // Establece el tiempo en milisegundos (en este caso, 2 segundos)
            showConfirmButton: false // Oculta el botón de confirmación
          });

          setTimeout(() => {
            this.router.navigate(['/auth/dashboardGuia/historias']);
            location.reload();

          }, 2000);

          await this.delay(2000);
          this.router.navigate(['/auth/dashboardGuia/historias']);

          // Recarga la página después de la redirección
          location.reload();



        } else {
          this.formularioEnviado = false;
          this.textoBoton = 'Guardar';
          Swal.fire('Error', 'No se pudo actualizar', 'error')
        }
      });


  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
