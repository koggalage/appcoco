import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { ComponentStatus } from '../shared/shared-model';

@Injectable({
  providedIn: 'root'
})
export class SignatureUiService {

  public signatureImageUrl : string;
  private readonly currentlyLoadedComponent$: Subject<ComponentStatus> = new Subject();
  private readonly selectedSignatureUrl$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor() { }

  public setLoadPanel(messageHandler: ComponentStatus) {
    this.currentlyLoadedComponent$.next(messageHandler);
  }

  public getLoadPanel() {
    return this.currentlyLoadedComponent$.asObservable();
  }

  public setSignatureUrl(id: string) {
    this.selectedSignatureUrl$.next(id);
  }

  public getSignatureUrl(): Observable<string> {
    return this.selectedSignatureUrl$.asObservable();
  }

}
