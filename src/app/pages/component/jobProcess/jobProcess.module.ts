import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { JobProcess } from './jobProcess.component';
import { tabfacebookComponent } from './tabfacebook/tabfacebook.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
		NgbModule.forRoot(),
    	RouterModule.forChild(routes)
    ],
	declarations: [JobProcess,tabfacebookComponent]
})
export class JobModule { }