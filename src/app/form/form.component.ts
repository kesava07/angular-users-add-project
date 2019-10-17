import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../myService/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnDestroy {
  myFrom;
  dataToEdit;
  enableEdit = false;

  constructor(private fb: FormBuilder, private userService: DataService, private router: Router) {
    this.myFrom = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('^[0-9]+$'),
        Validators.maxLength(10)]
      ]
    });
  }

  ngOnInit() {
    this.setDataToEdit();

  }

  setDataToEdit() {
    if (this.userService.dataToEdit !== undefined) {
      this.dataToEdit = this.userService.dataToEdit;
      this.enableEdit = true;
      Object.keys(this.dataToEdit).map(val => {
        this.myFrom.controls[val].setValue(this.dataToEdit[val]);
      })
    };
  }

  get userName() {
    return this.myFrom.get('userName');
  };
  get email() {
    return this.myFrom.get('email');
  };
  get phone() {
    return this.myFrom.get('phone');
  }

  submitForm() {
    if (this.myFrom.valid && !this.enableEdit) {
      this.userService.addUser(this.myFrom.value);
      this.router.navigate(['/list']);
    } else {
      let index = this.userService.indexToUpdate;
      this.userService.updateUser(index, this.myFrom.value)
      this.router.navigate(['/list']);
    }
  }

  ngOnDestroy() {
    this.userService.editUser(undefined , -1)
    this.enableEdit = false;
  }

}
