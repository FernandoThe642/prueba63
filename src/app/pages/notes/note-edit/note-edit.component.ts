import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EntriesService } from 'src/app/services/entries.service';
import { Entrie } from 'src/app/commons/interfaces/entrie.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.css']
})
export class NoteEditComponent {
  _location = inject(Location);
  _entrieService = inject(EntriesService);
  _router = inject(Router);
  entrie!: Entrie;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormArray([]),
  });

  ngOnInit() {
    console.log(this._location.getState());
    this.entrie = (this._location.getState() as any).entrie as Entrie;
    if (this.entrie) this.setCurrentEntrie(this.entrie);
  }

  createLiteral() {
    (this.form.get('description') as FormArray).push(
      new FormGroup({
        name: new FormControl('', Validators.required),
      })
    );
  }

  setCurrentEntrie(entrie: any) {
    this.form.patchValue(entrie);
    entrie.description.map((literal: any) => {
      const literalForm = new FormGroup({
        name: new FormControl(literal.name),
      });
      (this.form.get('description') as FormArray).push(literalForm);
    });
  }

  get description() {
    return (this.form.get('description') as FormArray).controls;
  }

  updateEntrie() {
    console.log({
      id: this.entrie.id,
      ...this.form.getRawValue(),
    });

    this._entrieService.updateEntrie({
      id: this.entrie.id,
      ...this.form.getRawValue(),
    } as Entrie);
    this._router.navigate(['notes']);
  }
}

