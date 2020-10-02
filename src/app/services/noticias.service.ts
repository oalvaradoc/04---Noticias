import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor( private http: HttpClient ) { }


  getTopHeadLines(){
    return this.http.get(`http://newsapi.org/v2/top-headlines?country=co&category=business&apiKey=e3d64365f82847928bd9f654fae1936e`);
  }

}
