import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskInfoModalComponent } from './modals/task-info-modal/task-info-modal.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MaterialModule } from '../material';


@NgModule({
  declarations: [TaskInfoModalComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    TaskInfoModalComponent
  ]
})
export class SharedModule { }
