export interface UserInterface {
  /**
   * Handles create new User
   */
  create(username,useremail,userpassword);

   /**
   * Handles create new User Social
   */
  createUserSocial(username,useremail,provider);

   /**
   * Handles Update User
   */
  updateUser(username,useremail,password,city,country);
}
