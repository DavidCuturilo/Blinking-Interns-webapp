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

  fileName: string;



  taskTypeList: string[] = ['Front end', 'Back end', 'Full stack'];
  ngOnInit(): void {
    this.interns = this.data;
    this.taskForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      text: new FormControl(null, [Validators.required]),
      task_type:new FormControl(null, [Validators.required]),
      deadline: new FormControl(null, [Validators.required, this.dateValidator.bind(this)]),
      interns: new FormControl(null)
    });

    
  }

  uploadDocs(ref: HTMLInputElement){
   this.fileName = ref.files[0].name;
  }

  closeDialog(){
    this.dialogRef.close()
  }

  //custom validator for date
  dateValidator(control: FormControl):{[s:string]: boolean }{
    const currentDate = new Date();

    let chosenDate = control.value;

    if(chosenDate && (chosenDate.getDate() !== currentDate.getDate() && chosenDate.getTime() < currentDate.getTime())){
      return {'invalidDate':true};
    }
    return null;
  }

  submitNewTask(){
    const taskData = this.taskForm.value;
    if(this.taskForm.invalid) return;

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
