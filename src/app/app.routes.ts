import { Booking, VehicleBooking } from './pages/booking/booking';
import { Routes } from '@angular/router';
import { Layout } from './pages/layout/layout';
import { Vehicles } from './pages/vehicles/vehicles';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login').then(m => m.Login),
        // component: null  Or you can use component: Login if you have imported it
    },
    {
        path: '',
        loadComponent: () => import('./pages/layout/layout').then(m => m.Layout),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard)
            },
            {
                path: 'vehicles',
                component: Vehicles
            },
            {
                path: 'bookings',
                component: Booking
            }
        ]
    },

];
