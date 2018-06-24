import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatService } from '../../../services/CatService';
import { Router } from '@angular/router';
import { NullTemplateVisitor } from '@angular/compiler';
import { Cat } from '../../../entities/cat';

@Component({
  selector: 'app-cat-parents-create',
  templateUrl: './cat-parents-create.component.html',
  styleUrls: ['./cat-parents-create.component.css']
})
export class CatParentsCreateComponent implements OnInit {

  createForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private catService: CatService,
    private router: Router) { 
      this.createForm = formBuilder.group({
        'born' : [null, [Validators.required], null],
        'breed' : null,
        'color' : null,
        'name' : null,
        'notes' : null,
        'chipped' : null,
        'vaccinated' : null,
        'pedigree' : null,
        'sex' : null
      });
    }

  create(values: Cat) {
    values.parent = true;
    console.log(values)
    this.catService.create(values).subscribe(x => {
      console.log("create called..")
    });
  }

  ngOnInit() {
  }

}
