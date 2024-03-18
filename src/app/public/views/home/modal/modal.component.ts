import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { notZeroValidator } from 'src/app/core/directives/not-zero.directive';
import { AutenticacionService } from 'src/app/core/services/autenticacion.service';
import Swal from 'sweetalert2';
import { Cities } from '../../interfaces/cities.interface';
import { Country } from '../../interfaces/countries.interface';
import { Nationalities } from '../../interfaces/nationalities.interface';
import { CountriesService } from '../../services/countries.service';
import { environment } from 'src/environments/environment';
declare var google: any;
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  ocultarpas: boolean = true;
  textoBoton = 'Registrarse';
  formularioEnviado = false;
  countries: Country[] = [];
  paismigra: Country[] = []
  cities: Cities[] = [];
  nationalities: Nationalities[] = []

  // selectedCountryId: number | null = null;
  // selectedCityId: number = 0;
  selectedCountryId: number | null = null;
  selectedCityId: number | null = null;

  selectedNationalityId: number = 0;
  selectedPaisMigraId: number = 0;
  selectedOption: any ;
  options :any;
  miFormulario!: FormGroup;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();  //Salida de evento para cerrar modal
  private clienteid= environment.clientId;

  constructor(private fb:FormBuilder,
    private router:Router,
    private authService:AutenticacionService,private country: CountriesService,
    private activeModal: NgbActiveModal,private modalService: NgbModal){
      this.miFormulario=this.fb.group({
        email:['',[Validators.required,Validators.minLength(5)]],
        password:['',[Validators.required,Validators.minLength(6)]],
        nombre: ['', [Validators.required]],
        apellidos: ['', [Validators.required]],
        fechanac: ['', [Validators.required]],
        genero: ['', [Validators.required, notZeroValidator]],
        nacionalidad: [[0], [Validators.required, notZeroValidator]],
        countrySelect: ['', [Validators.required, notZeroValidator]],
        citySelect: ['', [Validators.required, notZeroValidator]],
        fechatentativa: ['', [Validators.required]],
        numero: ['', [Validators.required]],
        paismigra: [[0], [Validators.required, notZeroValidator]],
      });

    }
  ngOnInit(): void {
    setTimeout(() => {
      google.accounts.id.initialize({
        //we need to get client id, so got to
        client_id: this.clienteid,
        callback: (resp: any) => {
          //u'll get client id and token here
          // u can console here what u will get
          // this.handleLogin(resp);
        },
        cancel_on_tap_outside:false
      });

      google.accounts.id.renderButton(document.getElementById("google-btn"), {
        theme: 'filled_blue',
        size: 'large',
        shape: 'rectangle',
        width: 500
      });

     }, 100);
    this.pasos();
    this.listaPaises();
    this.listaNacionalidades()
  }
  onOptionSelect(option: any) {
    // Manejar la opción seleccionada
    this.selectedOption = option;
    console.log('Selected:', option);

    //   this.cdr.detectChanges();

  }
  registro(){
    console.log(this.miFormulario.value);
    const {email,password,nombre, apellidos, fechanac, genero, nacionalidad, countrySelect, citySelect,
      fechatentativa,numero,paismigra} = this.miFormulario.value;

      const selectedCountry = this.countries.find((option: any) => option.id === countrySelect);
      const codCountry = selectedCountry ? selectedCountry.cod_country : '';

      // Concatena el código de país con el número de teléfono
      const phoneNumber = codCountry + numero.toString();

      if (this.miFormulario.invalid) {
        Swal.fire('Error', 'LLene todos los campos porfavor', 'error')
        return
      }

      const fechaNacimiento = new Date(fechanac);
      const hoy = new Date();
      const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();

      if (edad < 18) {
        Swal.fire('Error', 'Debes ser mayor de 18 años para registrarte.', 'error');
        return; // Detener el proceso de registro
      }


    this.textoBoton = 'Esperando registro';
    this.formularioEnviado = true;

    let req = {
      request: {
        id:0,
        dni:null,
        name:nombre,
        lastname:apellidos,
        username: email,
        password: password,
        sexo:genero,
        photo:null,
        status:true,
        phone:numero.toString(),
        birth_date:fechanac,
        tipo_login:0,
        rol:6
      },
      customer: {
        country_id: countrySelect,
        city_id: citySelect,
        nationality_id: nacionalidad,
        social_network: null,
        country_migration: paismigra,
        family_migration:null,
        date_tentative: fechatentativa
      }

    //  story:''


    };
    let reqlogin= {
      username: email,
      password: password

    };
    //console.log(this.miFormulario.valid);
   // this.router.navigateByUrl('/dashboard');
      this.authService.registro(req)
      .subscribe( res=>{
          console.log(res);
        //  console.log(res[0][0].out_rpta);
        if (res.msg==="Usuario registrado") {
            this.closeModal.emit();
            // this.router.navigate(['/auth/login']);

            this.authService.login(reqlogin).subscribe((res: any) => {
              if (res) {
                this.formularioEnviado = false;
                this.textoBoton = 'Registrarse';
                Swal.fire({
                  title: 'Registrado',
                  text: 'Registro exitoso',
                  icon: 'success',
                  // timer: 2000,
                  // showConfirmButton: false
                }).then(() => {

                    this.router.navigate(['/historias/listado']);
                    setTimeout(() => {
                      location.reload(); // Recarga la página después de 2 segundos
                    }, 1000);


                })
                // setTimeout(() => {
                //   this.router.navigate(['/historias/listado']);
                //   setTimeout(() => {
                //     location.reload(); // Recarga la página después de 2 segundos
                //   }, 1000);
                // }, 2000);

              }
              else {
                this.formularioEnviado = false;
                this.textoBoton = 'Registrarse';
                Swal.fire('Error', res, 'error')
              }
            },
              (error: any) => {
                this.formularioEnviado = false;
                this.textoBoton = 'Registrarse';
                console.error('Error:');
                Swal.fire('Error', 'Datos incorrectos', 'error')
              }
            );


          }
          else {
            this.formularioEnviado = false;
            this.textoBoton = 'Registrarse';

            Swal.fire('Error', "Este usuario ya se encuentra registrado",'error')
          }
      },
      (error: any) => {
      //  console.error('Error:', error);          Swal.fire('Error', 'Datos incorrectos','error')
      }

      );


  }
    ocultarpass1() {
      // a=!a;
       this.ocultarpas = !this.ocultarpas;
     }
     sesion(){
      this.modalService.dismissAll();
      this.router.navigate(['/auth/login']);
     }
     pasos(){
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
          const formStepCircle = document.querySelector(`li[step="${stepNumber}"]`);
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
              const formStepCircle = document.querySelector(`li[step="${index}"]`);
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

              const stepNumber = parseInt(formNavigationBtn.getAttribute("step_number") || "0");
              /**
               * Call the function to navigate to the target form step.
               */
              navigateToFormStep(stepNumber);
          });
        });
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
          this.paismigra = response[0].data;
          this.options = this.countries.map(country => {
            return {
              id: country.id, // o el campo de identificación correspondiente
              text: country.country_name,
              image: `assets/images/flags/tiny/${country.flag_img}`, // Asegúrate de que las imágenes estén ubicadas correctamente
              cod:country.cod_country
            };
          });
          if (this.options && this.options.length > 0) {
            this.selectedOption = {
              id: this.options[0].id,
              text: this.options[0].text,
              image: this.options[0].image,
              cod:this.options[0].cod
            };
          }

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
    onCountrySelect(selectedCountryId: number)  {
      // const selectedCountryId = event.target.value;
      this.selectedCountryId = selectedCountryId;
      this.selectedCityId =null;
      this.listaCiudades();

      if(selectedCountryId){
        const selectedCountryop = this.options.find((option:any) => option.id === selectedCountryId);

        if (selectedCountryop) {
          // Actualiza la variable selectedOption con el país seleccionado
          this.selectedOption = {
            id: selectedCountryop.id,
            text: selectedCountryop.text,
            image: selectedCountryop.image,
            cod:selectedCountryop.cod
          };
        }
      }


    }
    onCitySelect(selectedCityId: number) {
      this.selectedCityId = selectedCityId;
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
    camposVacios(): boolean {
      const emailControl = this.miFormulario.get('email');
      const passwordControl = this.miFormulario.get('password');

      const emailValid = emailControl?.valid && emailControl.value.length >= 5;
      const passwordValid = passwordControl?.valid && passwordControl.value.length >= 6;

      return !emailValid || !passwordValid;
    }
}
