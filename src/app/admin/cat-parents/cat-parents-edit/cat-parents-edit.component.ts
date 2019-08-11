import { Component, OnInit } from '@angular/core';
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
  
  private parent: Cat;
  private parentId: number;
  private parentForm: FormGroup;
  private vaccinated:boolean;
  private pedigree:boolean;
  private chipped:boolean;
  private imagesToAdd: Array<Image> = [];
  private loadedImages:boolean = false;
  private imageForm: FormGroup;
  constructor(
    private activatedRoute:ActivatedRoute,
    private catService: CatService,
    private imageService: ImageService,
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

      this.imageForm = this.formBuilder.group({
        'images':null
      });
    } 

  putUpdate(cat:Cat, id:number) {  
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
            value: reader.result
          } 
          this.imagesToAdd.push(image);
          this.loadedImages = true;
        }
      }
    }
  }

  addImages(value:any) { 
    console.log(this.imagesToAdd)
    console.log(this.parentId)
    for (var i = 0; i < this.imagesToAdd.length; i++) {
      this.imageService.PostImageToExistingCat(this.imagesToAdd[i], this.parentId).subscribe(x=> {
        window.location.reload();
      });
    }
  }

  removeImage(id:number) {
    this.imageService.DeleteCatImage(id).subscribe(x => {
      window.location.reload();
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
      console.log(this.parent);
    });
    
  }

}
