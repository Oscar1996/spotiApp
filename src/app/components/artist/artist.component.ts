import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styles: []
})
export class ArtistComponent implements OnInit {

  artist:any = {};
  topTracks:any[] = [];
  loading:boolean;
  constructor(private activatedRoute:ActivatedRoute, private spotiServie:SpotifyService) { 

    this.activatedRoute.params.subscribe(params => this.getArtist(params["id"]));
    this.activatedRoute.params.subscribe(params => this.getTopTracks(params["id"]));
    
  }

  async getArtist(id:string){
   this.loading = true;
   const obs = await this.spotiServie.getArtist(id);
   obs.subscribe((data:any) => {
     this.artist = data;
     this.loading = false;
   });
  }

  async getTopTracks(id:string){
    this.loading = true;
    const obs = await this.spotiServie.getTopTracks(id);
    obs.subscribe((data:any) => {
      this.topTracks = data;
      this.loading = false;
    });
   }

  

  ngOnInit() {
  }

}
