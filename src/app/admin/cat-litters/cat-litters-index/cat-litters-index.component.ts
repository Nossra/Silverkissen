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
  public litters: Array<Litter>; 
  public birthDates: Array<string> = new Array<string>();
  public parentsArray: Array<Cat> = new Array<Cat>(); 
  public showCards: boolean = false; 
  public loading:boolean = true;
  public statusColor:string;
  constructor(
    public litterService: LitterService,
    public imageService: ImageService, 
    public router: Router) {
    }

  delete(litter:Litter) {
    this.litterService.delete(litter).subscribe(x => {
      this.router.navigate(['/admin',{outlets:{adminOutlet:'litters'}}])
    });
  } 

  ngOnInit() {
    this.litterService.getAll().subscribe(x => { 
      this.litters = x;  
      for (let litter of this.litters) {
        litter.formattedBirthDate = Helpers.dateHelper(new Date(litter.birthDate));
        litter.statusText = Helpers.statusHelper(litter.status);  
        this.loading = false;
        // this.imageService.GetCatLitterImages(litter.id).subscribe(x => { 
        //   litter.images = x;  
        //   this.loading = false;
        // });
      }  
    });
  } 


  
  customize() { 
    this.showCards = !this.showCards;
  }
  setStatusColor(litter:Litter):string {
    if (litter.status == 0) return "#c52828"  //return "../assets/images/archived.png"
    if (litter.status == 1) return "#11e646"  //return "../assets/images/active.png"
    if (litter.status == 2) return "#3960cc"  //return "../assets/images/earlier.png"
  }
}
