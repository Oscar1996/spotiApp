import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  constructor(private router:Router) { 

  }

  @Input() items: any[] = [];

  watchArtist(item:any){
    let artistId:string="";

    if(item.type === "artist"){
      artistId = item.id;
    }else{
      artistId = item.artists[0].id;
    }

    this.router.navigate(["/artist", artistId]);
  }



  ngOnInit() {
  }

}
