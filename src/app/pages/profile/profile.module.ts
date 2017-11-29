import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { Routes, RouterModule } from '@angular/router';
import { TagInputModule } from 'ng4-tag-input';
const routes: Routes = [{
  path: '',
  data: {
    title: 'My Profile',
    urls: [{title: 'My Profile',url: '/profile'},{title: 'My Profile'}]
  },
  component: ProfileComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
