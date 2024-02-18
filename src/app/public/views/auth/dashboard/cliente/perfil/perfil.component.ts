
import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import { WaysMigrationService } from 'src/app/public/views/services/ways-migration.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  countries: Country[] = []
  paismigra: Country[] = []
  cities: Cities[] = []
  nationalities: Nationalities[] = []
  cliente: any[] = [];
  miFormulario!: FormGroup;
  // idusuario : any;
  idcliente: any;
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
  selectedFecha!: Date;
  selectedFechaNac!: Date;
  selectedPaisMigraId: number = 0;
  selectedFile!: File;
  ngOnInit(): void {
    this.pasosPerfilCliente(),
      this.GetUsuario()
    this.GetClienteId()
    this.listaPaises()
    this.listaNacionalidades()

    this.cargarUsuario()
  }
  constructor(private authService: AutenticacionService,
    private country: CountriesService, private fb: FormBuilder,
    private imagenservice: ImagenesService, private cdr: ChangeDetectorRef) {
    this.miFormulario = this.fb.group({
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      fechanac: ['', [Validators.required]],
      genero: [[0], [Validators.required, notZeroValidator]],
      nacionalidad: [[0], [Validators.required, notZeroValidator]],
      countrySelect: [[0], [Validators.required, notZeroValidator]],
      citySelect: [[0], [Validators.required, notZeroValidator]],
      migrafamilia: [[0], [Validators.required, notZeroValidator]],
      fechatentativa: ['', [Validators.required]],
      redsocial: [[0], [Validators.required, notZeroValidator]],
      paismigra: [[0], [Validators.required, notZeroValidator]],
    });
    //this.miFormulario.controls['correo'].disable();
  }

  pasosPerfilCliente() {

    /**
 * Define a function to navigate betweens form steps.
 * It accepts one parameter. That is - step number.
 */
    const navigateToFormStep = (stepNumber: number): void => {
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
      document.querySelector("#step-" + stepNumber)?.classList.remove("d-none");
      /**
       * Select the form step circle (progress bar).
       */
      const formStepCircle = document.querySelector('li[step="' + stepNumber + '"]');
      /**
       * Mark the current form step as active.
       */
      formStepCircle?.classList.remove("form-stepper-unfinished", "form-stepper-completed");
      formStepCircle?.classList.add("form-stepper-active");
      /**
       * Loop through each form step circles.
       * This loop will continue up to the current step number.
       * Example: If the current step is 3,
       * then the loop will perform operations for step 1 and 2.
       */
      for (let index = 0; index < stepNumber; index++) {
        /**
         * Select the form step circle (progress bar).
         */
        const formStepCircle = document.querySelector('li[step="' + index + '"]');
        /**
         * Check if the element exist. If yes, then proceed.
         */
        if (formStepCircle) {
          /**
           * Mark the form step as completed.
           */
          formStepCircle.classList.remove("form-stepper-unfinished", "form-stepper-active");
          formStepCircle.classList.add("form-stepper-completed");
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
      formNavigationBtn.addEventListener("click", () => {
        /**
         * Get the value of the step.
         */

        const stepNumber = parseInt(formNavigationBtn.getAttribute("step_number") || "0", 10);

        /**
         * Call the function to navigate to the target form step.
         */
        navigateToFormStep(stepNumber);
      });
    });

    $(document).off("click", ".browse");
    $('input[type="file"]').off("change");

    $(document).on("click", ".browse", function (this: HTMLElement) {
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
        this.paismigra = response[0].data;

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
  onPaisMigraSelect(event: any) {
    const selectedpaisID = event.target.value;
    this.selectedPaisMigraId = selectedpaisID
    console.log(this.selectedPaisMigraId)
  }

  onFecha(event: any) {
    this.selectedFecha = event.target.value;
  }
  onFechaNac(event: any) {
    this.selectedFechaNac = event.target.value;
  }
  GetUsuario() {

    //this.usuario = this.authService.getUsuario();
    this.authService.getUsuario().subscribe((usuario: any) => {
      this.usuario = usuario;
      console.log(this.usuario);
    });
  }
  GetClienteId() {
    this.idcliente = this.authService.getCliente();
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
    //   console.log(this.imageSrc)
    // }
    console.log(event)
    console.log(event.target.files)
    console.log(this.selectedFile)
    console.log(this.archivos)

    // const imagen = new FormData();

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
    //      // this.imagenservice.getImageUrl(response.msg);

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


    console.log(this.usuario.name)
    console.log(this.usuario.id)
    let req = {
      request: {
        id_user: this.usuario.id,
      }
    }

    this.authService.getDataCliente(req).subscribe(response => {
      console.log(response[0].id)

      if (response) {

        this.cliente = response;
        console.log(this.cliente)
        this.selectedCountryId = response[0].country_id;
        this.selectedCityId = response[0].city_id;
        this.selectedNationalityId = response[0].nationality_id;
        this.selectedPaisMigraId = response[0].country_migration;
        this.listaCiudades();


      }
      const formattedDate = new Date(this.cliente[0].date_tentative).toISOString().substr(0, 10);
      this.miFormulario.patchValue({
        nombre: this.usuario.name,
        apellidos: this.usuario.lastname,
        correo: this.usuario.username,
        fechanac: this.usuario.birth_date,
        genero: this.usuario.sex,
        nacionalidad: this.cliente[0].nationality_id,
        countrySelect: this.cliente[0].country_id,
        citySelect: this.cliente[0].city_id,
        migrafamilia: this.cliente[0].family_migration,
        fechatentativa: formattedDate,
        redsocial: this.cliente[0].social_network_id,
        paismigra: this.cliente[0].country_migration
      });


    });



  }

  ActualizarPerfil() {
    const { nombre, apellidos, correo, fechanac, genero, nacionalidad, countrySelect, citySelect, migrafamilia,
      fechatentativa, redsocial, paismigra } = this.miFormulario.value;



    console.log(this.miFormulario.value)
    console.log(this.idcliente)
    console.log(this.cliente[0].id)


    if (this.miFormulario.invalid) {
      Swal.fire('Error', 'LLene todos los campos porfavor', 'error')
      return
    }
    console.log(this.archivos)
    // if ((this.archivos.length == 0 || (this.archivos.every((file: any) => file === undefined))) && this.imageSrc == '') {
    //   Swal.fire('Error', 'Debe insertar una imagen', 'error')
    //   return
    // }

    this.formularioEnviado = true;
    this.textoBoton = 'Esperando registro';

    let req = {
      request: {
        id_user: this.usuario.id,
        // id_customer: this.cliente[0].id,
        id_customer: this.cliente[0].customer_id,
        dni: null,
        name: nombre,
        lastname: apellidos,
        username: correo,
        password: "",
        sexo: genero,
        photo: "",
        status: true,
        phone: this.usuario.phone,
        birth_date: fechanac,
        rol: 6,
        country_id: countrySelect,
        city_id: citySelect,
        nationality_id: nacionalidad,
        social_network: redsocial,
        country_migration: paismigra,
        family_migration: migrafamilia,
        date_tentative: fechatentativa,
        tipo_login:0


      }
    }
    this.authService.actualizarUsuarioCliente(req)
      .subscribe(
        res => {
          console.log(res);
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
              phone: this.usuario.phone,
              birth_date: fechanac
            };


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

                  // this.imagenservice.getImageUrl(this.usuario.photo)
                  // this.imagenservice.imageUrl$.subscribe(
                  //   (url: string) => {

                  //         this.imageSrc = url.toString();
                  //     this.cdr.detectChanges();
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
            this.GetUsuario()
            //  this.imagenservice.getImageUrl(this.usuario.photo)



            this.formularioEnviado = false;
            this.textoBoton = 'Guardar';
            //this.imagenservice.getImageUrl(this.usuario.photo)

            Swal.fire({
              title: 'Exito',
              text: 'Datos actualizados',
              icon: 'success',
              timer: 2000, // Establece el tiempo en milisegundos (en este caso, 2 segundos)
              showConfirmButton: false // Oculta el botón de confirmación
            });


            setTimeout(() => {
              location.reload();
            }, 2000);


          } else {
            this.formularioEnviado = false;
            this.textoBoton = 'Guardar';

            Swal.fire('Error', 'No se pudo actualizar', 'error')
          }
        },
        error => {
          this.formularioEnviado = false;
          this.textoBoton = 'Guardar';
          console.error("Error al actualizar:", error);
          // Agregar código de manejo de error aquí
        }
      );
  }
}
