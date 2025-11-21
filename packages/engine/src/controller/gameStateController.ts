import { GameState, NextMoveRequest } from "../model/gameState";
import { GameCard } from "../model/gameCard";
import { Player } from "../model/player";
import { strategyCards, resourceCards, impededCards } from "../model/gameCard";
import { DrawCardMove, EndStrategyMove, EndBuyMove, EndCleanupMove, PlayStrategyMove, TrashCardMove, Move, BuyCardMove, MoveRecord, DiscardHydrogenMove } from "../model/move";

export class GameStateController {
  setup(): GameState {
    const gameState = new GameState();

    const cardSupply: GameCard[] = [];
    strategyCards.forEach((card: GameCard) => {
      cardSupply.push(card);
    });

    resourceCards.forEach((card: GameCard) => {
      cardSupply.push(card);
    });

    gameState.setCardSupply(cardSupply);

    const playerA: Player = new Player(`Player A`);
    playerA.setHealth(10);
    playerA.setTrash(0);
    playerA.setCredits(0);
    playerA.setFloatingCredits(0);
    playerA.setDamage(0);
    playerA.setDefense(0);
    playerA.setCards(0);
    playerA.setBuys(1);
    playerA.setActions(1);
    playerA.setImpedes(0);

    const playerB: Player = new Player(`Player B`);
    playerB.setHealth(10);
    playerB.setTrash(0);
    playerB.setCredits(0);
    playerB.setFloatingCredits(0);
    playerB.setDamage(0);
    playerB.setDefense(0);
    playerB.setCards(0);
    playerB.setBuys(1);
    playerB.setActions(1);
    playerB.setImpedes(0);

    gameState.setPlayers(playerA, playerB);

    for (let i = 0; i < 7; i++) {
      playerA.getDeck().push(resourceCards[0]!);
      playerB.getDeck().push(resourceCards[0]!);
    }

    for (let i = 0; i < 3; i++) {
      playerA.getDeck().push(impededCards[0]!);
      playerB.getDeck().push(impededCards[0]!);
    }

    this.shuffleDeck(playerA);
    this.shuffleDeck(playerB);
    this.drawCards(gameState, playerA, 5);
    this.drawCards(gameState, playerB, 5);

    playerA.setCards(playerA.getHand().length);
    playerB.setCards(playerB.getHand().length);

    gameState.appendActionLog(`Game started`);

    return gameState;
  }

  drawCards(gameState: GameState, player: Player, count: number, log: boolean = false): void {
    console.log(
      `${player.getName()} attempts to draw ${count} cards (${player.getDeck().length} cards in deck, ${player.getDiscard().length} cards in discard)`,
    );
    let left: number = count;
    while (player.getDeck().length > 0 && left > 0) {
      const card: GameCard = player.getDeck().pop()!;
      player.getHand().push(card);
      if (card.type === `resource`) {
        player.setCredits(player.getCredits() + card.credits);
      }
      if (log) {
        gameState.appendActionLog(`${player.getName()} drew ${card.name}`);
        gameState.addMove(new MoveRecord(new DrawCardMove(card), gameState.getRound(), gameState.getTurn(), gameState.getPhase(), player.getName()));
      }
      left--;
    }

    if (left > 0) {
      while (player.getDiscard().length > 0) {
        const card = player.getDiscard().pop()!;
        player.getDeck().push(card);
      }
      console.log(`${player.getName()} added their discard pile into deck`);
      this.shuffleDeck(player);
      this.drawCards(gameState, player, left, log);
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

  getAvailableMoves(gameState: GameState): Move[] {
    switch (gameState.getPhase()) {
      case `strategy`:
        if (gameState.getCurrentPlayer()!.actions <= 0) {
          return [new EndStrategyMove()];
        }
        return this.getActionMoves(gameState);
      case `buy`:
        if (gameState.getCurrentPlayer()!.buys <= 0) {
          return [new EndBuyMove()];
        }
        return this.getBuyMoves(gameState);
      case `cleanup`:
        if (gameState.getCurrentPlayer()!.trash <= 0) {
          return [new EndCleanupMove()];
        }
        return this.getCleanupMoves(gameState);
      default:
        throw new Error(`Invalid phase: ${gameState.getPhase()}`);
    }
  }

  getActionMoves(gameState: GameState): Move[] {
    const player = gameState.getCurrentPlayer();
    if (!player) {
      throw new Error(`Player not found`);
    }
    const strategyMoves = [
      ...player.hand
        .filter((card: GameCard | undefined) => card?.type === `strategy`)
        .map((card: GameCard | undefined) => {
          if (!card) {
            throw new Error(`Card not found`);
          }
          return new PlayStrategyMove(card);
        }),
    ];
    const hydrogenCards = player.hand.filter((card: GameCard | undefined) => card?.id === `hydrogen`);
    if (hydrogenCards.length > 0 && player.health < gameState.getOtherPlayer()!.health) {
      strategyMoves.push(new DiscardHydrogenMove(hydrogenCards.length));
    }
    return [
      ...strategyMoves,
      new EndStrategyMove(),
    ];
  }

  getBuyMoves(gameState: GameState): Move[] {
    const player = gameState.getCurrentPlayer();
    if (!player) {
      throw new Error(`Player not found`);
    }
    const totalCredits = player.credits + player.floatingCredits;
    return [
      ...gameState.getCardSupply()
        .filter(
          (card: GameCard) => card.available > 0 && card.price <= totalCredits,
        )
        .map((card: GameCard) => {
          return new BuyCardMove(card);
        }),
      new EndBuyMove(),
    ];
  }

  getCleanupMoves(gameState: GameState): Move[] {
    const player = gameState.getCurrentPlayer();
    if (!player) {
      throw new Error(`Player not found`);
    }
    return [
      ...player.hand.map((card: GameCard | undefined) => {
        if (!card) {
          throw new Error(`Card not found`);
        }
        return new TrashCardMove(card);
      }),
      new EndCleanupMove(),
    ];
  }

  doMove(gameState: GameState, move: Move): void {
    // console.log('doMove', move);
    gameState.addMove(
      new MoveRecord(
        move,
        gameState.getRound(),
        gameState.getTurn(),
        gameState.getPhase(),
        gameState.getCurrentPlayer()!.name,
      ),
    );

    switch (move.action) {
      case `play-strategy`:
        this.playStrategyCard(gameState, move.card!.id);
        break;
      case `discard-hydrogen`:
        this.discardHydrogen(gameState);
        break;
      case `buy-card`:
        this.buyCard(gameState, move.card!.id);
        break;
      case `end-strategy`:
        this.endStrategyPhase(gameState);
        break;
      case `end-buy`:
        this.endBuyPhase(gameState);
        break;
      case `trash-card`:
        this.trashCard(gameState, move.card!.id);
        break;
      case `end-cleanup`:
        this.endCleanupPhase(gameState);
        break;
    }
  }

  discardHydrogen(gameState: GameState): void {
    const player = gameState.getCurrentPlayer();
    if (!player) {
      throw new Error(`Player not found`);
    }
    const hydrogenCards = player.hand.filter((card: GameCard | undefined) => card?.id === `hydrogen`);
    if (hydrogenCards.length === 0) {
      throw new Error(`No Hydrogen cards found`);
    }
    gameState.appendActionLog(`${player.name} discarded ${hydrogenCards.length} Hydrogen cards`);
    hydrogenCards.forEach((card: GameCard) => {
      player.hand.splice(player.hand.indexOf(card), 1);
      player.credits -= card.credits;
      player.discard.push(card);
    });
    this.drawCards(gameState, player, hydrogenCards.length, true);
  }

  buyCard(gameState: GameState, cardId: string): void {
    const card = gameState.getCardSupply().find(
      (c: GameCard) => c.id === cardId && c.available > 0,
    );
    if (!card) {
      throw new Error(`Card not found or not available: ${cardId}`);
    }
    card.available--;
    gameState.getCurrentPlayer()!.discard.push(card);
    gameState.getCurrentPlayer()!.buys--;
    this.spendCredits(gameState, card.price);
    gameState.appendActionLog(`${gameState.getCurrentPlayer()!.name} bought ${card.name}`);
    if (gameState.getCurrentPlayer()!.buys <= 0) {
      console.log(
        `${gameState.getCurrentPlayer()!.name} has no buys left, ending their buy phase`,
      );
      this.endBuyPhase(gameState);
    }
  }

  spendCredits(gameState: GameState, amount: number): number {
    const totalCredits: number =
      gameState.getCurrentPlayer()!.credits + gameState.getCurrentPlayer()!.floatingCredits;
    const hadFloating = gameState.getCurrentPlayer()!.floatingCredits;
    if (amount > totalCredits) {
      console.log('Not enough credits', gameState.getCurrentPlayer()!);
      throw new Error(`Not enough credits ${amount} > ${totalCredits}`);
    }
    const cardsUsed: GameCard[] = [];
    let remainingAmount: number = amount;
    let totalSpentAmount: number = 0;

    // Spend floating credits first
    if (gameState.getCurrentPlayer()!.floatingCredits > 0) {
      const spent: number =
        remainingAmount > gameState.getCurrentPlayer()!.floatingCredits
          ? gameState.getCurrentPlayer()!.floatingCredits : remainingAmount;
      totalSpentAmount += spent;
      gameState.getCurrentPlayer()!.floatingCredits -= spent;
      remainingAmount -= spent;
    }

    // Spend resource cards
    const resourceCards: (GameCard | undefined)[] = gameState.getCurrentPlayer()!.hand.filter(
      (card: GameCard | undefined) => card?.type === `resource`,
    );
    resourceCards
      .sort((a: GameCard | undefined, b: GameCard | undefined) => (b?.credits ?? 0) - (a?.credits ?? 0))
      .forEach((card: GameCard | undefined) => {
        if (!card) {
          throw new Error(`Card not found`);
        }
        if (card.credits <= remainingAmount) {
          gameState.getCurrentPlayer()!.hand.splice(
            gameState.getCurrentPlayer()!.hand.indexOf(card),
            1,
          );
          gameState.getCurrentPlayer()!.discard.push(card);
          cardsUsed.push(card);
          remainingAmount -= card.credits;
          totalSpentAmount += card.credits;
        }
      });

    // Spend remaining resource cards with the cheapest card
    if (remainingAmount > 0 && resourceCards.length > 0) {
      const card: GameCard | undefined = resourceCards
        .sort((a: GameCard | undefined, b: GameCard | undefined) => (a?.credits ?? 0) - (b?.credits ?? 0))
        .pop();
      if (!card) {
        throw new Error(`No card found`);
      }
      gameState.getCurrentPlayer()!.hand.splice(gameState.getCurrentPlayer()!.hand.indexOf(card), 1);
      gameState.getCurrentPlayer()!.discard.push(card);
      cardsUsed.push(card);
      remainingAmount -= card.credits;
      totalSpentAmount += card.credits;
      if (remainingAmount > 0) {
        // Recursively spend remaining resource cards
        this.spendCredits(gameState, remainingAmount);
      }
    }

    console.log(
      `${gameState.getCurrentPlayer()!.name} spent ${totalSpentAmount} credits with ${hadFloating ? `${hadFloating} floating credits and ` : ``} ${cardsUsed
        .map((card: GameCard) => card.name)
        .join(`, `)}`,
    );
    gameState.getCurrentPlayer()!.credits -= cardsUsed.reduce(
      (acc: number, card: GameCard) => acc + card.credits,
      0,
    );
    return totalSpentAmount;
  }

  playStrategyCard(gameState: GameState, cardId: string): void {
    const card = gameState.getCurrentPlayer()!.hand.find(
      (c: GameCard | undefined) => c?.id === cardId,
    )!;
    if (!card) {
      throw new Error(`Card not found: ${cardId}`);
    }
    gameState.appendActionLog(`${gameState.getCurrentPlayer()!.name} played ${card.name}`);
    gameState.getCurrentPlayer()!.hand.splice(gameState.getCurrentPlayer()!.hand.indexOf(card), 1);
    gameState.getCurrentPlayer()!.discard.push(card);
    gameState.getCurrentPlayer()!.actions += card.actions ? card.actions : 0;
    gameState.getCurrentPlayer()!.buys += card.buys ? card.buys : 0;
    gameState.getCurrentPlayer()!.impedes += card.impedes ? card.impedes : 0;
    gameState.getCurrentPlayer()!.trash += card.trash ? card.trash : 0;
    gameState.getCurrentPlayer()!.floatingCredits += card.credits ? card.credits : 0;
    gameState.getCurrentPlayer()!.damage += card.damage ? card.damage : 0;
    gameState.getCurrentPlayer()!.defense += card.defense ? card.defense : 0;
    if (card.cards) {
      this.drawCards(gameState, gameState.getCurrentPlayer()!, card.cards, true);
    }
    gameState.getCurrentPlayer()!.actions--;
    if (gameState.getCurrentPlayer()!.actions <= 0) {
      console.log(
        `${gameState.getCurrentPlayer()!.name} has no actions left, ending their strategy phase`,
      );
      this.endStrategyPhase(gameState);
    }
  }

  trashCard(gameState: GameState, cardId: string): void {
    const card = gameState.getCurrentPlayer()!.hand.find(
      (c: GameCard | undefined) => c?.id === cardId,
    )!;
    if (!card) {
      throw new Error(`Card not found: ${cardId}`);
    }
    gameState.appendActionLog(`${gameState.getCurrentPlayer()!.name} trashes ${card.name}`);
    gameState.getCurrentPlayer()!.hand.splice(gameState.getCurrentPlayer()!.hand.indexOf(card), 1);
    gameState.getCurrentPlayer()!.trash--;
    if (gameState.getCurrentPlayer()!.trash <= 0) {
      console.log(
        `${gameState.getCurrentPlayer()!.name} has no trash left, ending their cleanup phase`,
      );
      this.endCleanupPhase(gameState);
    }
  }

  endStrategyPhase(gameState: GameState): void {
    gameState.appendActionLog(
      `${gameState.getCurrentPlayer()!.name} ends their strategy phase`,
    );
    gameState.setPhase(`buy`);
  }

  endBuyPhase(gameState: GameState): void {
    gameState.appendActionLog(`${gameState.getCurrentPlayer()!.name} ends their buy phase`);
    gameState.setPhase(`cleanup`);
  }

  endCleanupPhase(gameState: GameState): void {
    gameState.appendActionLog(`${gameState.getCurrentPlayer()!.name} ends their cleanup phase`);
    gameState.setTurn(gameState.getTurn() + 1);
    if (gameState.getTurn() >= 2) {
      this.endRound(gameState);
    }

    // Add impeded cards to opponent's discard
    for (let i = 0; i < gameState.getCurrentPlayer()!.impedes; i++) {
      gameState.getOtherPlayer()!.getDiscard().push(impededCards[0]!);
    }
    this.discardHand(gameState.getCurrentPlayer()!);
    this.resetCounters(gameState);
    this.drawCards(gameState, gameState.getCurrentPlayer()!, 5);
    const currentPlayer = gameState.getCurrentPlayer();
    const otherPlayer = gameState.getOtherPlayer();
    if (!currentPlayer || !otherPlayer) {
      throw new Error(`Player not found`);
    }
    gameState.setPlayers(otherPlayer, currentPlayer);
    gameState.setPhase(`strategy`);
  }

  endRound(gameState: GameState): void {
    gameState.setRound(gameState.getRound() + 1);
    gameState.setTurn(0);

    // apply damage to players
    const player = gameState.getCurrentPlayer();
    const otherPlayer = gameState.getOtherPlayer();
    if (!player || !otherPlayer) {
      throw new Error(`Player not found`);
    }

    const damage1 = Math.max(0, player.damage - otherPlayer.defense);
    if (damage1 > 0 || otherPlayer.defense > 0) {
      gameState.appendActionLog(
        `${otherPlayer.name} takes ${damage1} (${player.damage} dmg - ${otherPlayer.defense} def) damage from ${player.name}`,
      );
    }
    const damage2 = Math.max(0, otherPlayer.damage - player.defense);
    if (damage2 > 0 || player.defense > 0) {
      gameState.appendActionLog(
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
      gameState.appendActionLog(`${player.name} is defeated by ${otherPlayer.name}`);
      this.endGame(gameState, otherPlayer);
    }
    if (otherPlayer.health <= 0) {
      gameState.appendActionLog(`${otherPlayer.name} is defeated by ${player.name}`);
      this.endGame(gameState, player);
    }
  }

  resetCounters(gameState: GameState): void {
    const player = gameState.getCurrentPlayer();
    if (!player) {
      throw new Error(`Player not found`);
    }
    console.log(`${player.name} resets their counters`);
    player.actions = 1;
    player.buys = 1;
    player.cards = player.hand.length;
    player.impedes = 0;
    player.trash = 0;
    player.credits = 0;
    player.floatingCredits = 0;
  }

  endGame(gameState: GameState, winner: Player): void {
    gameState.appendActionLog(`${winner.name} wins the game`);
    gameState.setGameOver(true);
  }

  toNextMoveRequest(gameState: GameState): NextMoveRequest {
    return {
      turn: gameState.getTurn(),
      round: gameState.getRound(),
      phase: gameState.getPhase(),
      currentPlayer: gameState.getCurrentPlayer()!,
      otherPlayer: gameState.getOtherPlayer()!,
      cardSupply: gameState.getCardSupply(),
      actionLog: gameState.getActionLog(),
      moves: gameState.getMoves(),
      availableNextMoves: this.getAvailableMoves(gameState),
    };
  }
}