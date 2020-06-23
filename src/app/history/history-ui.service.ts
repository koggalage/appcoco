import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { ComponentStatus } from '../shared/shared-model';
import { TreatmentDetailsResponse } from './history-model';

@Injectable({
    providedIn: 'root'
})
export class HistoryUIService {

    private readonly currentlyLoadedComponent$: Subject<ComponentStatus> = new Subject();
    private readonly selectedHistory$: BehaviorSubject<TreatmentDetailsResponse> = new BehaviorSubject<TreatmentDetailsResponse>(null);
    private readonly selectedTduid$: BehaviorSubject<number> = new BehaviorSubject<number>(null);

    constructor() { }

    public setLoadPanel(messageHandler: ComponentStatus) {
        this.currentlyLoadedComponent$.next(messageHandler);
    }

    public getLoadPanel() {
        return this.currentlyLoadedComponent$.asObservable();
    }

    public setSelectedHistory(History: TreatmentDetailsResponse) {
        this.selectedHistory$.next(History);
    }

    public getSelectedHistory(): Observable<TreatmentDetailsResponse> {
        return this.selectedHistory$.asObservable();
    }

    public setTduid(tduid: number) {
        this.selectedTduid$.next(tduid);
    }

    public getTduid(): Observable<number> {
        return this.selectedTduid$.asObservable();
    }
}
