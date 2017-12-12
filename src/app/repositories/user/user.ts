import { UserInterface } from '../../contracts/user/userinterface';
import { Injectable } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { Login } from '../../repositories/login/login';
import { Router } from '@angular/router';
import { Helper } from '../../utils/helpers';


@Injectable()
export class User implements UserInterface {

  smi = (!sessionStorage.getItem('smi')) ? {} : JSON.parse(sessionStorage.getItem('smi'));
  public constructor(public user: UserService, private toastr: ToastrService, private login: Login, private router: Router, private helper: Helper) {

  }

    /**
     * Handles Creating a new user
     */
    public create(data) {
      this.user.create(data).then((res) => {
          this.toastr.success('You have successfully registered', 'Success');
          this.login.login(data);
      },

      (err) => {
        let error = err.json();
        let errorString = this.helper.parseError(error);
        this.toastr.error(errorString, 'Error');
      });
  }

  /**
   * Handles attaching a user to a social media network service provider.
   *
   * @param provider_id
   * @param provider_account_id
   * @param provider_traffic
   */
  public attachNetwork(provider_id, provider_account_id, provider_traffic) {
    return this.user.attachNetwork(provider_id, provider_account_id, provider_traffic);
  }

  /**
   * Handles updating a user account
   * @param data
   */
  updateUser(data) {
      this.user.update(data).then((res) => {
        this.toastr.success('You have successfully updated your details', 'Success');
          this.refreshInformation();
          //setTimeout('document.location.reload()', 1000);

      },
      (err) => {
        return err;
      });
  }

  /**
   * Handles getting the authenticated user's info.
   * @returns {any}
   */
  getUserInfo() {
    return this.user.getUserInfo();
  }

  refreshInformation() {
    this.user.getUserInfo().then((result) => {
      console.log(result);
     // this.assignSession(result.data);
    }
    );
  }




   /**
   * Handles getting the authenticated user's info.
   * @returns {any}
   */
  getUserInfoafter() {
    return this.user. getUserInfoafter();
  }




  /**
    *  Handles assign session by Email autentication
    */
  assignSession(sessionData) {

    sessionData.token = this.smi.token;
    if (!sessionData.avatar) {
      sessionData.avatar = 'assets/images/users/1.jpg';
    }
    var smi = sessionData;
    sessionStorage.setItem('smi', JSON.stringify(smi));




  }


}
