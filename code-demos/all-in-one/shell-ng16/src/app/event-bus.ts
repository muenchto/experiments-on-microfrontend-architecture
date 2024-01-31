import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, map, pluck } from 'rxjs';

export interface Event<T = any>{
  type: string;
  data?: T;
}

@Injectable({providedIn: 'root'})
// https://martinfowler.com/eaaDev/EventAggregator.html
// The purpose of this event bus/event aggregator is to allow communicating events
// between the view components in a strongly typed fashion. Example:
//
// View one has a button that when clicked should cause an effect on view two.
// The event bus could be used by view one to publish an event that the
// view two subscribes and reacts to.
export class EventBus {
  // Without a BehaviorSubject the order in which events are published and
  // subscribed matters. With just a Subject if a publish occurs before a
  // getEvent subscription then that event is missed.
  private _subject = new BehaviorSubject<Event | null>(null);

  public publish<T>(event: Event<T>) {
    this._subject.next(event);
  }

  public getEvent$<T>(type: string): Observable<T> {
    return this._subject.pipe(
      filter(event => event !== null && event.type === type),
      map(event => event!.data as T)
    );
  }
}
