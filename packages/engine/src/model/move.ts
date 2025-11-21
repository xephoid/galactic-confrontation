import { GameCard } from './gameCard.js';

import { Phase } from './gameState.js';

export class Move {
  action: string;
  description: string;
  card: GameCard | null;

  constructor(action: string, description: string, card: GameCard | null) {
    this.action = action;
    this.description = description;
    this.card = card;
  }
}

export class EndStrategyMove extends Move {
  constructor() {
    super(`end-strategy`, `End Strategy Phase`, null);
  }
}

export class EndBuyMove extends Move {
  constructor() {
    super(`end-buy`, `End Buy Phase`, null);
  }
}

export class EndCleanupMove extends Move {
  constructor() {
    super(`end-cleanup`, `End Cleanup Phase`, null);
  }
}

export class PlayStrategyMove extends Move {
  constructor(card: GameCard) {
    super(`play-strategy`, `Play ${card.name}`, card);
  }
}

export class BuyCardMove extends Move {
  constructor(card: GameCard) {
    super(`buy-card`, `Buy ${card.name} (${card.price} credits)`, card);
  }
}

export class TrashCardMove extends Move {
  constructor(card: GameCard) {
    super(`trash-card`, `Trash ${card.name}`, card);
  }
}

export class DrawCardMove extends Move {
  constructor(card: GameCard) {
    super(`draw-card`, `Draw ${card.name}`, card);
  }
}

export class DiscardHydrogenMove extends Move {
  constructor(count: number) {
    super(`discard-hydrogen`, `Discard ${count} Hydrogen cards and redraw that many cards`, null);
  }
}

export class MoveRecord extends Move {
  round: number;
  turn: number;
  phase: Phase;
  player: string;
  constructor(
    move: Move,
    round: number,
    turn: number,
    phase: Phase,
    player: string,
  ) {
    super(move.action, move.description, move.card);
    this.round = round;
    this.turn = turn;
    this.phase = phase;
    this.player = player;
  }
}
