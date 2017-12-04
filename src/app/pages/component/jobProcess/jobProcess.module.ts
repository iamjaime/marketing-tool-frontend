import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { JobProcess } from './jobProcess.component';
import { tabfacebookComponent } from './tabfacebook/tabfacebook.component';


const routes: Routes = [{
	path: '',
	data: {
      title: 'Job Process',
      urls: [{title: 'Job Process',url: '/starter'},{title: 'Job'}]
    },
	component: JobProcess
}];

@NgModule({
	imports: [
    	CommonModule, 
    	RouterModule.forChild(routes)
    ],
	declarations: [JobProcess,tabfacebookComponent]
})
export class JobModule { }