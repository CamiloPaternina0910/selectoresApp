import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { PaisesService } from '../../services/paises.service';
import { PaisSmall } from '../../interfaces/paises.interfaces';
import { catchError } from 'rxjs';
@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit{

  public regiones : string[] = []
  public paises : PaisSmall[] = []

  myForm: FormGroup = this.fb.group({
    region : ['']
  })

  constructor(private fb : FormBuilder,
    private paisesService: PaisesService){

  }
  ngOnInit(): void {
    this.regiones = this.paisesService.regiones;

    this.myForm.get('region')?.valueChanges
    .subscribe(region => {
      this.paisesService.getPaisesPorRegion(region)
      .pipe(
        catchError(() => this.paises = [])
      )
      .subscribe(paises => {
        console.log(paises)
        this.paises=paises
      })
    })
  }

  guardar(){

  }
}
