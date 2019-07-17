import { Component, OnInit } from '@angular/core';
import { LitterService } from '../../../services/litterService';
import { Litter } from '../../../entities/litter';
import { FormGroup, FormBuilder, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { Helpers } from '../../../Helpers/helper';
import { Cat } from '../../../entities/cat';
import { HtmlParser } from '@angular/compiler';

@Component({
  selector: 'app-cat-litters-index',
  templateUrl: './cat-litters-index.component.html',
  styleUrls: ['./cat-litters-index.component.css']
})
export class CatLittersIndexComponent implements OnInit {
  private litters: Array<Litter>; 
  private birthDates: Array<string> = new Array<string>();
  private parentsArray: Array<Cat> = new Array<Cat>(); 
  constructor(
    private litterService: LitterService,
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
      } 
      console.log(this.litters);
    });
  }    
}
