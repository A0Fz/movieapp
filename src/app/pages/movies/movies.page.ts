import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
  
})
export class MoviesPage implements OnInit {

  movies =  [];
  
  constructor(private mDBservice: MovieService) { }

  ngOnInit() {
    this.topRatedMovies()
  }

  topRatedMovies(){
    this.mDBservice.getTopRatedMovies().subscribe(
      data=>{
        //pega a resposta
        let resposta = (data as any)._body;
        // converte obj para JSON
        resposta = JSON.parse(resposta);
        //console.log(resposta);
        this.movies = resposta;
      },
      error=>{
        console.log(error);
      },
    ).add();
  }

}
