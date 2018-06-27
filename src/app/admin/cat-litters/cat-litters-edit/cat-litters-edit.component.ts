import { Component, OnInit } from '@angular/core';
import { Litter } from '../../../entities/litter';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LitterService } from '../../../services/litterService';
import { Image } from '../../../entities/image';
import { Cat } from '../../../entities/cat';
import { CatService } from '../../../services/CatService';
import { LitterStatus } from '../../../entities/LitterStatus';

@Component({
  selector: 'app-cat-litters-edit',
  templateUrl: './cat-litters-edit.component.html',
  styleUrls: ['./cat-litters-edit.component.css']
})
export class CatLittersEditComponent implements OnInit {

  public litter: Litter;
  public litterID: number;
  public litterForm: FormGroup;
  public kittenForm: FormGroup;
  public parentsForm: FormGroup;
  public vaccinated: boolean;
  public chipped: boolean;
  public pedigree: boolean;
  constructor(
    private litterService: LitterService,
    private catService: CatService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private formBuilder: FormBuilder) {
      this.litterForm = formBuilder.group({
        'notes' : null,
        'kittens' : null,
        'parents' : null,
        'pedigree' : null,
        'vaccinated' : null,
        'chipped' : null,
        'imageUrls' : null,
        'status' : null,
      });

      this.kittenForm = formBuilder.group({
        'name' : null,
        'sex' : null,
        'color' : null
      });

      this.parentsForm = formBuilder.group({
        'name' : null,
        'sex' : null,
        'color' : null
      });
    }

  update(litter: Litter) {
    this.litterService.update(litter, this.litterID).subscribe(x => {
      this.router.navigate(['/admin',{outlets:{adminOutlet:'litters'}}])
    });
  }

  updateKitten(kitten: Cat, id:number) {
    this.catService.update(kitten, id).subscribe(x => {
      window.location.reload();
    })
  }

  ngOnInit() {
    this.activatedRouter.params.subscribe(x => {
      this.litterID = x["id"];
    });
    this.litterService.getLitterById(this.litterID).subscribe(x => {
      this.litter = x;
      this.vaccinated = x["vaccinated"];
      this.pedigree = x["pedigree"];
      this.chipped = x["chipped"];
      console.log(this.litter);
    })
  }
}