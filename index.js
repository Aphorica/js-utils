"use strict"
/**
 * codes used in keyup, keydown, keypress events,
 * along with some classification funcs
 */
class KeyCodes {
  static get TAB_KEY() { return 0x09 }
  static get BACKSPACE_KEY() { return 0x08 }
  static get DELETE_KEY() { return 0x7F }
  static get RETURN_KEY() { return 0x0D }
  static get LINEFEED_KEY() { return 0x0A }
  static get ESC_KEY() { return 0x1B }
  static get SPACE_KEY() { return 0x20 }

  static isControlKey(keyCode) {
    return (keyCode > 0 && keyCode < 0x20) || 
          (keyCode > 0x7e && keyCode < 0xA0);
  }

  static isPrintKey(keyCode) {
    return !this.isControlKey(keyCode);
  }

  static isDigitKey(keyCode) {
    return keyCode > 0x2F && keyCode < 0x3A;
  }
  
  static isPunctKey(keyCode) {
    return (keyCode > 0x20 && keyCode < 0x30) ||
          (keyCode > 0x39 && keyCode < 0x41) ||
          (keyCode > 0x5A && keyCode < 0x61) ||
          (keyCode > 0x7A && keyCode < 0x7F);
  }
}

/**
 * corresponds to C++ 'is.*' character types
 */
class CharType {
  static isLowerCase(cc) { return cc >= 'a' && cc <= 'z'; }
  static isUpperCase(cc) { return cc >= 'A' && cc <= 'Z'; }
	static isDigit(cc) { return cc >= '0' && cc <= '9'}
	static isAlpha(cc) { return CharType.isLowerCase(cc) ||
															CharType.isUpperCase(cc)}
	static isAlNum(cc) { return CharType.isAlpha(cc) ||
															CharType.isDigit(cc) }
	static isPunct(cc) { 
		let code = cc.charCodeAt(0);
		return KeyCodes.isPunctKey(code);
	}
}

/**
 * Various core javascript useful utilities
 */
class JSUtils {
  /**
   * spaghetti against the wall func to stop event propagation/
   * default behavior.
   */
  static stopEvent(evt) {
    evt.preventDefault(); evt.stopPropagation(); 
  }

  /**
   * get an n-length hash of characters
   */
  static getNCharHash(nChars) {
    let abc = "abcdefghijklmnopqrstuvwxyz1234567890".split("");
    let token=""; 
    for (let ix = 0; ix < nChars; ++ix){
      token += abc[Math.floor(Math.random()*abc.length)];
    }
    return token;
  }

  /**
   * async version of sleep
   */
  static async sleep(msec) {
    return new Promise((resolve, reject)=>
      setTimeout(()=>resolve(), msec));
  }

  /**
   * augments do loop for async funcs -- not sure if I'm using
   * this anymore...
   */
  static async doUntil(func, msec, _ntries) {
    let ix, done;
    let ntries = _ntries || Number.MAX_SAFE_INTEGER;

    for (ix = 0; ix < ntries; ++ix) {
      done = await func();
      if (done)
        return true;
      
      JSUtils.sleep(msec);
    }

    return false;
  }
}

export { KeyCodes, CharType, JSUtils};
