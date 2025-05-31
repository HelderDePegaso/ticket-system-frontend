import { Route } from '@angular/router'
import { UserComponent } from './component/user/user.component'

import { ProfileComponent } from './component/profile/profile.component'



export const routes: Route[] = [
    {
        path: '',
        component: UserComponent        
    }, 

    {
        path: 'profile',
        component: ProfileComponent
    },

    {
        path: 'profile/:uuid',
        component: ProfileComponent
    }
]