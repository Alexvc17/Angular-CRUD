import { Component } from '@angular/core';
import { HeroModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent {

  heroes: HeroModel[] = [];
  cargando: boolean = false;

  constructor(private heroesService: HeroesService){}


  ngOnInit(): void {

    this.cargando = true;
    //para que se dispare llamo al subscribe
    this.heroesService.getHeroes().subscribe(resp =>{

      this.heroes = resp
      //para que cuando cargue la informacion cargando se ponga en falso
      this.cargando= false;


    })

  }

  borrarHeroe(heroe: HeroModel, i: number){

    Swal.fire({
      title: `Quieres borrar a ${heroe.nombre}?`,
      showDenyButton: true,
      confirmButtonText: "Borrar",
      denyButtonText: "Cancelar"
    }).then((result) => {

      if (result.isConfirmed) {
        //voy a comenzar en la posicion i y voy a borrar solo 1 elemento
        this.heroes.splice(i,1);
        this.heroesService.borrarHeroe(heroe.id!).subscribe();
        Swal.fire("Borrado!", " ", "success");
      } else if (result.isDenied) {
        Swal.fire("Sin cambios", "", "info");
      }
    });



  }

}
