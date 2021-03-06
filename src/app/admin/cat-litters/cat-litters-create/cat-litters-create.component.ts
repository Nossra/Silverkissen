import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Image } from '../../../entities/image';
import { Cat } from '../../../entities/cat';
import { CatService } from '../../../services/CatService';
import { Litter } from '../../../entities/litter';
import { LitterService } from '../../../services/litterService';
import { Router } from '@angular/router';
import { LitterStatus } from '../../../entities/LitterStatus';
import { Litter_Parent } from '../../../entities/litter_parent';
import { CatLitter_Image } from '../../../entities/catlitter_image';
import { ImageService } from '../../../services/ImageService';

@Component({
  selector: 'app-cat-litters-create',
  templateUrl: './cat-litters-create.component.html',
  styleUrls: ['./cat-litters-create.component.css']
})
export class CatLittersCreateComponent implements OnInit {
  public createForm : FormGroup 
  public parents: Array<Cat> = [];
  public moms: Array<Cat> = [];
  public dads: Array<Cat> = [];
  public bogusLitterId:number = 1; //.Net ore EF finds the real id automatically in the api.
  public imagesToAdd: Array<Image> = [];
  public displayPicture:Image;
  public loadedImages: boolean = false;
  public loadedDisplayPicture:boolean = false;
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('fileInput') fileInputDisplayPicture: ElementRef;

  constructor(
    public formBuilder: FormBuilder,
    public catService: CatService,
    public litterService: LitterService,
    public imageService: ImageService,
    public router: Router) { 
    this.createForm = formBuilder.group({
      'notes' : null,
      'numberOfKittens' : [null, [Validators.required], null],
      'dad' : [null, [Validators.required], null],
      'mom' : [null, [Validators.required], null],
      'born' : [null, [Validators.required], null],
      'images' : null,
      'displaypicture' : null,
      'chipped' : true,
      'vaccinated' : true,
      'pedigree' : true
    });
  }

  createLitter(values: any) {
    let litter: Litter = new Litter();
    litter.birthDate = values.born;
    litter.amountOfKids = values.numberOfKittens;
    litter.notes = values.notes;
    litter.status = LitterStatus.ACTIVE
    if (this.imagesToAdd.length > 0) {
      litter.images = this.imagesToAdd; 
    } 
    if (this.loadedDisplayPicture) {
      litter.images.push(this.displayPicture);
    }
    litter.chipped = values.chipped;
    litter.pedigree = values.pedigree;
    litter.vaccinated = values.vaccinated
    for (let parent of this.parents) {
      if (parent.id == values.dad || parent.id == values.mom) {
        litter.parents.push(
          new Litter_Parent(
            parent.id,
            this.bogusLitterId
          )
        )
      }
    }

    litter.amountOfKids = values.numberOfKittens;
    this.litterService.create(litter).subscribe(x => {  
      this.router.navigate(['/admin',{outlets:{adminOutlet:'litters'}}])
    });
  }

  abort() {
    this.router.navigate(['/admin',{outlets:{adminOutlet:'litters'}}])
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