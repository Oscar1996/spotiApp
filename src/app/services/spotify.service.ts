import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";
// import configFile from '../../static/config.json';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private httpClient:HttpClient) { 
    console.log("Servicio funcionando");
  }


  async getQuery(query:string){
    const token = await this.getToken();
    const url = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${token}`
    });
    return this.httpClient.get(url, { headers });
  }

  getToken() {
    const client_id = '20775997b4bc443387f5471696e634b2';
    const client_secret = 'f5c00c2cb2fd43b2bea5ac554153aa3e';
 
    const url = `https://tokinnn.herokuapp.com/spotify/${client_id}/${client_secret}`;
 
    const prom = this.httpClient.get(url).toPromise().then((data: any) => data.access_token);
    return prom;
}

  async getNewReleases(){
    
    const obs = await this.getQuery("browse/new-releases?limit=40&offset=5"); 
    return obs.pipe(map((data:any) =>  data.albums.items));
  };

  async getArtists(artist:string){
    
    const obs = await this.getQuery(`search?q=${ artist }&type=track%2Cartist&market=US&limit=40&offset=5`);
    return obs.pipe(map((data:any) => data.artists.items));
  };

  async getArtist(id:string){
    
    const obs = await this.getQuery(`artists/${id}`)
    return obs.pipe(map((data:any) => data));
  };

  async getTopTracks(id:string){
    
    const obs = await this.getQuery(`artists/${id}/top-tracks?country=us`)
    return obs.pipe(map((data:any) => data.tracks));
  };
}

