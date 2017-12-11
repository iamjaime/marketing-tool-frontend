import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment'; 
import { User } from '../../repositories/user/user';
import { Login } from '../../repositories/login/login';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';
import Chart from 'chart.js';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  smi = (!sessionStorage.getItem('smi')) ? {} : JSON.parse(sessionStorage.getItem('smi'));
  facebook = (  JSON.parse(sessionStorage.getItem('facebook')));
  myUser : any = [];
  photo: any =[];
  private socket: any;

  userData: any = {
    name: this.smi.name,
    city: this.smi.city,
    province: this.smi.province,
    postal_code: this.smi.postal_code,
    country: this.smi.country,
    email: this.smi.email,

  };

  constructor(private user: User, private login: Login, private router: Router) {
    //this.socket = io(environment.urls);
  }

  ngOnInit() {
this.chart();
    //this.user.refreshInformation() ;
    this.user.getUserInfo().then((result) => {
      console.log(result.data);
      this.myUser = result.data;
      if (result.data.avatar) {
        this.photo = result.data.avatar;
      }
      else {
        this.photo = 'assets/images/users/1.jpg';
      }
    });
    this.socket.on('get-refresh-data', (data) => {
      if (data.data === 'refres') {
        this.user.refreshInformation();
        this.chart();
        this.user.getUserInfo().then((result) => {
          console.log(result.data);
          this.myUser = result.data;
          if (result.data.avatar) {
            this.photo = result.data.avatar;
          }
          else {
            this.photo = 'assets/images/users/1.jpg';
          }
        });

      }
    });

  }

  /**
   * Handles updating the user.
   */
  updateUser() {
    var postData: any = {
      name: this.userData.name,
      city: this.userData.city,
      province: this.userData.province,
      postal_code: this.userData.postal_code,
      country: this.userData.country,


    };

    if (this.userData.email === this.smi.email || this.userData.email === '') {
      console.log('email igual o vasio ');
    } else {
      postData.email = this.userData.email;
    }

    if (this.userData.password === "") {
      console.log('password igual o vasio ');
    } else {
      postData.password = this.userData.password;
    }
 
    this.user.updateUser(postData);
 
    this.socket.emit('set-refresh-data','refres' ); 
  }


  chart(){
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true
            }
          }]
        }
      }
    });
   }

}
