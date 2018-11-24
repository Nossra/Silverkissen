import { Component, OnInit } from '@angular/core';
import { Litter } from '../entities/litter';
import { LitterService } from '../services/litterService';
import { Cat } from '../entities/cat';
import { CatService } from '../services/CatService';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  private litterCount: number;
  public litterTextCount: string;
  public parents: Cat[] = new Array<Cat>();
  
  constructor(
    private litterService: LitterService,
    private catService: CatService) { }

  ngOnInit() {
    this.litterService.getActiveLitters().subscribe(x => {
      this.litterCount = x.length;
      this.litterTextCount = this.numberToText(this.litterCount);
    });
    this.catService.getParents().subscribe(x => {
      this.parents = x;
    });
  }

  public numberToText(amountOfLitters: number) {
    switch(amountOfLitters) {
      case 0 : return "Noll kullar";
      case 1 : return "En kull"; 
      case 2 : return "Två kullar"; 
      case 3 : return "Tre kullar"; 
      case 4 : return "Fyra kullar"; 
      case 5 : return "Fem kullar"; 
      case 6 : return "Sex kullar"; 
      default : return "Vi har mer än sex kullar"; 
    }
  }

}
