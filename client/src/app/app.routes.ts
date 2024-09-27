import { Routes } from '@angular/router';
import { ListComponent } from './categories/components/list/list.component';
import { ShowComponent } from './categories/components/show/show.component';
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
