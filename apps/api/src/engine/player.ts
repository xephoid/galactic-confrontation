import { GameCard } from './cards/game.card';

export class Player {
  name: string;
  health: number;
  hand: GameCard[];
  deck: GameCard[];
  discard: GameCard[];
  actions: number;
  buys: number;
  defense: number;
  damage: number;
  trash: number;
  cards: number;
  impedes: number;
  credits: number;
  floatingCredits: number;
}
