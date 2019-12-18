import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  newSongs:any[] =  [];
  loading:boolean;
  messageError:string;
  error:boolean;

  constructor(private spotiService:SpotifyService) { 
    this.loading = true;
    this.error = false;
    
  }
  ngOnInit() {
    this.getNewReleases();
  }

  async getNewReleases() {
    (await this.spotiService.getNewReleases())
     .subscribe((data: any) => {
      this.loading = false;
      this.newSongs = data;
     }, (e) => {
      this.loading = false;
      this.error = true;
      this.messageError = e.error.error.message;
      console.log(e);
     });
  }

}







/* this.loading = true;
    this.error = false;

    this.spotiService.getNewReleases()
    .subscribe( (data:any) =>{
      this.newSongs = data;
      this.loading = false;
      this.error = false;
    }, (errorService) => {
      this.error = true;
      this.loading = false;
      this.messageError = errorService.error.error.message;    
    });
  */