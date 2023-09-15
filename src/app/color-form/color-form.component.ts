import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'pi-color-form',
  templateUrl: './color-form.component.html',
  styleUrls: ['./color-form.component.scss'],
})
export class ColorFormComponent implements OnInit {
  form: FormGroup = new FormGroup({
    color: new FormControl(null, {
      validators: [Validators.required, Validators.minLength(3)],
    }),
  });

  ngOnInit(): void {
    this.form.valueChanges.pipe();
  }

  updateColor(): void {
    // effect
    console.log('value');
  }
}
