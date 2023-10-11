import { ChangeDetectorRef, Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CustomMinTableDirective } from 'src/app/core/directives/custom-min-table.directive';
import { CountriesService } from 'src/app/public/views/services/countries.service';


@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
  styleUrls: ['./pais.component.css']
})
export class PaisComponent implements OnInit{
  countries: any[] = []
  //@Input() pageSize = 4;
  tamanopagina:number = 6;
//  countries$!: Observable<Country[]>;
  total$:number = 0;
  sortedColumn!: string;
  sortedDirection!: string;
  nropagina:number = 1;
  @ViewChildren(CustomMinTableDirective) headers!: QueryList<CustomMinTableDirective>;

  constructor(public countryService: CountriesService,
    private changeDetectorRef: ChangeDetectorRef){

    }
  ngOnInit(): void {
    this.listaPaises()
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
      page_size: this.tamanopagina,
      pgination_key:  this.nropagina
    };

    this.countryService.getCountries(requestData).subscribe(
      response => {
        this.countries = response[0].data;
        //this.countries = response[0];
        this.total$ = +response[0].totalElements;
        console.log(this.countries)
      }

    );
  }
  onPageChange(page: number) {
    this.nropagina = page;
    this.listaPaises();
    //this.filtrado()

  }
  onPageSizeChange() {
    this.listaPaises();
    this.changeDetectorRef.markForCheck();

  }

}
