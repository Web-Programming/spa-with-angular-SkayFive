import { Routes } from '@angular/router';
import { Home as HomeComponent} from './home/home';
import { Profile } from './profile/profile';
import { Login } from './login/login';
import { Register } from './register/register';
import { Contact } from './contact/contact';
import { Detail } from './detail/detail'; // <- Import detail Component

export const routes: Routes = [
    //Mengatut Halaman Utama
    {
        path: "",
        component: HomeComponent,
        title : "Home Page"
    },
    {
        path: "profile",
        component: Profile,
        // title : "Profile Page"
    },
    {
        path: "login",
        component: Login,
        // title : "Login Page"
    },
    {
        path: "register",
        component: Register,
        // title : "Register Page"
    },
    {
        path: "contact",
        component: Contact,
        // title : "Contact Page"
    },
    {
        path: "property/:id",  //Route dengan parameter
        component: Detail,
        title: 'Detail Property - Griya MDP'
    },
    {
        path: "**",            //wildcard untuk 404
        redirectTo: "",
        pathMatch: 'full'
    }
];
