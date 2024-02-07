import { Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export abstract class EventBus {
  public abstract getEvent$<T>(type: string): Observable<T>;
}

export interface Mfe1State {
  lastTimeLoaded: Date | null;
}

const initialState: Mfe1State = {
  lastTimeLoaded: null
};

@Injectable({providedIn: 'root' })
export class Mfe2StoreService {
  constructor(@Optional() @Inject('eventBus') eventBus: EventBus){
    this.loadOnEventFromEventBus(eventBus);
  }

  public state = new BehaviorSubject<Mfe1State>(initialState)

  public loadIfEmpty() {
    if (this.state.value.lastTimeLoaded === null) {
      this.load();
    }
  }

  public loadOnEventFromEventBus(eventBus: EventBus | undefined) {
      eventBus?.getEvent$<void>('mfe2').subscribe(() => {
        this.load();
    });
    
  }

  private load() {
    this.updateLastTimeLoaded(new Date());
  }

  private updateLastTimeLoaded(lastTimeLoaded: Date) {
    this.state.next({ ...this.state.value, lastTimeLoaded });
  }
}
