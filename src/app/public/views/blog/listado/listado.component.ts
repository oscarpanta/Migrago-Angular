import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ImagenesService } from '../../services/imagenes.service';
import { StoriesService } from '../../services/stories.service';
import { BlogService } from '../../services/blog.service';
import Swiper from 'swiper';
import { DateService } from 'src/app/core/utils/date.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit{

  resp_historias: any[] = []
  blogs: any[] = []

  nropagina: number = 1; // Página actual
  tamanopagina: number = 9; // Tamaño de página
  totalelementos: number = 0; // Total de elementos
  mostrarLoad: boolean = false;
  titulo=''

  selectedCountryId: number = 0;
  selectedMigrationIds: string = '';
  selectedTemasIds: string = '';
  selectedCityId: number = 0;
  selectedNationalityId: number = 0;
  selectedWayMigrationId: number = 0;
  constructor(private historiasService: StoriesService, private imagenservice: ImagenesService, private blogService: BlogService,
    private fechaservice:DateService) { }

  ngOnInit(): void {
    // this.listaHistorias();
    this.listaBlogs();

  }


  listaBlogs() {

    // if (this.selectedEstado == "")
    //   this.selectedEstado = null

    const requestData = {
      request: {
        blog_id: null,
        user_id: null,
        status: true,
        titulo:this.titulo,
        flag : 1
      },
      order: {
        column: null,
        mode: null
      },
      page_size: this.tamanopagina,
      pgination_key: this.nropagina
    };

    this.blogService.listaBlogs(requestData).subscribe(

      response => {
        //        console.log('hist' + JSON.stringify(response));
        //    this.mostrarLoad=true
        console.log(response);
        this.blogs = response[0].data;

        this.totalelementos = +response[0].totalElements;

        this.blogs.forEach(blog => {

            blog.urlImagen = this.blogService.getImageUrlBlog(blog.imagen);
            blog.created_at=this.fechaservice.formatDateToString(blog.created_at)


        });
      }

    );
  }

  listaHistorias() {
    this.mostrarLoad = false
    const requestData = {
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
        column: "t.id",
        mode: "asc"
      },
      page_size: this.tamanopagina,
      pgination_key: this.nropagina
    };

    this.historiasService.getStories(requestData).subscribe(
      response => {
        console.log('hist' + JSON.stringify(response));
        this.mostrarLoad = true
        this.resp_historias = response[0].data;
        this.totalelementos = +response[0].totalElements;
        this.resp_historias.forEach(historia => {
          if (historia.photo) {

            // this.imagenservice.getImageUrl(historia.photo)
            // this.imagenservice.imageUrl$.subscribe(
            //   (url: string) => {

            //     historia.urlImagen = url.toString();
            //   }
            // );
            historia.urlImagen = this.imagenservice.getImageUrlUser(historia.photo);
          } else {
            historia.urlImagen = 'assets/images/perfiles/profile1.jpg';
          }

          // Obtener la URL de la imagen

          console.log(historia.urlImagen)
        });


        this.resp_historias.forEach(historia => {
          if (historia.image_story.image_story) {
            historia.urlImagenStory = this.imagenservice.getImageUrlHistoria(historia.image_story.image_story);
          } else {
            historia.urlImagenStory = 'assets/images/imagen_prueba.png';
          }



          console.log(historia.urlImagenStory)
        });



      }


    );

  }
  onPageChange(page: number) {
    this.nropagina = page;

    this.listaBlogs();


  }
  onChangeBlog($event: any) {
    const nuevoTitulo = $event.target.value;
    this.titulo=nuevoTitulo
    this.listaBlogs()
  }

}
