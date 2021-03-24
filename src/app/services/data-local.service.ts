import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
 
@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];

  constructor(private storage:Storage, public toastController: ToastController) { 
    this.cargarFavoritos();
   }

   async presentToast( message: string ) {
    const toast = await this.toastController.create({
      message,
      duration: 1500
    });
    toast.present();
  }

  guardarNoticias(noticia: Article){

    const existe = this.noticias.find( noti => noti.title === noticia.title );

    if(!existe){
      this.noticias.unshift( noticia );
      this.storage.set('favoritos', this.noticias );
    }
    this.presentToast('Agregado a favoritos');
  }

  borrarNoticias(noticia: Article){
    this.noticias = this.noticias.filter ( noti => noti.title !== noticia.title);
    this.storage.set('favoritos', this.noticias);
    this.presentToast('Borrado de favoritos');
  }

  async cargarFavoritos(){
    const favoritos =await this.storage.get('favoritos');

    if(favoritos){
      this.noticias = favoritos; 
    }
  

  }

}
