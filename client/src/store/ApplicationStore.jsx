import { makeAutoObservable } from "mobx";

export default class UserStore {
  constructor() {
    this._applications = [];
    makeAutoObservable(this);
  }

  setApplications(applications) {
    this._applications = applications;
  }

  get applications() {
    return this._applications;
  }
}
