import { UserInterface } from '../../contracts/user/userinterface';
import { Injectable } from '@angular/core';
import { UserService } from '../../services/user/user.service'
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class User implements UserInterface {
    result: any;
    public constructor(public userservice: UserService, private toastr: ToastrService) {

    }

    /**
     *  Handles Ceate new User whit service and interface 
     * @param userName 
     * @param userEmail 
     * @param userPassword 
     */
    public create(userName, userEmail, userPassword) {
        this.userservice.create(userName, userEmail, userPassword).subscribe((response) => {
            this.result = response.json();
            console.log(this.result);
            this.toastr.success('Successful', '  it was registered correctly');
            return this.result;
        },
            err => {
                this.result = err.json();
                this.toastr.error('Error', '  registering ');
                return this.result;
            });
    }

    /**
     * Handles Ceate new User Social  service and interface 
     * @param userName 
     * @param userEmail 
     * @param userprovider 
     */
    public createUserSocial() {

        this.userservice.createSocial().subscribe((response) => {
            this.result = response.json();
            console.log(this.result);
            return this.result;
        },
            err => {
                this.result = err.json();
                return this.result;
            });
    }
    /**
     * Handles Update User Data
     * @param username 
     * @param useremail 
     * @param password 
     * @param city 
     * @param country 
     */
    updateUser(username, useremail, password, city, country) {
        this.userservice.updateUser(username, useremail, password, city, country).subscribe((response) => {
            this.result = response.json();
            this.toastr.success('Successful', ' update');
            return this.result;
        },
            err => {
                this.result = err.json();
                return this.result;
            });
    }
}
