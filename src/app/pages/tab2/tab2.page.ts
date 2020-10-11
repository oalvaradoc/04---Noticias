import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { Article } from 'src/app/interfaces/interfaces';
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page // implements OnInit
{


@ViewChild( IonSegment ) segment: IonSegment;

// @ViewChild('segmento', {static: true}) segment: IonSegment;

categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
noticias: Article[] = [];
  constructor(private noticiasService: NoticiasService) {}

  /*ngOnInit(){
    this.segment.value = this.categorias[0];
    this.cargarNoticias( this.segment.value );
  }*/

  ionViewDidEnter() {
    this.segment.value = this.categorias[0];
    this.cargarNoticias( this.categorias[0] );
  }

  cambioCategoria(event){
    this.noticias = [];
    console.log(event.detail.value);
    this.cargarNoticias( event.detail.value );
  }

  cargarNoticias( categoria: string, event? ){

    this.noticiasService.getTopHeadLinesCategoria(categoria)
      .subscribe( resp => {
        // console.log(resp);
        // console.log(this.categorias[0]);
        this.noticias.push(...resp.articles);
        if (event) {
          event.target.complete();
        }
      });
  }

  loadData(event){
    this.cargarNoticias(this.segment.value, event);
  }

}
