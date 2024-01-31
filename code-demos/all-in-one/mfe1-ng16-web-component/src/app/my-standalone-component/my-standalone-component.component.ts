import { Component, ElementRef, EventEmitter, OnInit, Output, VERSION, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventBus, Mfe1StoreService } from '../mfe1-store.service';
import { interval, map, tap } from 'rxjs';

@Component({
  selector: 'app-my-standalone-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-standalone-component.component.html',
  styleUrls: ['./my-standalone-component.component.css'],
})
export class MyStandaloneComponent implements OnInit {
  public readonly version = VERSION.full;
  private store = inject(Mfe1StoreService);

  protected lastTimeInitialized: Date | null = null;
  protected lastTimeLoaded$ = this.store.state.pipe(
    map((state) => state.lastTimeLoaded),
    tap((lastTimeLoaded) => {
      console.log('Mfe1 received lastTimeLoaded update: ', lastTimeLoaded);
    })
  );

  constructor() {
    console.log('Mfe1 constructor');
  }
  

  @Output("message-sent")
  public messageSentEvent: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {
    this.store.loadIfEmpty();
    this.lastTimeInitialized = new Date();
    console.log('Mfe1 initialized');
    
  }

  public sendMessage(): void {
    this.messageSentEvent.emit(`The time is ${new Date()}`);
  }
}

