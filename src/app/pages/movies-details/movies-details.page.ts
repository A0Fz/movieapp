import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { RateService } from 'src/app/services/rate.service';

@Component({
  selector: 'app-movies-details',
  templateUrl: './movies-details.page.html',
  styleUrls: ['./movies-details.page.scss'],
})
export class MoviesDetailsPage implements OnInit {

  private movie ={};
  private avaliacao = {
    "id" : null,
    "movie_id": this.route.snapshot.paramMap.get('id'),
    "rating": null
  };

  constructor(
    private mDBservice: MovieService,
    private loadingController: LoadingController,
    private route: ActivatedRoute,
    private rate: RateService
    ) { }

  ngOnInit() {
    this.consultaFilme();
  }

  async registraAvaliacao(){
    await this.rate.addRate(this.avaliacao).subscribe(
      result=>{
        this.consultaFilme();
      },
      error=>{
        console.log(error);
      }
    )
  }

  async consultaFilme(){
    //loading
    const loading = await this.loadingController.create({
      message: 'Carregando Filme...'
    });

    await loading.present();

    //resgatar o id passado 'datails/:id'

    await this.mDBservice.getMovies(`movie/${this.route.snapshot.paramMap.get('id')}?`).subscribe(
      data=>{
       
        this.movie = data;
        console.log(this.movie);
        loading.dismiss();
      },
      error=>{
        console.log(error);
        loading.dismiss();
      }
    ).add();
  }

}
