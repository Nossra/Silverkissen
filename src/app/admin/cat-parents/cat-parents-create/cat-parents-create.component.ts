import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatService } from '../../../services/CatService';
import { Router } from '@angular/router';
import { NullTemplateVisitor } from '@angular/compiler';
import { Cat } from '../../../entities/cat';
import { Image } from '../../../entities/image';

@Component({
  selector: 'app-cat-parents-create',
  templateUrl: './cat-parents-create.component.html',
  styleUrls: ['./cat-parents-create.component.css']
})
export class CatParentsCreateComponent implements OnInit {

  @ViewChild('fileInput') fileInput: ElementRef;
  createForm: FormGroup;
  public images: Array<Image> = [];
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

  onFileChange(event) {
    this.images = [];
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

  create(values: Cat) {
    values.parent = true;
    values.images = this.images;
    console.log(values)
    this.catService.create(values).subscribe(x => {
      this.router.navigate(['/admin',{outlets:{adminOutlet:'parents'}}])
    });
  }

  ngOnInit() {
  }

}
