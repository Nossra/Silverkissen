import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild('fileInput') fileInput: ElementRef;
  
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
      'born' : [null, [Validators.required], null],
      'images' : null
    });
  }

  createLitter(values: any) {
    let litter: Litter = new Litter();
    litter.born = values.born;
    litter.numberOfKittens = values.numberOfKittens;
    litter.notes = values.notes;
    litter.status = "Aktiv";
    for (let parent of this.parents) {
      if (parent.id == values.dad || parent.id == values.mom) {
        litter.parents.push(parent)
      }
    }
    if (this.images != undefined) {
      litter.images = this.images;
    }
    litter.numberOfKittens = values.numberOfKittens;
    this.litterService.create(litter).subscribe(x => {
      this.router.navigate(['/admin'])
    });
  }

  
  onFileChange(event) {
    if(event.target.files && event.target.files.length > 0) {
      let files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        let reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onload = () => {
          let image:any = {
            filename: files[i].name,
            filetype: files[i].type,
            value: reader.result
          } 
          this.images.push(image);
        }
      }
    }
  }

  ngOnInit() {
    this.catService.getParents().subscribe(x => {
      this.parents = x;
      for (let i = 0; i < this.parents.length; i++) {
        if (this.parents[i].sex == "Hane") {
          this.dads.push(this.parents[i]);
        } else {
          this.moms.push(this.parents[i]);
        }
      }
    });
  }
}