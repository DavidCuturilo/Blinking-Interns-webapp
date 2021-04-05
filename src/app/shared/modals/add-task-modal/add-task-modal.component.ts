import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Intern } from '../../models/intern.model';

@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.component.html',
  styleUrls: ['./add-task-modal.component.scss']
})
export class AddTaskModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddTaskModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Intern[]) { }

  taskForm: FormGroup;
  interns: Intern[];
  ngOnInit(): void {
    this.interns = this.data;
    this.taskForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      text: new FormControl(null),
      task_type:new FormControl(null),
      deadline: new FormControl(null),

    });
  }

  closeDialog(){
    this.dialogRef.close()
  }

  submitNewTask(){
    console.warn(this.taskForm.value)
  }
}
