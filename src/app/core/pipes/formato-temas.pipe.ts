import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoTemas'
})
export class FormatoTemasPipe implements PipeTransform {

  transform(detailsData: any): string {

    console.log('tem')
    console.log(detailsData)
    const themes = detailsData.map((detail:any) => detail.description_theme);

    if (themes.length === 1) {
      return themes[0];
    } else if (themes.length === 2) {
      return themes.join(' y ');
    } else {
      const lastTheme = themes.pop(); // Remover el último tema
      return themes.join(', ') + ' y ' + lastTheme;
    }

  }
  // formatDescriptionThemes(detailsData: any[]): string {
  //   console.log('tem')
  //   const themes = detailsData.map((detail) => detail.description_theme);

  //   if (themes.length === 1) {
  //     return themes[0];
  //   } else if (themes.length === 2) {
  //     return themes.join(' y ');
  //   } else {
  //     const lastTheme = themes.pop(); // Remover el último tema
  //     return themes.join(', ') + ' y ' + lastTheme;
  //   }
  // }

}
