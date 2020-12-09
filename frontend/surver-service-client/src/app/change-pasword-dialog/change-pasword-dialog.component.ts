import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
export interface DialogData {
  oldpassword: string;
  newpassword: string;
  confirmnewpassword: string;
}

@Component({
  selector: 'app-change-pasword-dialog',
  templateUrl: './change-pasword-dialog.component.html',
  styleUrls: ['./change-pasword-dialog.component.css']
})
export class ChangePaswordDialogComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ChangePaswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      oldpassword: ['', [Validators.required]],
      newpassword: ['', [Validators.required]],
      confirmnewpassword: ['', [Validators.required]]
    }, {validator: passwordMatchValidator});
  }
  get oldpassword() { return this.formGroup.get('oldpassword'); }
  get newpassword() { return this.formGroup.get('newpassword'); }
  get confirmnewpassword() { return this.formGroup.get('confirmnewpassword'); }
  onPasswordInput() {
    if (this.formGroup.hasError('passwordMismatch'))
      this.confirmnewpassword.setErrors([{'passwordMismatch': true}]);
    else
      this.confirmnewpassword.setErrors(null);
  }
}
export const passwordMatchValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
  if (formGroup.get('newpassword').value === formGroup.get('confirmnewpassword').value)
    return null;
  else
    return {passwordMismatch: true};
};
