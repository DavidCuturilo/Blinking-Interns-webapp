import { DataFromServerService } from './../../../services/data-from-server.service';
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
              @Inject(MAT_DIALOG_DATA) public data: Intern[],
              private dataFromServerService: DataFromServerService) { }

  taskForm: FormGroup;
  interns: Intern[];

  taskTypeList: string[] = ['Front end', 'Back end', 'Full stack'];
  ngOnInit(): void {
    this.interns = this.data;
    this.taskForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      text: new FormControl(null, [Validators.required]),
      task_type:new FormControl(null, [Validators.required]),
      deadline: new FormControl(null, [Validators.required]),
      interns: new FormControl(null)
    });
  }

  closeDialog(){
    this.dialogRef.close()
  }

  submitNewTask(){
    const taskData = this.taskForm.value;
    const currentDate = new Date();

    let chosenDate = this.taskForm.get('deadline').value;

    if(chosenDate.getDate() !== currentDate.getDate() && chosenDate.getTime() <= currentDate.getTime()){
      this.taskForm.get('deadline').setErrors({invalidDate: true});
    }
    this.dataFromServerService.addNewTask(taskData).subscribe(data=>{
      this.dialogRef.close()
      alert("Task was assigned successfully")
    },error=>{
      alert("Error on assigning task...")
    });
  }

  logValue(){
    console.log(this.taskForm.get('interns').value)
  }
}
