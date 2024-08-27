import { Routes } from '@angular/router';
import { ListComponent } from './categories/list/list.component';
import { ShowComponent } from './categories/show/show.component';
import { StyleguideComponent } from './styleguide/styleguide.component';

export const routes: Routes = [
    {
        path: '',
        component: ListComponent,
    },
    {
        path: 'categorie/:id',
        component: ShowComponent,
    },
    {
        path: 'styleguide',
        component: StyleguideComponent,
    },
];
