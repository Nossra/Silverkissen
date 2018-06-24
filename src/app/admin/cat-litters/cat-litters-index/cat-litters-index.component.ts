import { Component, OnInit } from '@angular/core';
import { LitterService } from '../../../services/litterService';
import { Litter } from '../../../entities/litter';
import { FormGroup, FormBuilder, Form } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cat-litters-index',
  templateUrl: './cat-litters-index.component.html',
  styleUrls: ['./cat-litters-index.component.css']
})
export class CatLittersIndexComponent implements OnInit {
  public litters: Array<Litter>;

  constructor(
    private litterService: LitterService,
    private router: Router) {
    }

  delete(litter:Litter) {
    this.litterService.delete(litter).subscribe(x => {
      window.location.reload();
    });
  }

  ngOnInit() {
    this.litterService.getAll().subscribe(x => {
      this.litters = x;
    });
  }

}
