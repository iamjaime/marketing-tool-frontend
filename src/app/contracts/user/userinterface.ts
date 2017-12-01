export interface UserInterface {
  /**
   * Handles create new User
   */
  create(username,useremail,userpassword);

   /**
   * Handles create new User Social
   */
  attachNetwork(provider_id, provider_account_id, provider_traffic);

   /**
   * Handles Update User
   */
  updateUser( data);
}
