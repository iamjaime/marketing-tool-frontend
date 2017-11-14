export interface UserInterface {
  /**
   * Handles create new User
   */
  create(username,useremail,userpassword);

   /**
   * Handles create new User Social
   */
  createUserSocial(username,useremail,provider);
}
