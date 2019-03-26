import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private URL_API:string = "https://api.themoviedb.org/3";
  private API_KEY:string = "bc7082ab36eafdab13e91155d6c931d5";
  constructor(private http : Http) { }

  //retornar lista de top rated movies
  getTopRatedMovies(){
    //retorna o resultado baseado na URL da requisiçao
    return this.http.get(`${this.URL_API}/movie/top_rated?api_key=${this.API_KEY}`)
  }
}
