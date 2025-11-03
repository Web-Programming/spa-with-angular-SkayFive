//src/app/app.routes.ts
// import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Cv} from './cv/cv'; //import komponen CV
import {Contact} from './contact/contact'; //import komponen Contact

export const routes: Routes = [
     // Definisikan path untuk Halaman CV
  { path: 'cv', component: Cv },
  // Definisikan path untuk Halaman Kontak
  { path: 'contact', component: Contact },
  // Redirect ke /cv jika tidak ada path yang cocok (halaman utama)
  { path: '', redirectTo: '/cv', pathMatch: 'full' },
  // Tambahkan path untuk halaman 404 (optional)
  // { path: '**', component: NotFoundComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

