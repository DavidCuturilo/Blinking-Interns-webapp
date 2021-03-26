import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.scss']
})
export class ChangePasswordModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Task, public dialogRef: MatDialogRef<ChangePasswordModalComponent>) { }

  changeForm: FormGroup;
  hide = true;
  hide1 = true;
  hide2 = true;




  ngOnInit(): void {
    this.changeForm = new FormGroup({
      'oldPassword': new FormControl(null,[Validators.required,Validators.minLength(8)]), 
      'confirmOld' : new FormControl(null,[Validators.required,Validators.minLength(9)]),
      'newPassword' : new FormControl(null,[Validators.required,Validators.minLength(8)]),
    });
  }

  closeModal() {
    this.dialogRef.close();
  }

  getErrorMessage(control: string, compare, compareTo) {
    if(this.changeForm.get(control).hasError('required')){
      return 'You must enter a value';
    }

    if(control === 'confirmOld'){
      if(compare.value !==  compareTo.value){
        return 'Password must match old password';
      }
      return;
    }
    return 'Password must contain at least 8 characters';
  }

  isValid() {
    if(this.changeForm.invalid){
      return false;
    }
    return true;
  }

}
