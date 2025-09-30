import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
            },
             {
                path: 'input-properties',
                loadComponent: () => import('./pages/inputs/InputPropertiesPage').then(m => m.InputPropertiesPage)
            },
            {
                path: 'cards',
                loadComponent: () => import('./pages/component/ComponentProjectings').then(m => m.ComponentProjectings)
            },
            {
                path: 'vehicles',
                loadComponent: () => import('./pages/vehicles/vehicles.component').then(m => m.VehiclesComponent)
            },
            {
                path: 'bookings',
                loadComponent: () => import('./pages/booking/booking.component').then(m => m.BookingComponent)
            },
            {
                path: 'customers',
                loadComponent: () => import('./pages/customer/customer').then(m => m.Customer)
            }
        ]
    },

];
