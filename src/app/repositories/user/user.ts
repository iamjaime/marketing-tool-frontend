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

<<<<<<< HEAD
  /**
   * Handles Creating a new user
   */
  public create(data) {
    this.user.create(data).then((res) => {
      this.toastr.success('Successful', '  You have successfully registered');
      this.login.login(data);
    },
=======
    /**
     * Handles Creating a new user
     */
    public create(data) {
      this.user.create(data).then((res) => {
          this.toastr.success('You have successfully registered', 'Success');
          this.login.login(data);
      },
>>>>>>> 91dc8e135db9a992cee41b773aea9f20c7e5b372
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
<<<<<<< HEAD
    this.user.update(data).then((res) => {
      this.toastr.success('Successful', ' update');
      this.refreshInformation();
    },
=======
      this.user.update(data).then((res) => {
        this.toastr.success('You have successfully updated your details', 'Success');
          this.refreshInformation();
      },
>>>>>>> 91dc8e135db9a992cee41b773aea9f20c7e5b372

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
      console.log(result.data);
      this.assignSession(result.data);

    }
    );
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
    console.log(sessionStorage.getItem('smi'));

    setTimeout('document.location.reload()', 1000);

  }
}
