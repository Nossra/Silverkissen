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
 
  public createForm: FormGroup;
  public imagesToAdd: Array<Image> = [];
  public displayPicture: Image;
  public loadedImages: boolean = false;
  public loadedDisplayPicture:boolean = false;
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('fileInput') fileInputDisplayPicture: ElementRef;

  constructor(public formBuilder: FormBuilder,
    public catService: CatService,
    public router: Router) { 
      this.createForm = formBuilder.group({
        'birthdate' : [null, [Validators.required], null],
        'breed' : null,
        'color' : null,
        'name' : null,
        'notes' : null,
        'chipped' : true,
        'vaccinated' : true,
        'pedigree' : true,
        'sex' : [null, [Validators.required], null]
      });
    }

    onFileChangeDisplayPicture(event) {
      this.displayPicture = new Image;
      this.loadedDisplayPicture = false;
      if(event.target.files && event.target.files.length > 0) {
        let files = event.target.files;
        for (let i = 0; i < files.length; i++) {
          let reader = new FileReader();
          reader.readAsDataURL(files[i]);
          reader.onload = () => {
            let image:Image = {
              filename: files[i].name,
              filetype: files[i].type,
              value: reader.result,
              displayPicture: true
            } 
            this.displayPicture = image;
            this.loadedDisplayPicture = true;
          }
        }
      }
    }
   
    onFileChange(event) {
      this.imagesToAdd = [];
      this.loadedImages = false;
      if(event.target.files && event.target.files.length > 0) {
        let files = event.target.files;
        for (let i = 0; i < files.length; i++) {
          let reader = new FileReader();
          reader.readAsDataURL(files[i]);
          reader.onload = () => {
            let image:Image = {
              filename: files[i].name,
              filetype: files[i].type,
              value: reader.result,
              displayPicture: false
            } 
            this.imagesToAdd.push(image);
            this.loadedImages = true;
          }
        }
      }
    }

  create(values: Cat) {
    values.parent = true;
    if (this.imagesToAdd.length > 0) {
      values.images = this.imagesToAdd; 
    }
    if (this.loadedDisplayPicture) {
      values.images.push(this.displayPicture);
    }
    this.catService.create(values).subscribe(x => {
      this.router.navigate(['/admin',{outlets:{adminOutlet:'parents'}}])
    });
  }

  abort() {
    this.router.navigate(['/admin',{outlets:{adminOutlet:'parents'}}])
  }

  ngOnInit() {
  }

}
