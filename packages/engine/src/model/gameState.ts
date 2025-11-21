import { GameCard } from './gameCard.js';

import { Move, MoveRecord } from './move.js';

import { Player, LimitedPlayerInfo, PublicPlayerInfo } from './player.js';

export type Phase = `strategy` | `buy` | `cleanup`;

export interface NextMoveRequest {
  turn: number;
  round: number;
  phase: Phase;
  currentPlayer: LimitedPlayerInfo;
  otherPlayer: PublicPlayerInfo;
  cardSupply: GameCard[];
  actionLog: string[];
  moves: MoveRecord[];
  availableNextMoves: Move[];
}

export class GameState {
  currentPlayer: Player | null;
  otherPlayer: Player | null;
  cardSupply: GameCard[];
  turn: number;
  round: number;
  phase: Phase;
  actionLog: string[];
  moves: MoveRecord[];
  gameOver: boolean;

  constructor() {
    this.currentPlayer = null;
    this.otherPlayer = null;
    this.cardSupply = [];
    this.turn = 0;
    this.round = 0;
    this.phase = `strategy`;
    this.actionLog = [];
    this.moves = [];
    this.gameOver = false;
  }

  setPlayers(playerA: Player, playerB: Player): void {
    this.currentPlayer = playerA;
    this.otherPlayer = playerB;
  }

  getCurrentPlayer(): Player | null {
    return this.currentPlayer;
  }

  getOtherPlayer(): Player | null {
    return this.otherPlayer;
  }

  getCardSupply(): GameCard[] {
    return this.cardSupply;
  }

  getTurn(): number {
    return this.turn;
  }

  getRound(): number {
    return this.round;
  }

  getPhase(): Phase {
    return this.phase;
  }

  getActionLog(): string[] {
    return this.actionLog;
  }

  getMoves(): MoveRecord[] {
    return this.moves;
  }

  getGameOver(): boolean {
    return this.gameOver;
  }

  setCardSupply(cardSupply: GameCard[]): void {
    this.cardSupply = cardSupply;
  }

  setTurn(turn: number): void {
    this.turn = turn;
  }

  setRound(round: number): void {
    this.round = round;
  }

  setPhase(phase: Phase): void {
    this.phase = phase;
  }

  appendActionLog(message: string): void {
    this.actionLog.push(`[${this.round}][${this.turn}][${this.phase}] ${message}`);
  }

  addMove(move: MoveRecord): void {
    this.moves.push(move);
  }

  setGameOver(gameOver: boolean): void {
    this.gameOver = gameOver;
  }
}
