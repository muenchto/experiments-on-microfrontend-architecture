import { Component, EventEmitter, Input, Output, VERSION, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map, tap } from 'rxjs';
import { Mfe1StoreService } from '../mfe3-store.service';

@Component({
  selector: 'app-my-standalone-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-standalone-component.component.html',
  styleUrls: ['./my-standalone-component.component.css']
})
export class MyStandaloneComponent {
  public readonly version = VERSION.full;

  @Input()
  public inputText?: string;

  @Output("message-sent")
  public messageSentEvent: EventEmitter<string> = new EventEmitter<string>();



  private store = inject(Mfe1StoreService);

  protected lastTimeInitialized: Date | null = null;
  protected lastTimeLoaded$ = this.store.state.pipe(
    map((state) => state.lastTimeLoaded),
    tap((lastTimeLoaded) => {
      console.log('Mfe3 received lastTimeLoaded update: ', lastTimeLoaded);
    })
  );

  constructor() {
    console.log('Mfe1 constructor');
  }

  ngOnInit() {
    this.store.loadIfEmpty();
    this.lastTimeInitialized = new Date();
    
  }
  public sendMessage(): void {
    this.messageSentEvent.emit(`message sent from MyStandaloneComponent loaded from the mfe3 app at ${new Date()}`);
  }
}
