import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private isLoading$$ = new BehaviorSubject<boolean>(false);
  private isErrorMsg: boolean;
  isLoading$ = this.isLoading$$.asObservable();

  setLoading(isLoading: boolean) {
    this.isLoading$$.next(isLoading);
  }

  getIsErrorMsg() {
    return this.isErrorMsg;
  }
  setIsErrorMsg(isErrorMsg: boolean) {
    this.isErrorMsg=isErrorMsg;
  }
}
