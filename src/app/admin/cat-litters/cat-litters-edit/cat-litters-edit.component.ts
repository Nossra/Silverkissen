import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Litter } from '../../../entities/litter';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LitterService } from '../../../services/litterService';
import { Image } from '../../../entities/image';
import { Cat } from '../../../entities/cat';
import { CatService } from '../../../services/CatService';
import { LitterStatus } from '../../../entities/LitterStatus';
import { Helpers } from '../../../Helpers/helper';

@Component({
  selector: 'app-cat-litters-edit',
  templateUrl: './cat-litters-edit.component.html',
  styleUrls: ['./cat-litters-edit.component.css']
})
export class CatLittersEditComponent implements OnInit {

  private litter: Litter;
  private litterID: number;
  private litterForm: FormGroup;
  private kittenForm: FormGroup;
  private parentsForm: FormGroup;
  private vaccinated: boolean;
  private chipped: boolean;
  private pedigree: boolean;
  @ViewChild('fileInput') fileInput: ElementRef;

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
        'images' : null,
        'status' : null,
        'readyDate' : null,
        'birthDate' : null
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

    onFileChange(event) {
      let reader = new FileReader();
      if(event.target.files && event.target.files.length > 0) {
        let file = event.target.files[0];
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.litterForm.get('displayPicture').setValue({
            filename: file.name,
            filetype: file.type,
            value: reader.result.split(',')[1]
          })
        };
      }
    }

    putUpdate(litter: Litter) { 
      if (litter.chipped != null) this.litter.chipped = litter.chipped;
      if (litter.notes != null) this.litter.notes = litter.notes;
      if (litter.pedigree != null) this.litter.pedigree = litter.pedigree;
      if (litter.vaccinated != null) this.litter.vaccinated = litter.vaccinated;
      if (litter.status != null) this.litter.status = litter.status;
      if (litter.sverak != null) this.litter.sverak = litter.sverak;
      if (litter.readyDate != null) this.litter.readyDate = litter.readyDate;
      if (litter.birthDate != null) this.litter.birthDate = litter.birthDate;
      console.log(litter);
    this.litterService.putUpdate(this.litter).subscribe(x => {
      this.router.navigate(['/admin',{outlets:{adminOutlet:'litters'}}])  
    });
  }

  updateKitten(kitten:Cat, id:number) { 
    let catToUpdate: Cat;
    this.litter.kittens.forEach(function (kitteh) { 
      if (kitteh.id == id) {
        if (kitten.name != null) kitteh.name = kitten.name;
        if (kitten.sex != null) kitteh.sex = kitten.sex;
        if (kitten.color != null) kitteh.color = kitten.color;

        catToUpdate = kitteh;
        catToUpdate.id = id;
      }
     }); 
    this.catService.putUpdate(catToUpdate).subscribe(x => {
      window.location.reload();
    })
  }

  closeKittenModal() {  

  }

  // updateKitten(kitten: Cat, id:number) { 
  //   this.catService.update(kitten, id).subscribe(x => {
  //     window.location.reload();
  //   })
  // }

  abort() {
    this.router.navigate(['/admin',{outlets:{adminOutlet:'litters'}}])
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
      this.litter.formattedReadyDate = Helpers.dateHelper(new Date(x["readyDate"]));
      this.litter.statusText = Helpers.statusHelper(x["status"]);
      this.litter.formattedBirthDate = Helpers.dateHelper(new Date(x["birthDate"]));
      console.log(this.litter);
    })
  } 
}