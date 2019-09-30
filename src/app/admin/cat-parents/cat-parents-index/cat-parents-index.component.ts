import { Component, OnInit } from '@angular/core';
import { Cat } from '../../../entities/cat';
import { Router } from '@angular/router';
import { CatService } from '../../../services/CatService';

@Component({
  selector: 'app-cat-parents-index',
  templateUrl: './cat-parents-index.component.html',
  styleUrls: ['./cat-parents-index.component.css']
})
export class CatParentsIndexComponent implements OnInit {

  parents: Array<Cat>;
  constructor(
    public router:Router,
    public catService: CatService
  ) { }

  delete(parent: Cat) {
    this.catService.delete(parent).subscribe(x => {
      window.location.reload();
    });
  }

  ngOnInit() {
    this.catService.getParents().subscribe(x => {
      this.parents = x;
      console.log(this.parents);
    });
  }
}
