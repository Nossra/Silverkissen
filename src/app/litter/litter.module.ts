import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadmoreLitterComponent } from './readmore-litter/readmore-litter.component';
import { PlannedLittersComponent } from './planned-litters/planned-litters.component';
import { EarlierLittersComponent } from './earlier-litters/earlier-litters.component';
import { IndexLitterComponent } from './index-litter/index-litter.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ReadmoreLitterComponent, PlannedLittersComponent, EarlierLittersComponent, IndexLitterComponent]
})
export class LitterModule { }
