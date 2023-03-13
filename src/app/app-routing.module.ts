import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo:'dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  { path: 'user', loadChildren: () => import('./user/user.module').then( m => m.UserModule)},
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)},
  { path: 'skill', loadChildren: () => import('./skill/skill.module').then( m => m.SkillModule)},
  { path: 'module', loadChildren: () => import('./module/module.module').then( m => m.ModuleModule)},
  { path: 'module-skill-mapping', loadChildren: () => import('./module-skill-mapping/module-skill-mapping.module').then( m => m.ModuleSkillMappingModule)},
  { path: 'batch', loadChildren: () => import('./batch/batch.module').then( m => m.BatchModule)},
  { path: 'access-denied', loadChildren: () => import('./shared/shared.module').then( m => m.SharedModule)},
  { path: '**', redirectTo:'dashboard', pathMatch: 'full'} //wildcard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
