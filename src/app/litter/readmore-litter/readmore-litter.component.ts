import { Component, OnInit } from '@angular/core';
import { Litter } from '../../entities/litter';
import { ActivatedRoute } from '@angular/router';
import { LitterService } from '../../services/litterService';

@Component({
  selector: 'app-readmore-litter',
  templateUrl: './readmore-litter.component.html',
  styleUrls: ['./readmore-litter.component.css']
})
export class ReadmoreLitterComponent implements OnInit {
  public litterId: Litter;
  constructor(
    private activatedRouter: ActivatedRoute,
    private litterService: LitterService) { }

  ngOnInit() {
    this.activatedRouter.params.subscribe(x => {
      this.litterId = x["id"];
    });
  }

}
