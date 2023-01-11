import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VtlConverterComponent } from './tools/vtl-converter/vtl-converter.component';

const routes: Routes = [
  { path: '', component: VtlConverterComponent},
  { path: 'vtl', component: VtlConverterComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
