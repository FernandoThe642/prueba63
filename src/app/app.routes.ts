import { Routes } from "@angular/router";


export const appRoutes: Routes =[
    {
        path: '', 
        redirectTo: 'notes', 
        pathMatch: 'full',
    },
    {
        path: 'notes',
        loadChildren: () =>
         import('./pages/notes/notes.routes').then((routes) => routes.NotesRoutes),

    },
]