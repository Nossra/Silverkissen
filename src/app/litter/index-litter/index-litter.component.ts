import { Component, OnInit } from '@angular/core';
import { Litter } from '../../entities/litter';
import { Router } from '@angular/router';
import { LitterService } from '../../services/litterService';

@Component({
  selector: 'app-index-litter',
  templateUrl: './index-litter.component.html',
  styleUrls: ['./index-litter.component.css']
})
export class IndexLitterComponent implements OnInit {
  public litters: Litter[] = new Array<Litter>();

  constructor(
    private litterService: LitterService,
    private router:Router) { }

  readMore(litter: Litter) {
    this.router.navigate(['/kattungar', litter.id])
  }

  ngOnInit() {
    this.litterService.getActiveLitters().subscribe(x => {
      this.litters = x;
    })
  }

}
