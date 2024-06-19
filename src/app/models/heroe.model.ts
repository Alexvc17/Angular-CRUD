export class HeroModel{

  id?: string;
  nombre?: string;
  poder?: string;
  vivo?: boolean;


  constructor(){
    //Cuando cree una istancia de este modelo.. por defecto vivo va a ser igual a true
    this.vivo=true;
  }

}
