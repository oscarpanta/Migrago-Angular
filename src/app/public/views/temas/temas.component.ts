import { Component, OnInit } from '@angular/core';
import { TemasService } from '../services/temas.service';

@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.css']
})
export class TemasComponent implements OnInit{
  Temas:any[]=[]
 // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  constructor(private temasService:TemasService){}
  ngOnInit(): void {
    this.obtenerDataTema()
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

    this.temasService.getDataTema(requestData).subscribe(response => {

      if (response) {

        this.Temas = response[0];
        console.log(this.Temas)
        console.log(this.Temas[0].details.data)
        console.log(this.Temas[0].images.data)
      }
    });
  }
  formatDescriptionThemes(detailsData: any[]): string {
    const themes = detailsData.map((detail) => detail.description_theme);

    if (themes.length === 1) {
      return themes[0];
    } else if (themes.length === 2) {
      return themes.join(' y ');
    } else {
      const lastTheme = themes.pop(); // Remover el último tema
      return themes.join(', ') + ' y ' + lastTheme;
    }
  }
}
