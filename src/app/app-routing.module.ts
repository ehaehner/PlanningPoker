import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PokerlistComponent } from './pokerlist/pokerlist.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'pokerlist', component: PokerlistComponent, canActivate: [AuthGuard]},
    {path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
