import {Routes} from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { DishdetailComponent } from '../dishdetail/dishdetail.component';
import {DishService} from '../services/dish.service';
import { HomeComponent } from '../home/home.component';
import { ContactComponent } from '../contact/contact.component'
import { AboutComponent } from '../about/about.component';


export const routes : Routes = [

{
    path:'home',
    component : HomeComponent
},
{
    path:'menu',
    component : MenuComponent
},
{
    path: 'dishdetail/:id',component: DishdetailComponent //colon make it as a route parmeter
},
{ path: 'contactus',
 component: ContactComponent
 },
 {
     path : 'about',
     component :AboutComponent
 },
{
    path:'',
    redirectTo : '/home',
    pathMatch:'full'
}
]