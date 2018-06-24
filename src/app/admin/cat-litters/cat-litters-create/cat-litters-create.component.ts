import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Image } from '../../../entities/image';
import { Cat } from '../../../entities/cat';
import { CatService } from '../../../services/CatService';
import { Litter } from '../../../entities/litter';
import { LitterService } from '../../../services/litterService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cat-litters-create',
  templateUrl: './cat-litters-create.component.html',
  styleUrls: ['./cat-litters-create.component.css']
})
export class CatLittersCreateComponent implements OnInit {
  public createForm : FormGroup
  public images: Array<Image> = [];
  public parents: Array<Cat> = [];
  public moms: Array<Cat> = [];
  public dads: Array<Cat> = [];
  
  constructor(
    private formBuilder: FormBuilder,
    private catService: CatService,
    private litterService: LitterService,
    private router: Router) { 
    this.createForm = formBuilder.group({
      'notes' : null,
      'numberOfKittens' : [null, [Validators.required], null],
      'dad' : [null, [Validators.required], null],
      'mom' : [null, [Validators.required], null],
      'born' : [null, [Validators.required], null]
    });
  }

  createLitter(values: any) {
    let litter: Litter = new Litter();
    litter.born = values.born;
    litter.numberOfKittens = values.numberOfKittens;
    litter.notes = values.notes;
    for (let parent of this.parents) {
      if (parent.id == values.dad || parent.id == values.mom) {
        litter.parents.push(parent)
      }
    }
    
    litter.numberOfKittens = values.numberOfKittens;
    this.litterService.create(litter).subscribe(x => {
      this.router.navigate(['/admin'])
    });
  }

  ngOnInit() {
    this.catService.getParents().subscribe(x => {
      this.parents = x;
      for (let i = 0; i < this.parents.length; i++) {
        console.log(this.parents[i].sex);
        if (this.parents[i].sex == "Hane") {
          this.dads.push(this.parents[i]);
        } else {
          this.moms.push(this.parents[i]);
        }
      }
    });
  }
}