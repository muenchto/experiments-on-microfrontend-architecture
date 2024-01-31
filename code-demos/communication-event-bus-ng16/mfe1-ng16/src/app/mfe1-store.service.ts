import { EnvironmentInjector, Injectable, inject, runInInjectionContext } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Mfe1DataChangedEvent } from './mfe1-data-changed.event';

export abstract class EventBus {
  abstract publish<T>(event: T): void;
  abstract getEvent$<T>(t: new (...args: any[]) => T): Observable<T>;
}

export interface Mfe1State {
  lastTimeLoaded: Date | null;
}

const initialState: Mfe1State = {
  lastTimeLoaded: null
};

@Injectable({providedIn: 'root' })
export class Mfe1StoreService {
  constructor(injector: EnvironmentInjector) {
    console.log('Mfe1StoreService constructor');
    console.log(injector);
    this.loadOnEventFromEventBus(inject(EventBus));
  }

  public state = new BehaviorSubject<Mfe1State>(initialState)

  public loadIfEmpty() {
    if (this.state.value.lastTimeLoaded === null) {
      this.load();
    }
  }

  public loadOnEventFromEventBus(eventBus: EventBus) {
      eventBus.getEvent$(Object).subscribe(() => {
        console.log('Mfe1StoreService going to load');
        this.load();
    });
    
  }

  private load() {
    this.updateLastTimeLoaded(new Date());
  }

  private updateLastTimeLoaded(lastTimeLoaded: Date) {
    console.log('Mfe1StoreService updated state: ', this.state.value);
    this.state.next({ ...this.state.value, lastTimeLoaded });
  }
}
