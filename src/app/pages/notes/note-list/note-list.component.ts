import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntriesService } from 'src/app/services/entries.service';
import { Entrie } from 'src/app/commons/interfaces/entrie.interface';
import { debounceTime, Observable } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule,
            ReactiveFormsModule,],
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})



export class NoteListComponent implements OnInit {
  entries$!: Observable<Entrie[]>;
  _entrieService = inject(EntriesService);
  _router = inject(Router);
  searcher = new FormControl('');
  constructor (private titulo: Title){
    titulo.setTitle('Deudas')
   }

  ngOnInit(): void {
    this.entries$ = this._entrieService.getEntries();
    this.searcher.valueChanges.pipe(debounceTime(1000)).subscribe((search) => {
      // this._entrieService.
      if (search) {
        console.log(search);
        this.entries$ = this._entrieService.getEntries(search);
      } else {
        this.entries$ = this._entrieService.getEntries();
      }
    });
  }

  editEntrie(entrie: Entrie) {
    this._router.navigateByUrl('notes/edit', { state: { entrie } });
  }
  deleteEntrie(entrie: Entrie) {
    if (confirm(`Seguro de borrar la ${entrie.name}`)) {
      this._entrieService.deleteEntrie(entrie.id);
    }
  }
}

