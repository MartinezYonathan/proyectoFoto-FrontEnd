import { Routes } from '@angular/router';
import { ListFotoComponent } from './components/list-foto/list-foto.component';
import { EditFotoComponent } from './components/edit-foto/edit-foto.component';
import { AddFotoComponent } from './components/add-foto/add-foto.component';

export const ROUTES: Routes = [
    { path: 'add-foto', component: AddFotoComponent },
    { path: 'edit-foto', component: EditFotoComponent },
    { path: 'list-foto', component: ListFotoComponent },
    { path: '', pathMatch: 'full', redirectTo: 'list-foto' },
    { path: '**', pathMatch: 'full', redirectTo: 'list-foto' }
];