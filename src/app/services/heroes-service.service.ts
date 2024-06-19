import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroModel } from '../models/heroe.model';
import { delay, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = "https://login-app-e5ab8-default-rtdb.firebaseio.com";

  constructor(private http: HttpClient) {}



  //metodo para la insersion
  crearHeroe(heroe: HeroModel){

    //Esta peticion me va a retornar el ID del heroe , hacemos el posteo | url, body
    return this.http.post(`${this.url}/heroes.json`, heroe)
            .pipe(
              map((resp:any) =>{

                //para que el id me aparezca en el campo id en el  html
                heroe.id = resp.name;
                //retorna toda la informacion del heroe
                return heroe
            })

            );
  }

    actualizarHeroe(heroe: HeroModel){

      //rompemos la referencia y la asignamos el modleo heroe a una nueva variable llamada heroeTemp
      const heroeTemp = {
        //el operador spread ... se encargara de tomar cada una de las propiedades heroe y  creara una propiedad con el mismo nombre
        ...heroe
      };

      //y ahora no se borra el id del heroe origina sino de la variable creada
      delete heroeTemp.id;
      //debo acceder al url tal como esta en la estructura de firebase url/heroes/id
      //.json no es obligatorio ya que es propio de firebase
      return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp)

    }

    borrarHeroe(id: string){
      return this.http.delete(`${this.url}/heroes/${id}.json`)
    }


    getHeroes(){
      //hay que filtrar la informacion porque firebase nos trae un objeto y no se puede iterar, asi que usamos map
      return this.http.get(`${this.url}/heroes.json`)
              .pipe(
                map(this.crearArregloHeroes),
                delay(1000)
              );
    }

    getHeroePorId(id: string){

      return this.http.get(`${this.url}/heroes/${id}.json`)
    }


    //voy a recibir los heroes de tipo obj
    private crearArregloHeroes( heroesObj: object | any){
      console.log(heroesObj);
      if(heroesObj === null){
        return [];
      }
      //creo un arreglo de tipo HeroModel
      const heroes: HeroModel [] = [];


    // Obtengo las claves (llaves) del objeto heroesObj y itero sobre ellas
    Object.keys(heroesObj).forEach(key => {

      // Para cada clave (key), obtengo el valor asociado en heroesObj
      const heroe: HeroModel = heroesObj[key];

      // Agrego la propiedad 'id' al objeto heroe y le asigno el valor de la clave (key)
      heroe.id = key;

      // Agrego el objeto heroe modificado al array heroes
      heroes.push(heroe);
    });


      return heroes;
    }



}
