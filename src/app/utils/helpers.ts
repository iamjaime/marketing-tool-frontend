/**
 * Created by codehead on 11/30/17.
 */

export class Helper {

  /**
   * Handles checking if an object is empty
   *
   * @param obj
   * @returns {boolean}
   */
  isEmpty(obj) {
    for(var key in obj) {
      if(obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

}
