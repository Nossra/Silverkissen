import { Component, OnInit } from '@angular/core';
import { Cat } from '../../../entities/cat';
import { ActivatedRoute } from '@angular/router';
import { CatService } from '../../../services/CatService';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-cat-parents-edit',
  templateUrl: './cat-parents-edit.component.html',
  styleUrls: ['./cat-parents-edit.component.css']
})
export class CatParentsEditComponent implements OnInit {
  
  parent : Cat;
  private parentId: number;
  parentForm: FormGroup;
  constructor(
    private activatedRoute:ActivatedRoute,
    private catService: CatService,
    private formBuilder: FormBuilder) { 
      this.parentForm = this.formBuilder.group({
        'age' : null,
        'chipped' : null,
        'name' : null,
        'parent' : null,
        'pedigree' : null,
        'vaccinated' : null,
        'notes' : null,
        'breed': null,
        'color' : null,
        'sex' : null
      });
    }

  ngOnInit() {
    this.activatedRoute.params.subscribe(x => {
      this.parentId = x['id'];
    });
    this.catService.findById(this.parentId).subscribe(x => {
      this.parent = x;
      console.log(this.parent)
    });
  }

}
