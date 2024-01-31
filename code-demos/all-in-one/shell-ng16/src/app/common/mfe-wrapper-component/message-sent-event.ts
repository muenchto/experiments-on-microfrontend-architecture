export class MessageSentEvent {
  constructor(public readonly message: string) { }

  public static fromCustomEvent(event: Event): MessageSentEvent {
    const messageSent = (event as CustomEvent<string>).detail;
    return new MessageSentEvent(messageSent);
  }
}
