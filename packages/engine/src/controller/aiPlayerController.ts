import { GameCard, impededCards, resourceCards, strategyCards } from "../model/gameCard";
import { NextMoveRequest } from "../model/gameState";
import { Move } from "../model/move";


export class AiPlayerController {
  constructor() {}

  private strategyMovePriority: GameCard[] = [
    strategyCards.find((card: GameCard) => card.id === `defensive-maneuver`)!,
    strategyCards.find((card: GameCard) => card.id === `preemptive-intelligence`)!,
    strategyCards.find((card: GameCard) => card.id === `aggressive-acquisition`)!,
    strategyCards.find((card: GameCard) => card.id === `counter-espionage`)!,
    strategyCards.find((card: GameCard) => card.id === `critical-hit`)!,
    strategyCards.find((card: GameCard) => card.id === `precision-strike`)!,
    strategyCards.find((card: GameCard) => card.id === `impose-tariffs`)!,
    strategyCards.find((card: GameCard) => card.id === `trade-negotiations`)!,
    strategyCards.find((card: GameCard) => card.id === `technology-investment`)!,
    strategyCards.find((card: GameCard) => card.id === `braintrust-accumulation`)!,
  ];

  private earlyBuyMovePriority: GameCard[] = [
    strategyCards.find((card: GameCard) => card.id === `critical-hit`)!,
    resourceCards.find((card: GameCard) => card.id === `carbon`)!,
    strategyCards.find((card: GameCard) => card.id === `impose-tariffs`)!,
    resourceCards.find((card: GameCard) => card.id === `oxygen`)!,
    strategyCards.find((card: GameCard) => card.id === `trade-negotiations`)!,
    strategyCards.find((card: GameCard) => card.id === `technology-investment`)!,
    strategyCards.find((card: GameCard) => card.id === `braintrust-accumulation`)!,
  ];

  private lateBuyMovePriority: GameCard[] = [
    strategyCards.find((card: GameCard) => card.id === `critical-hit`)!,
    strategyCards.find((card: GameCard) => card.id === `precision-strike`)!,
    strategyCards.find((card: GameCard) => card.id === `preemptive-intelligence`)!,
    strategyCards.find((card: GameCard) => card.id === `defensive-maneuver`)!,
    strategyCards.find((card: GameCard) => card.id === `technology-investment`)!,
    strategyCards.find((card: GameCard) => card.id === `braintrust-accumulation`)!,
  ];

  private trashMovePriority: GameCard[] = [
    impededCards.find((card: GameCard) => card.id === `impeded`)!,
    resourceCards.find((card: GameCard) => card.id === `hydrogen`)!,
  ];

  chooseNextMove(request: NextMoveRequest): Move {
    if (request.phase === `strategy`) {
      return this.chooseStrategyMove(request);
    } else if (request.phase === `buy`) {
      return this.chooseBuyMove(request);
    } else if (request.phase === `cleanup`) {
      return this.chooseTrashMove(request);
    }
    throw new Error(`Invalid phase: ${request.phase}`);
  }

  private chooseStrategyMove(request: NextMoveRequest): Move {
    return this.findBestMove(request.availableNextMoves, this.strategyMovePriority);
  }

  private chooseBuyMove(request: NextMoveRequest): Move {
    const buyMovePriority: GameCard[] = request.round < 8 ? this.earlyBuyMovePriority : this.lateBuyMovePriority;
    return this.findBestMove(request.availableNextMoves, buyMovePriority);
  }

  private chooseTrashMove(request: NextMoveRequest): Move {
    return this.findBestMove(request.availableNextMoves, this.trashMovePriority);
  }

  private findBestMove(availableMoves: Move[], priority: GameCard[]): Move {
    let bestMove: Move = availableMoves[availableMoves.length - 1]!;
    let bestIndex = Infinity;
    availableMoves.forEach((move: Move) => {
      const card = move.card;
      if (card) {
        const index = priority.indexOf(card);
        if (index !== -1 && index < bestIndex) {
          bestMove = move;
          bestIndex = index;
        }
      }
    });
    return bestMove;
  }
}