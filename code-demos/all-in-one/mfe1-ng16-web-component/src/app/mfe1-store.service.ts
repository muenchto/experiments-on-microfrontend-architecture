import { EnvironmentInjector, Inject, Injectable, Optional, inject, runInInjectionContext } from '@angular/core';
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
export class Mfe1StoreService {
  constructor( @Optional() @Inject('eventBus') eventBus: EventBus) {
    if (eventBus) {
    this.loadOnEventFromEventBus(eventBus);
    }
  }

  public state = new BehaviorSubject<Mfe1State>(initialState)

  public loadIfEmpty() {
    if (this.state.value.lastTimeLoaded === null) {
      this.load();
    }
  }

  public loadOnEventFromEventBus(eventBus: EventBus) {
      eventBus.getEvent$<void>('mfe1').subscribe(() => {
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
