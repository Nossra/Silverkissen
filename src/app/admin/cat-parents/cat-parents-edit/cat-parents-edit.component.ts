import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Cat } from '../../../entities/cat';
import { ActivatedRoute, Router } from '@angular/router';
import { CatService } from '../../../services/CatService';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Helpers } from '../../../Helpers/helper';
import { Image } from '../../../entities/image';
import { ImageService } from '../../../services/ImageService';

@Component({
  selector: 'app-cat-parents-edit',
  templateUrl: './cat-parents-edit.component.html',
  styleUrls: ['./cat-parents-edit.component.css']
})
export class CatParentsEditComponent implements OnInit {
  
  public parent: Cat;
  public parentId: number;
  public parentForm: FormGroup;
  public vaccinated:boolean;
  public pedigree:boolean;
  public chipped:boolean;
  public imagesToAdd: Array<Image> = [];
  public displayPicture: Image;
  public loadedImages:boolean = false;
  public loadedDisplayPicture:boolean = false;
  public imageForm: FormGroup;
  public displayPictureImageForm: FormGroup;
  public loading:boolean = true;
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('fileInput') fileInputDisplayPicture: ElementRef;

  constructor(
    public activatedRoute:ActivatedRoute,
    public catService: CatService,
    public imageService: ImageService,
    public formBuilder: FormBuilder,
    public router:Router) { 
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

      this.imageForm = formBuilder.group({
        'images' :null
      });
      
      this.displayPictureImageForm = formBuilder.group({
        'displaypicture' :null
      });
    } 

  putUpdate(cat:Cat) {  
    if (cat.name != null) this.parent.name = cat.name;
    if (cat.birthdate != null) this.parent.birthdate = cat.birthdate;
    if (cat.breed != null) this.parent.breed = cat.breed;
    if (cat.notes != null) this.parent.notes = cat.notes;
    if (cat.sex !=  null) this.parent.sex = cat.sex;
    if (cat.color != null) this.parent.color = cat.color;
    if (cat.vaccinated != null) this.parent.vaccinated = cat.vaccinated;
    if (cat.pedigree != null) this.parent.pedigree = cat.pedigree;
    if (cat.chipped != null) this.parent.chipped = cat.chipped;
 
    this.catService.putUpdate(this.parent).subscribe(x => {
      this.router.navigate(['/admin',{outlets:{adminOutlet:'parents'}}])
    })
  }

  onFileChangeDisplayPicture(event) { 
    this.loadedDisplayPicture = false;
    if(event.target.files && event.target.files.length == 1) {
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
        }
      }
      this.loadedImages = true;
    }
  } 

  addImages(value:any) { 
    if (this.loadedImages) {
      for (var i = 0; i < this.imagesToAdd.length; i++) {
        this.imageService.PostImageToExistingCat(this.imagesToAdd[i], this.parentId).subscribe(x=> {
          this.router.navigate(['/admin',{outlets:{adminOutlet:'parents'}}])
        });
      }
    } else if (this.loadedDisplayPicture) {
      this.imageService.PostImageToExistingCat(this.displayPicture, this.parentId).subscribe(x=> {
        this.router.navigate(['/admin',{outlets:{adminOutlet:'parents'}}])
      });
    } 
  }

  removeImage(id:number) {
    this.imageService.DeleteCatImage(id).subscribe(x => {
      this.router.navigate(['/admin',{outlets:{adminOutlet:'parents'}}])
    });
  }

  abort() {
    this.router.navigate(['/admin',{outlets:{adminOutlet:'parents'}}])
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
      this.parent.formattedBirthDate = Helpers.dateHelper(new Date(x["birthDate"])); 
      this.loading = false;
    });
    
  }

}
