import { UserInterface } from '../../contracts/user/userinterface';
import { Injectable } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { Login } from '../../repositories/login/login';

@Injectable()
export class User implements UserInterface {


    public constructor(public user: UserService, private toastr: ToastrService, private login : Login) {

    }

    /**
     * Handles Creating a new user
     */
    public create(data) {
      this.user.create(data).then((res) => {
          this.toastr.success('Successful', '  You have successfully registered');
          this.login.login(data.email, data.password);
      },
      (err) => {
          this.toastr.error('Error', '  There was an error registering the account.');
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
          this.toastr.success('Successful', ' update');
      },

      (err) => {
          return err;
      });
    }

  /**
   * Handles getting the authenticated user's info.
   * @returns {any}
   */
  getUserInfo(){
     return this.user.getUserInfo();
  }
}
