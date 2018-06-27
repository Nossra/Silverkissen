import { Component, OnInit } from '@angular/core';
import { LitterService } from '../../services/litterService';
import { Router } from '@angular/router';
import { Litter } from '../../entities/litter';

@Component({
  selector: 'app-earlier-litters',
  templateUrl: './earlier-litters.component.html',
  styleUrls: ['./earlier-litters.component.css']
})
export class EarlierLittersComponent implements OnInit {
  public litters: Litter[] = new Array<Litter>();

  constructor(
    private litterService: LitterService,
    private router:Router) { }

  readMore(litter: Litter) {
    this.router.navigate(['/kattungar', litter.id])
  }

  ngOnInit() {
    this.litterService.getEarlierLitters().subscribe(x => {
      this.litters = x;
    })
  }

}
