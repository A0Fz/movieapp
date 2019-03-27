import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private URL_API:string = "https://api.themoviedb.org/3";
  private API_KEY:string = "bc7082ab36eafdab13e91155d6c931d5";
  constructor(private http : HttpClient) { }

  
  //função terá retorno do tipo observable
  getMovies(param:string):Observable<any> {
    const url = `${this.URL_API}/movie/${param}?api_key=${this.API_KEY}`
    return this.http.get<any>(url).pipe(
      tap(_ => console.log(`O parametro requisitado foi : ${param}`)),
      catchError(this.handleError<any>(`Falha no getMovies parametro = ${param}`))
    );
  }

  private handleError<T>(Operator = 'operation', result?: T){         
    return (error:any):Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }

  
}
