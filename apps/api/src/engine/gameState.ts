import {
  GameCard,
  strategyCards,
  resourceCards,
  impededCards,
} from './cards/game.card';

import {
  Move,
  EndBuyMove,
  EndCleanupMove,
  EndStrategyMove,
  PlayStrategyMove,
  BuyCardMove,
  TrashCardMove,
  DrawCardMove,
  MoveRecord,
} from './move';

import { Player } from './player';

export class GameState {
  currentPlayer: Player;
  otherPlayer: Player;
  cardSupply: GameCard[];
  turn: number;
  round: number;
  phase: `strategy` | `buy` | `cleanup`;
  actionLog: string[];
  moves: Move[];
  gameOver: boolean;

  constructor(currentPlayer: Player, otherPlayer: Player) {
    this.currentPlayer = currentPlayer;
    this.otherPlayer = otherPlayer;
    this.cardSupply = [];
    this.turn = 0;
    this.round = 0;
    this.phase = `strategy`;
    this.actionLog = [];
    this.moves = [];
    this.gameOver = false;
  }

  setup() {
    const cardSupply: GameCard[] = [];
    strategyCards.forEach((card: GameCard) => {
      cardSupply.push(card);
    });

    resourceCards.forEach((card: GameCard) => {
      cardSupply.push(card);
    });

    const playerA: Player = {
      name: `Player A`,
      health: 10,
      hand: [],
      deck: [],
      discard: [],
      trash: 0,
      credits: 0,
      floatingCredits: 0,
      damage: 0,
      defense: 0,
      cards: 0,
      buys: 1,
      actions: 1,
      impedes: 0,
    };

    const playerB: Player = {
      name: `Player B`,
      health: 10,
      hand: [],
      deck: [],
      discard: [],
      trash: 0,
      credits: 0,
      floatingCredits: 0,
      damage: 0,
      defense: 0,
      cards: 0,
      buys: 1,
      actions: 1,
      impedes: 0,
    };

    for (let i = 0; i < 7; i++) {
      playerA.deck.push(resourceCards[0]);
      playerB.deck.push(resourceCards[0]);
    }

    for (let i = 0; i < 3; i++) {
      playerA.deck.push(impededCards[0]);
      playerB.deck.push(impededCards[0]);
    }

    this.currentPlayer = playerA;
    this.otherPlayer = playerB;
    this.cardSupply = cardSupply;
    this.turn = 0;
    this.round = 0;
    this.phase = `strategy`;
    this.actionLog = [];
    this.moves = [];

    this.shuffleDeck(playerA);
    this.shuffleDeck(playerB);
    this.drawCards(playerA, 5);
    this.drawCards(playerB, 5);

    playerA.cards = playerA.hand.length;
    playerB.cards = playerB.hand.length;

    this.appendActionLog(`Game started`);

    return this;
  }

  drawCards(player: Player, count: number, log: boolean = false): void {
    console.log(
      `${player.name} attempts to draw ${count} cards (${player.deck.length} cards in deck, ${player.discard.length} cards in discard)`,
    );
    let left: number = count;
    while (player.deck.length > 0 && left > 0) {
      const card: GameCard = player.deck.pop()!;
      player.hand.push(card);
      if (log) {
        this.appendActionLog(`${player.name} drew ${card.name}`);
        this.moves.push(new DrawCardMove(card));
      }
      left--;
    }

    if (left > 0) {
      while (player.discard.length > 0) {
        const card = player.discard.pop()!;
        player.deck.push(card);
      }
      console.log(`${player.name} added their discard pile into deck`);
      this.shuffleDeck(player);
      this.drawCards(player, left, log);
    }
  }

  shuffleDeck(player: Player): void {
    player.deck = player.deck.sort(() => Math.random() - 0.5);
    console.log(`${player.name} shuffled their deck`);
  }

  discardHand(player: Player): void {
    while (player.hand.length > 0) {
      player.discard.push(player.hand.pop()!);
    }
    console.log(`${player.name} discarded their hand`);
  }

  getAvailableMoves(): Move[] {
    switch (this.phase) {
      case `strategy`:
        if (this.currentPlayer.actions <= 0) {
          return [new EndStrategyMove()];
        }
        return this.getActionMoves();
      case `buy`:
        if (this.currentPlayer.buys <= 0) {
          return [new EndBuyMove()];
        }
        return this.getBuyMoves();
      case `cleanup`:
        if (this.currentPlayer.trash <= 0) {
          return [new EndCleanupMove()];
        }
        return this.getCleanupMoves();
      default:
        throw new Error(`Invalid phase: ${this.phase}`);
    }
  }

  getActionMoves(): Move[] {
    const player = this.currentPlayer;
    return [
      ...player.hand
        .filter((card: GameCard) => card.type === `strategy`)
        .map((card: GameCard) => {
          return new PlayStrategyMove(card);
        }),
      new EndStrategyMove(),
    ];
  }

  getBuyMoves(): Move[] {
    const player = this.currentPlayer;
    const totalCredits = player.credits + player.floatingCredits;
    return [
      ...this.cardSupply
        .filter(
          (card: GameCard) => card.available > 0 && card.price <= totalCredits,
        )
        .map((card: GameCard) => {
          return new BuyCardMove(card);
        }),
      new EndBuyMove(),
    ];
  }

  getCleanupMoves(): Move[] {
    return [
      ...this.currentPlayer.hand.map((card: GameCard) => {
        return new TrashCardMove(card);
      }),
      new EndCleanupMove(),
    ];
  }

  doMove(move: Move): void {
    // console.log('doMove', move);
    this.moves.push(
      new MoveRecord(
        move,
        this.round,
        this.turn,
        this.phase,
        this.currentPlayer.name,
      ),
    );

    switch (move.action) {
      case `play-strategy`:
        this.playStrategyCard(move.card!.id);
        break;
      case `buy-card`:
        this.buyCard(move.card!.id);
        break;
      case `end-strategy`:
        this.endStrategyPhase();
        break;
      case `end-buy`:
        this.endBuyPhase();
        break;
      case `trash-card`:
        this.trashCard(move.card!.id);
        break;
      case `end-cleanup`:
        this.endCleanupPhase();
        break;
    }
  }

  buyCard(cardId: string): void {
    const card = this.cardSupply.find(
      (c: GameCard) => c.id === cardId && c.available > 0,
    );
    if (!card) {
      throw new Error(`Card not found or not available: ${cardId}`);
    }
    card.available--;
    this.currentPlayer.discard.push(card);
    this.currentPlayer.buys--;
    this.spendCredits(card.price);
    this.appendActionLog(`${this.currentPlayer.name} bought ${card.name}`);
    if (this.currentPlayer.buys <= 0) {
      console.log(
        `${this.currentPlayer.name} has no buys left, ending their buy phase`,
      );
      this.endBuyPhase();
    }
  }

  spendCredits(amount: number): number {
    const totalCredits: number =
      this.currentPlayer.credits + this.currentPlayer.floatingCredits;
    const hadFloating = this.currentPlayer.floatingCredits;
    if (amount > totalCredits) {
      console.log('Not enough credits', this.currentPlayer);
      throw new Error(`Not enough credits ${amount} > ${totalCredits}`);
    }
    const cardsUsed: GameCard[] = [];
    let remainingAmount: number = amount;
    let totalSpentAmount: number = 0;

    // Spend floating credits first
    if (this.currentPlayer.floatingCredits > 0) {
      const spent: number =
        remainingAmount > this.currentPlayer.floatingCredits
          ? this.currentPlayer.floatingCredits : remainingAmount;
      totalSpentAmount += spent;
      this.currentPlayer.floatingCredits -= spent;
      remainingAmount -= spent;
    }

    // Spend resource cards
    const resourceCards: GameCard[] = this.currentPlayer.hand.filter(
      (card: GameCard) => card.type === `resource`,
    );
    resourceCards
      .sort((a: GameCard, b: GameCard) => b.credits - a.credits)
      .forEach((card: GameCard) => {
        if (card.credits <= remainingAmount) {
          this.currentPlayer.hand.splice(
            this.currentPlayer.hand.indexOf(card),
            1,
          );
          this.currentPlayer.discard.push(card);
          cardsUsed.push(card);
          remainingAmount -= card.credits;
          totalSpentAmount += card.credits;
        }
      });

    // Spend remaining resource cards with the cheapest card
    if (remainingAmount > 0 && resourceCards.length > 0) {
      const card: GameCard | undefined = resourceCards
        .sort((a: GameCard, b: GameCard) => a.credits - b.credits)
        .pop();
      if (!card) {
        throw new Error(`No card found`);
      }
      this.currentPlayer.hand.splice(this.currentPlayer.hand.indexOf(card), 1);
      this.currentPlayer.discard.push(card);
      cardsUsed.push(card);
      remainingAmount -= card.credits;
      totalSpentAmount += card.credits;
      if (remainingAmount > 0) {
        // Recursively spend remaining resource cards
        this.spendCredits(remainingAmount);
      }
    }

    console.log(
      `${this.currentPlayer.name} spent ${totalSpentAmount} credits with ${hadFloating ? `${hadFloating} floating credits and ` : ``} ${cardsUsed
        .map((card: GameCard) => card.name)
        .join(`, `)}`,
    );
    this.currentPlayer.credits -= cardsUsed.reduce(
      (acc: number, card: GameCard) => acc + card.credits,
      0,
    );
    return totalSpentAmount;
  }

  playStrategyCard(cardId: string): void {
    const card = this.currentPlayer.hand.find(
      (c: GameCard) => c.id === cardId,
    )!;
    if (!card) {
      throw new Error(`Card not found: ${cardId}`);
    }
    this.currentPlayer.hand.splice(this.currentPlayer.hand.indexOf(card), 1);
    this.currentPlayer.discard.push(card);
    this.currentPlayer.actions += card.actions ? card.actions : 0;
    this.currentPlayer.buys += card.buys ? card.buys : 0;
    this.currentPlayer.impedes += card.impedes ? card.impedes : 0;
    this.currentPlayer.trash += card.trash ? card.trash : 0;
    this.currentPlayer.floatingCredits += card.credits ? card.credits : 0;
    this.currentPlayer.damage += card.damage ? card.damage : 0;
    this.currentPlayer.defense += card.defense ? card.defense : 0;
    if (card.cards) {
      this.drawCards(this.currentPlayer, card.cards, true);
    }
    this.appendActionLog(`${this.currentPlayer.name} played ${card.name}`);
    this.currentPlayer.actions--;
    if (this.currentPlayer.actions <= 0) {
      console.log(
        `${this.currentPlayer.name} has no actions left, ending their strategy phase`,
      );
      this.endStrategyPhase();
    }
  }

  trashCard(cardId: string): void {
    const card = this.currentPlayer.hand.find(
      (c: GameCard) => c.id === cardId,
    )!;
    this.appendActionLog(`${this.currentPlayer.name} trashes ${card.name}`);
    this.currentPlayer.hand.splice(this.currentPlayer.hand.indexOf(card), 1);
    this.currentPlayer.trash--;
    if (this.currentPlayer.trash <= 0) {
      console.log(
        `${this.currentPlayer.name} has no trash left, ending their cleanup phase`,
      );
      this.endCleanupPhase();
    }
  }

  endStrategyPhase(): void {
    this.appendActionLog(
      `${this.currentPlayer.name} ends their strategy phase`,
    );
    this.phase = `buy`;
  }

  endBuyPhase(): void {
    this.appendActionLog(`${this.currentPlayer.name} ends their buy phase`);
    this.phase = `cleanup`;
  }

  endCleanupPhase(): void {
    this.appendActionLog(`${this.currentPlayer.name} ends their cleanup phase`);
    this.turn++;
    if (this.turn >= 2) {
      this.endRound();
    }

    // Add impeded cards to opponent's discard
    for (let i = 0; i < this.currentPlayer.impedes; i++) {
      this.otherPlayer.discard.push(impededCards[0]);
    }
    this.discardHand(this.currentPlayer);
    this.resetCounters();
    this.drawCards(this.currentPlayer, 5);
    [this.currentPlayer, this.otherPlayer] = [
      this.otherPlayer,
      this.currentPlayer,
    ];
    this.phase = `strategy`;
  }

  endRound(): void {
    this.round++;
    this.turn = 0;

    // apply damage to players
    const player = this.currentPlayer;
    const otherPlayer = this.otherPlayer;

    const damage1 = Math.max(0, player.damage - otherPlayer.defense);
    if (damage1 > 0 || otherPlayer.defense > 0) {
      this.appendActionLog(
        `${otherPlayer.name} takes ${damage1} (${player.damage} dmg - ${otherPlayer.defense} def) damage from ${player.name}`,
      );
    }
    const damage2 = Math.max(0, otherPlayer.damage - player.defense);
    if (damage2 > 0 || player.defense > 0) {
      this.appendActionLog(
        `${player.name} takes ${damage2} (${otherPlayer.damage} dmg - ${player.defense} def) damage from ${otherPlayer.name}`,
      );
    }

    otherPlayer.health -= damage1;
    player.health -= damage2;

    player.damage = 0;
    otherPlayer.damage = 0;
    player.defense = 0;
    otherPlayer.defense = 0;

    if (player.health <= 0) {
      this.appendActionLog(`${player.name} is defeated by ${otherPlayer.name}`);
      this.endGame(otherPlayer);
    }
    if (otherPlayer.health <= 0) {
      this.appendActionLog(`${otherPlayer.name} is defeated by ${player.name}`);
      this.endGame(player);
    }
  }

  resetCounters(): void {
    const player = this.currentPlayer;
    this.appendActionLog(`${player.name} resets their counters`);
    player.actions = 1;
    player.buys = 1;
    player.cards = player.hand.length;
    player.impedes = 0;
    player.trash = 0;
    player.credits = 0;
    player.floatingCredits = 0;
  }

  endGame(winner: Player): void {
    this.appendActionLog(`${winner.name} wins the game`);
    this.gameOver = true;
  }

  private appendActionLog(message: string): void {
    this.actionLog.push(`[${this.round}][${this.turn}] ${message}`);
    console.log(message);
  }
}
