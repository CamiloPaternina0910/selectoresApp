import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesService } from '../../services/paises.service';
import { Pais, PaisSmall } from '../../interfaces/paises.interfaces';
import { switchMap, tap } from 'rxjs';
@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [],
})
export class SelectorPageComponent implements OnInit {
  public regiones: string[] = [];
  public paises: PaisSmall[] = [];
  public fronteras: Pais[] = [];

  myForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    pais: ['', Validators.required],
    fronteras: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private paisesService: PaisesService) {}
  ngOnInit(): void {
    this.regiones = this.paisesService.regiones;
    this.suscribeToPais();
    this.suscibeToRegion();
  }

  suscibeToRegion() {
    this.myForm
      .get('region')
      ?.valueChanges.pipe(
        tap(() => this.myForm.get('pais')?.reset('')),
        switchMap((region) => this.paisesService.getPaisesPorRegion(region))
      )
      .subscribe((paises) => {
        this.paises = paises;
      });
  }

  suscribeToPais() {
    this.myForm
      .get('pais')
      ?.valueChanges.pipe(
        tap(() => (this.fronteras = [])),
        switchMap((codigo) => this.paisesService.getPaisPorCodigo(codigo))
      )
      .subscribe((pais) => {
        pais?.forEach((p) => {
          const borders = p.borders;
          if (borders) {
            borders.forEach((frontera) => {
              this.paisesService
                .getPaisPorCodigo(frontera)
                .subscribe((value) => {
                  console.log(value![0]);
                  this.fronteras.push(value![0]);
                });
            });
          }
        });
      });
  }

  guardar() {}
}
