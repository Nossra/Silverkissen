import { Component, OnInit } from '@angular/core';
import { Cat } from '../../../entities/cat';
import { ActivatedRoute, Router } from '@angular/router';
import { CatService } from '../../../services/CatService';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-cat-parents-edit',
  templateUrl: './cat-parents-edit.component.html',
  styleUrls: ['./cat-parents-edit.component.css']
})
export class CatParentsEditComponent implements OnInit {
  
  parent: Cat;
  private parentId: number;
  parentForm: FormGroup;
  vaccinated:boolean;
  pedigree:boolean;
  chipped:boolean;
  constructor(
    private activatedRoute:ActivatedRoute,
    private catService: CatService,
    private formBuilder: FormBuilder,
    private router:Router) { 
      this.parentForm = this.formBuilder.group({
        'chipped' : null,
        'name' : null,
        'parent' : null,
        'pedigree' : null,
        'vaccinated' : null,
        'notes' : null,
        'breed': null,
        'color' : null,
        'sex' : null,
        'born' : null
      });
    }

  update(values: Cat) {
    console.log(values);
    this.catService.update(values, this.parent.id).subscribe(x => {
      this.router.navigate(['/admin',{outlets:{adminOutlet:'parents'}}])
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(x => {
      this.parentId = x['id'];
    });
    this.catService.findById(this.parentId).subscribe(x => {
      this.parent = x;
      this.pedigree = x["pedigree"]
      this.vaccinated = x["vaccinated"];
      this.chipped = x["chipped"];
    });
  }

}
