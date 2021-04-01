import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskInfoModalComponent } from './modals/task-info-modal/task-info-modal.component';

import { MaterialModule } from '../material';
import { ChangePasswordModalComponent } from './modals/change-password-modal/change-password-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddTaskModalComponent } from './modals/add-task-modal/add-task-modal.component';


@NgModule({
  declarations: [TaskInfoModalComponent, ChangePasswordModalComponent, AddTaskModalComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    TaskInfoModalComponent,
    ChangePasswordModalComponent
  ]
})
export class SharedModule { }
