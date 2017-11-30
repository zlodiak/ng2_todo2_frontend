import { Injectable } from '@angular/core';

@Injectable()
export class GlobalVarsService {

	private globalVars: Object = {};

  constructor() { }

  getVar(key) {
  	// console.log(Object.keys(this.globalVars));
  	// console.log(this.globalVars, key, 'this.globalVars[key]', this.globalVars[key]);
  	return this.globalVars[key];
  };

  setVar(key, value): void {
  	this.globalVars[key] = value;
  	// console.log('this.globalVars', this.globalVars);
  }; 

}
