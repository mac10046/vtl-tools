import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VtlConverterComponent } from './tools/vtl-converter/vtl-converter.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'vtl-get-response-mapping', component: VtlConverterComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
