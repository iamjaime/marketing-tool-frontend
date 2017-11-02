import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { WizardComponent } from './wizard.component';


const routes: Routes = [{
	path: '',
	data: {
      title: 'Form Wizard',
      urls: [{title: 'Dashboard',url: '/'},{title: 'Form Wizard'}]
    },
	component: WizardComponent
}];

@NgModule({
	imports: [
    	FormsModule,
    	CommonModule, 
    	RouterModule.forChild(routes)
    ],
	declarations: [WizardComponent]
})
export class WizardFormModule { }