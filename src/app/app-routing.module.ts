import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { HomeComponent } from './core/home/home.component';
import { AuthGuardService } from './auth/auth-guard.service';


const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'recipes',
        loadChildren: './recipes/recipes.module#RecipesModule'
    },
    { path: 'shoppinglist', component: ShoppingListComponent },
];
@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
