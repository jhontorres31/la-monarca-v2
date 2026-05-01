import { Routes } from '@angular/router';
import { Home } from './domain/home/home';
import { ListProduct } from './domain/shared/list-product/list-product';
import { Pedidos } from './domain/pedidos/pedidos';


export const routes: Routes = [
    {   path: '',
        component: Home,
        children: [

            {
        path: '',
        component: ListProduct
    },{
        path: 'pedidos',
        component: Pedidos
    },{
        path:'list-product',
        component:ListProduct
    }


        ]
    }
      

];
