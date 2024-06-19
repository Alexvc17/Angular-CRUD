import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {NgForm} from '@angular/forms';
import { Observable } from 'rxjs';

import { HeroModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes-service.service';

import Swal from 'sweetalert2';




@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent {

  heroe = new HeroModel();


  constructor(private heroesService: HeroesService,
    //con estet route ya puedo recibir el argumento que recibo por el url
              private route: ActivatedRoute
    ){ }

  ngOnInit(): void {

    //esta condicion trae todos los datos del heroe a la pagina de heroe y esta asociada a la ruta dinamica de html de heroes
    //ezte id lo tengo que obtener del url
    const id = this.route.snapshot.paramMap.get('id');

    if(id !== 'nuevo' ){

      this.heroesService.getHeroePorId(id!)
          .subscribe((resp:HeroModel) =>{
            this.heroe = resp;
            this.heroe.id = id!;
          })

    }


  }

  guardar(form: NgForm){

    if(form.invalid){
      console.log("Formulario no válido")
      return;

    }

    Swal.fire({
      //evitar que cierre la alerta si hace click afuera
      allowOutsideClick: false,
      icon: 'info',
      title: 'Espere',
      text: 'Guardando informacion',
      showConfirmButton: false

    });
    Swal.showLoading(Swal.getDenyButton());

    let peticion: Observable<any>;

    if(this.heroe.id != null){
      peticion = this.heroesService.actualizarHeroe(this.heroe)
    }else{
      peticion = this.heroesService.crearHeroe(this.heroe)
    }
    //me subscribo y cuando se resuelva respuesta es donde voy a mostrar que el registro se actualizo correctamente
    peticion.subscribe(resp=>{

      Swal.fire({
        allowOutsideClick: false,
        icon: 'success',
        title: this.heroe.nombre,
        text: 'Se actualizo correctamente',
        //showConfirmButton: true

      });

    })

  }



}
