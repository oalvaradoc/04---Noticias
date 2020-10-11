import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaTopHeadLines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';


const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlinesPages = 0;

  categoriaActual = '';
  categoriaPage = 0;

  constructor( private http: HttpClient ) { }

  private ejecutarQuery<T>(query: string){

    query = apiUrl + query;

    return this.http.get<T>(query, { headers });
  }


  getTopHeadLines(){
    this.headlinesPages ++;
    // return this.http.get<RespuestaTopHeadLines>(`/top-headlines?country=co&category=business&apiKey=e3d64365f82847928bd9f654fae1936e`);
    return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=co&page=${ this.headlinesPages }`);
  }

  getTopHeadLinesCategoria(categoria: string){

    if (this.categoriaActual === categoria ) {
      this.categoriaPage++;
    }
    else{
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }
    // return this.http.get<RespuestaTopHeadLines>(`/top-headlines?country=us&apiKey=e3d64365f82847928bd9f654fae1936e`);
    return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=co&category=${categoria}&page=${ this.categoriaPage }`);
  }

}
