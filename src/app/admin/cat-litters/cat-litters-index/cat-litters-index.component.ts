import { Component, OnInit } from '@angular/core';
import { LitterService } from '../../../services/litterService';
import { Litter } from '../../../entities/litter';
import { FormGroup, FormBuilder, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { Helpers } from '../../../Helpers/helper';
import { Cat } from '../../../entities/cat';
import { HtmlParser } from '@angular/compiler';
import { ImageService } from '../../../services/ImageService';

@Component({
  selector: 'app-cat-litters-index',
  templateUrl: './cat-litters-index.component.html',
  styleUrls: ['./cat-litters-index.component.css']
})
export class CatLittersIndexComponent implements OnInit {
  private litters: Array<Litter>; 
  private birthDates: Array<string> = new Array<string>();
  private parentsArray: Array<Cat> = new Array<Cat>(); 
  private showCards: boolean = false; 
  private loading:boolean = true;
  constructor(
    private litterService: LitterService,
    private imageService: ImageService,
    private router: Router) {
    }

  delete(litter:Litter) {
    this.litterService.delete(litter).subscribe(x => {
      window.location.reload();
    });
  }

  ngOnInit() {
    this.litterService.getAll().subscribe(x => { 
      this.litters = x;  
      for (let litter of this.litters) {
        litter.formattedBirthDate = Helpers.dateHelper(new Date(litter.birthDate));
        litter.statusText = Helpers.statusHelper(litter.status);  
        this.imageService.GetCatLitterImages(litter.id).subscribe(x => { 
          litter.images = x;  
          this.loading = false;
        });
      }  
    });
  } 
  
  customize() { 
    this.showCards = !this.showCards;
  }
  setStatusImage(litter:Litter):string {
    if (litter.status == 0) return "../assets/images/archived.png"
    if (litter.status == 1) return "../assets/images/active.png"
    if (litter.status == 2) return "../assets/images/earlier.png"
  }
}
