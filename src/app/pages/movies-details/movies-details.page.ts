import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movies-details',
  templateUrl: './movies-details.page.html',
  styleUrls: ['./movies-details.page.scss'],
})
export class MoviesDetailsPage implements OnInit {

  private movie ={};

  constructor(
    private mDBservice: MovieService,
    private loadingController: LoadingController,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.consultaFilme();
  }
  async consultaFilme(){
    //loading
    const loading = await this.loadingController.create({
      message: 'Carregando Filme...'
    });

    await loading.present();

    //resgatar o id passado 'datails/:id'

    await this.mDBservice.getMovies(this.route.snapshot.paramMap.get('id')).subscribe(
      data=>{
        //pega a resposta
         //let resposta = (data as any)._body;
        // converte obj para JSON
         //resposta = JSON.parse(resposta);
        //console.log(resposta);
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
