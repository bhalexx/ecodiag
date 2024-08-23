import { Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { StyleguideComponent } from './styleguide/styleguide.component';

export const routes: Routes = [
    {
        path: '',
        component: CategoriesComponent,
    },
    {
        path: 'styleguide',
        component: StyleguideComponent,
    },
];
