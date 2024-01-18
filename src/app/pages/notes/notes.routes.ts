import {Routes} from "@angular/router";
import { NoteListComponent } from "./note-list/note-list.component";



export const NotesRoutes: Routes = [
    {path: '', 
    title: 'Deudas', 
    component: NoteListComponent},
];