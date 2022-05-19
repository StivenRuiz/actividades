import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ConsultaComponent } from './consulta/consulta.component';
import { CreacionComponent } from './creacion/creacion.component';

const routes: Routes = [
    {
      path: 'consulta',
      component: ConsultaComponent
    },
    {
      path: 'creacion',
      component: CreacionComponent
    },
  ]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  })
  export class PagesRoutingModule { }