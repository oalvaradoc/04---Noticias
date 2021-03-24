import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';


@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() enFavoritos;
  @Input() indice: number;

  constructor(private iab: InAppBrowser, private actionSheetCtrol: ActionSheetController, private social: SocialSharing, private datalocalService: DataLocalService) { }

  ngOnInit() {}

  abrirNoticia(){
    // console.log('Noticia ' + this.noticia.url);
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async lanzarMenu()
  {
      let guardarBorrarBtn;

      if(this.enFavoritos){
        guardarBorrarBtn = {
          text: 'Borrar favorito',
          icon: 'trash',
          cssClass: 'action-dark',
          handler: () => {
            console.log('Borrar de favoritos');
            this.datalocalService.borrarNoticias( this.noticia );
          }
        };
      }else{
        guardarBorrarBtn = {
          text: 'Favoritos',
          icon: 'heart',
          cssClass: 'action-dark',
          handler: () => {
            console.log('Favoritos');
            this.datalocalService.guardarNoticias( this.noticia );
          }
        };
      }

    const actionSheet = await this.actionSheetCtrol.create({
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Compartir',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Share clicked');
          this.social.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url
          );
        }
      }, 
      guardarBorrarBtn,
      {
        text: 'Cancel',
        icon: 'close',
        cssClass: 'action-dark',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
