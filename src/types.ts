
export enum Sender {
  User = 'user',
  Bot = 'bot',
}

export interface Message {
  id: number;
  text: string;
  sender: Sender;
}
