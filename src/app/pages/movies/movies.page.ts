import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { LoadingController } from '@ionic/angular'

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
  
})
export class MoviesPage implements OnInit {

  movies =  [];
  private arrayCategory = ["upcoming", "top_rated", "popular", "now_playing"];
  private movie_name:string;
  constructor(private mDBservice: MovieService,private loadingController: LoadingController) { }

  ngOnInit() {
    this.consultaFilmes()
  }

  async consultaFilmes(index?){
    //loading
    const loading = await this.loadingController.create({
      message: 'Carregando Filmes...'
    });

    index = (typeof index === 'undefined') ? 3 : Math.floor(Math.random() * 4);
    let param = (typeof this.movie_name === 'undefined') ? `movie/${this.arrayCategory[index]}?` : `search/movie?query=${this.movie_name}&include_adult=false&`;
    //https://www.themoviedb.org/3/movie/upcoming?api_key=${this.API_KEY}&languagept-BR
    await loading.present();

    await this.mDBservice.getMovies(param).subscribe(
      data=>{
        //pega a resposta
         //let resposta = (data as any)._body;
        // converte obj para JSON
         //resposta = JSON.parse(resposta);
        //console.log(resposta);
        this.movies = data.results;
        loading.dismiss();
      },
      error=>{
        console.log(error);
        loading.dismiss();
      }
    ).add();
  }
  doRefresh(event) {
    this.consultaFilmes();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
}

  //exibeMsg(id:string){
    //console.log(`O id do filme clicado é : ${id}`);
  //}


