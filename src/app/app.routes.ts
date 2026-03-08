import { Routes } from '@angular/router';
import { Home } from './domain/home/home';
import { ListProduct } from './domain/shared/list-product/list-product';

export const routes: Routes = [
    {   path: '',
        component: Home
    },
    {
        path: 'list-product',
        component: ListProduct
    }

];
