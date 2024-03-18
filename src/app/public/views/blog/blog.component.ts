import { Component, OnInit } from '@angular/core';
import { StoriesService } from '../services/stories.service';
import { ImagenesService } from '../services/imagenes.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent  {
  // resp_historias: any[] = []

  // nropagina: number = 1; // Página actual
  // tamanopagina: number = 6; // Tamaño de página
  // totalelementos: number = 0; // Total de elementos
  // mostrarLoad: boolean = false;

  // selectedCountryId: number = 0;
  // selectedMigrationIds: string = '';
  // selectedTemasIds: string = '';
  // selectedCityId: number = 0;
  // selectedNationalityId: number = 0;
  // selectedWayMigrationId: number = 0;
  // constructor(private historiasService: StoriesService,private imagenservice: ImagenesService ){}
  // ngOnInit(): void {
  //   this.listaHistorias();
  // }


  // listaHistorias() {
  //   this.mostrarLoad = false
  //   const requestData = {
  //     request: {
  //       id_country: this.selectedCountryId,
  //       id_city: this.selectedCityId,
  //       id_nationality: this.selectedNationalityId,
  //       id_way_migration: this.selectedWayMigrationId,
  //       id_migration_mode: this.selectedMigrationIds,
  //       id_group_themes: this.selectedTemasIds,

  //       status: "APROBADO"
  //     },
  //     order: {
  //       column: "t.id",
  //       mode: "asc"
  //     },
  //     page_size: 4,
  //     pgination_key: this.nropagina
  //   };

  //   this.historiasService.getStories(requestData).subscribe(
  //     response => {
  //       console.log('hist' + JSON.stringify(response));
  //       this.mostrarLoad = true
  //       this.resp_historias = response[0].data;
  //       this.totalelementos = +response[0].totalElements;
  //       this.resp_historias.forEach(historia => {
  //         if (historia.photo) {

  //           // this.imagenservice.getImageUrl(historia.photo)
  //           // this.imagenservice.imageUrl$.subscribe(
  //           //   (url: string) => {

  //           //     historia.urlImagen = url.toString();
  //           //   }
  //           // );
  //           historia.urlImagen = this.imagenservice.getImageUrlUser(historia.photo);
  //         } else {
  //           historia.urlImagen = 'assets/images/perfiles/profile1.jpg';
  //         }

  //         // Obtener la URL de la imagen

  //         console.log(historia.urlImagen)
  //       });


  //       this.resp_historias.forEach(historia => {
  //         if (historia.image_story.image_story) {
  //           historia.urlImagenStory = this.imagenservice.getImageUrlHistoria(historia.image_story.image_story);
  //         }else{
  //           historia.urlImagenStory = 'assets/images/imagen_prueba.png';
  //         }



  //         console.log(historia.urlImagenStory)
  //       });



  //     }


  //   );

  // }
  // onPageChange(page: number) {
  //   this.nropagina = page;

  //   this.listaHistorias();
  //   //this.filtrado()

  // }


}
