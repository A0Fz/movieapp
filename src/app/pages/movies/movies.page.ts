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
  private param:string = "top_rated"
  constructor(private mDBservice: MovieService,private loadingController: LoadingController) { }

  ngOnInit() {
    this.consultaFilmes()
  }

  async consultaFilmes(){
    //loading
    const loading = await this.loadingController.create({
      message: 'Carregando Filmes...'
    });

    await loading.present();

    await this.mDBservice.getMovies(this.param).subscribe(
      data=>{
        //pega a resposta
         //let resposta = (data as any)._body;
        // converte obj para JSON
         //resposta = JSON.parse(resposta);
        //console.log(resposta);
        this.movies = data;
        loading.dismiss();
      },
      error=>{
        console.log(error);
        loading.dismiss();
      }
    ).add();
  }

}
