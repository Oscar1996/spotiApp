import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  artists:any[] = [];
  loading:boolean;

  constructor(private spotifyService:SpotifyService) { 
    
   
  }

  ngOnInit() {
  }

  async search(value:string){
    this.loading = true;
    const obs = await this.spotifyService.getArtists(value);
    obs.subscribe( (data:any) => {
      this.artists = data;
      this.loading = false;
    });
  }

}
