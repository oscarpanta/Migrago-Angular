import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomMinTableDirective } from 'src/app/core/directives/custom-min-table.directive';
import { Usuario } from 'src/app/core/interfaces/login.interface';
import { AutenticacionService } from 'src/app/core/services/autenticacion.service';
import { Cities } from 'src/app/public/views/interfaces/cities.interface';
import { Country } from 'src/app/public/views/interfaces/countries.interface';
import { MigrationMode } from 'src/app/public/views/interfaces/migration_modes.interface';
import { Nationalities } from 'src/app/public/views/interfaces/nationalities.interface';
import { WayMigration } from 'src/app/public/views/interfaces/waymigration.interface';
import { BlogService } from 'src/app/public/views/services/blog.service';
import { CountriesService } from 'src/app/public/views/services/countries.service';
import { ImagenesService } from 'src/app/public/views/services/imagenes.service';
import { StoriesService } from 'src/app/public/views/services/stories.service';
import { TemasService } from 'src/app/public/views/services/temas.service';
import { WaysMigrationService } from 'src/app/public/views/services/ways-migration.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent  {

  opc: number = 0;
  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  @ViewChild('modalContent') modalContent: any;
  usuario!: Usuario;

  blogs: any[] = []
  blogsFiltradas: any[] = [];
  searchTerm: string = '';
  categorias: any[] = [];
  selectedItems: any[] = [];
  selectedMigrationIds: string = '';
  tamanopagina: number = 6;

  total$: number = 0;

  nropagina: number = 1;
  formularioEnviado = false;
  textoBoton = 'Guardar cambios';


  selectedEstado: any = null;
  //idhistoria: any;
  selectedFile!: File;

  archivos: any = []

  imageSrc!: string;

  idhistory: number = 0;

  miFormulario!: FormGroup;

  @ViewChildren(CustomMinTableDirective) headers!: QueryList<CustomMinTableDirective>;

  constructor(private modalService: NgbModal,
    private changeDetectorRef: ChangeDetectorRef, private country: CountriesService, private fb: FormBuilder, private waymigration: WaysMigrationService,
    private temas: TemasService, private imagenservice: ImagenesService, private authService: AutenticacionService,
    private blogService:BlogService) {
    this.miFormulario = this.fb.group({
      id: ['', [Validators.required]],
      titulo: ['', [Validators.required]],

      estado: [[-1], [Validators.required]],
      // user_created_id: ['', [Validators.required]],
      textobreve: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      // categoria: ['', [Validators.required]],
      categoria: [[], [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.GetUsuario()
    this.listaBlogs()
    this.listaCategorias()
  }

  GetUsuario() {

    // this.usuario = this.authService.getUsuario();
    this.authService.getUsuario().subscribe((usuario:any) => {
     this.usuario = usuario;
     console.log(this.usuario);
   });
   }

  listaBlogs() {

    // if (this.selectedEstado == "")
    //   this.selectedEstado = null

    const requestData = {
      request: {
        blog_id: null,
        user_id: null,
        status: true,
        titulo:"",
        flag : null
      },
      order: {
        column:null,
        mode: null
      },
      page_size: 100,
      pgination_key: 1
    };

    this.blogService.listaBlogs(requestData).subscribe(

      response => {
        //        console.log('hist' + JSON.stringify(response));
        //    this.mostrarLoad=true
        console.log(response);
        this.blogs = response[0].data;
        this.blogsFiltradas = this.blogs;
        this.total$ = +response[0].totalElements;

        //    this.totalelementos = +response[0].totalElements;
        // this.blogs.forEach(historia => {
        //   if (historia.photo) {
        //     historia.urlImagen = this.imagenservice.getImageUrl(historia.photo);
        //   }else{
        //     historia.urlImagen = 'assets/images/perfiles/profile1.jpg';
        //   }

        //   // Obtener la URL de la imagen

        //   console.log(historia.urlImagen)
        // });
        // this.blogs.forEach(historia => {
        //   if (historia.image_story.image_story) {
        //     historia.urlImagenStory = this.imagenservice.getImageUrlHistoria(historia.image_story.image_story);
        //   }else{
        //     historia.urlImagenStory = 'assets/images/imagen_prueba.png';
        //   }



        //   console.log(historia.urlImagenStory)
      });
  }

  listaCategorias() {
    const requestData = {
      request: {
        category_id:null,
        status: true,
        titulo:null
      },
      order: {

        column: null,
        mode: null
      },
      page_size: 100,
      pgination_key: 1
    };

    this.blogService.listaCategorias(requestData).subscribe(
      response => {
        console.log('Modos Migracion' + JSON.stringify(response));
        this.categorias = response[0].data;
        console.log(this.categorias)

      }
    );
  }

  buscarLocalmente() {
    if (this.searchTerm.trim() === '') {
      this.blogsFiltradas = this.blogs; // Si el término de búsqueda está vacío, muestra todas las blogs
    } else {
      this.blogsFiltradas = this.blogs.filter(historia =>
        historia.title.toLowerCase().includes(this.searchTerm.trim().toLowerCase())
      );
    }
    console.log(this.blogsFiltradas)
  }
  onPageChange(page: number) {
    this.nropagina = page;
    this.listaBlogs();
    //this.filtrado()

  }
  onPageSizeChange() {
    this.listaBlogs();
    this.changeDetectorRef.markForCheck();

  }


  abrirModal() {
    // this.modalService.open( { size: 'lg' });
    this.imageSrc = ''
    this.modalService.open(this.modalContent, { backdrop: 'static', keyboard: false, ariaLabelledBy: 'modal-basic-Register' }).result.then(

    );
  }
  registroBlog() {
    //const { titulo, countrySelect, citySelect, Nacionalidad, ModoMigracion, RutaMigracion, texto_historia, fecha, temas } = this.miFormulario.value;
    const { id, titulo, estado, textobreve, descripcion,fecha,categoria } = this.miFormulario.value;

    const categoriasString = categoria.join(',');

    console.log(categoriasString);


    this.formularioEnviado = true;
    this.textoBoton = 'Esperando registro';


      // console.log("abc")
      if (this.imageSrc == '') {
        this.formularioEnviado = false;
        this.textoBoton = 'Guardar cambios';
        Swal.fire('Error', 'Debe ingresar almenos una imagen', 'error')
        return
      }

      if (this.opc == 0){


        console.log('abcd')
        const imagen1 = new FormData();

        this.archivos.forEach((archivo: any) => {
          console.log(archivo)
          imagen1.append('file', archivo)
        });

         imagen1.append('blog_id', '0');

        imagen1.append('user_id', this.usuario.id.toString());
        imagen1.append('title', titulo);
        imagen1.append('text_breve', textobreve);
        imagen1.append('text_blog', descripcion);
        imagen1.append('status',estado);
        imagen1.append('fecha_publicacion',fecha);
        imagen1.append('categorias',categoriasString);
        this.blogService.registrarBlog(imagen1).subscribe(
          (response) => {
            this.formularioEnviado = false;
            this.textoBoton = 'Guardar cambios';
            this.cerrarModal()
            this.listaBlogs()

            Swal.fire('Hecho', 'Blog registrado correctamente', 'success');
          },
          (error) => {
            this.formularioEnviado = false;
            this.textoBoton = 'Guardar cambios';
            this.cerrarModal()
            Swal.fire('Error', 'Ha ocurrido un error', 'error');

          }
        );
      }


      else{

        console.log('abcd2')
        console.log(titulo)
        const imagen1 = new FormData();

        console.log(this.archivos)
        if(this.archivos.length==0)
          {
            // const emptyFile = new File([], 'empty.txt', { type: 'text/plain' });
            // imagen1.append('file', emptyFile);
            // imagen1.append('file', '')
          }


       else{
        this.archivos.forEach((archivo: any) => {
          console.log(archivo)
          imagen1.append('file', archivo)
        });
       }


        imagen1.append('blog_id', id);

        imagen1.append('user_id', this.usuario.id.toString());
        imagen1.append('title', titulo);
        imagen1.append('text_breve', textobreve);
        imagen1.append('text_blog', descripcion);
        imagen1.append('status',estado);
        imagen1.append('fecha_publicacion',fecha);
        imagen1.append('categorias',categoriasString);

        console.log(id)
        console.log( this.usuario.id.toString())
        this.blogService.actualizarBlog(imagen1).subscribe(
          (response) => {
            console.log(response)
            this.formularioEnviado = false;
            this.textoBoton = 'Guardar cambios';
            this.cerrarModal()
            this.listaBlogs()
            Swal.fire('Hecho', 'Blog registrado correctamente', 'success');
          },
          (error) => {
            this.formularioEnviado = false;
            this.textoBoton = 'Guardar cambios';
            this.cerrarModal()
            Swal.fire('Error', 'Ha ocurrido un error', 'error');

          }
        );
      }



  }


  onEstadoSelect(event: any) {
    this.selectedEstado = event.target.value;
    console.log(this.selectedEstado)
    this.listaBlogs();
  }

  onFileSelected(event: any) {

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
    // const imagen = new FormData();
    // console.log(this.idhistory.toString())
    // try {
    //   this.archivos.forEach((archivo: any) => {
    //     console.log(archivo)
    //     imagen.append('file', archivo)
    //   });
    //   imagen.append('request[story_id]', '227');
    //   imagen.append('request[flag]','2');
    //   imagen.append('request[id_user]', '375');
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




  }

  openFileInput() {
    const fileInputElement = document.createElement('input');
    fileInputElement.type = 'file';
    fileInputElement.accept = '.jpg, .png';
    fileInputElement.addEventListener('change', (event) => this.onFileSelected(event));
    fileInputElement.click();
  }
  // openFileInput() {
  //   this.fileInput!.nativeElement.click();
  // }

  editarBlog(blog: any) {
    this.modalService.open(this.modalContent, { backdrop: 'static', keyboard: false, ariaLabelledBy: 'modal-basic-Register' }).result.then(

    );
    this.opc = 1;


      console.log(blog)
    // if (this.selectedEstado == "")
    //   this.selectedEstado = null

    const requestData = {
      request: {
        blog_id: blog.id,
        user_id: null,
        status: true,
        titulo:"",
        flag : null
      },
      order: {
        column:null,
        mode: null
      },
      page_size: 100,
      pgination_key: 1
    };

    this.blogService.listaGetBlog(requestData).subscribe(

      response => {
        console.log(response);
      console.log( response[0].data[0].title,)

       const categoriasSeleccionadas = blog.detalle.map((categoria: any) => categoria.id);
       const formattedDate = new Date(response[0].data[0].fecha_publication).toISOString().substr(0, 10);
      this.miFormulario.patchValue({
        id: response[0].data[0].id,
        titulo:  response[0].data[0].title,
        estado:  response[0].data[0].status,
        textobreve:response[0].data[0].text_breve_blog,
        descripcion: response[0].data[0].text_blog,
        // categoria:['1','2']
         categoria:categoriasSeleccionadas,
         fecha:formattedDate
      });
      console.log(this.miFormulario.value)
     // console.log(this.miFormulario)
       this.imageSrc = this.blogService.getImageUrlBlog(response[0].data[0].imagen);

      });





  }

  eliminarblog(historia: any) {
    // Lógica para eliminar la historia
    console.log('Eliminar historia', historia);
  }
  cerrarModal() {
    this.modalService.dismissAll();
    this.miFormulario.reset();

  }

  onMaterialGroupChangeModo(event: any[]) {

    if (Array.isArray(event)) {
      this.selectedItems = event;
      const selectedIds = this.selectedItems.map(item => item.id);
      this.selectedMigrationIds = selectedIds.join(',');
      console.log(event);
      console.log(this.selectedMigrationIds);
      console.log(this.miFormulario.get('categoria'))
    }

  }


}
