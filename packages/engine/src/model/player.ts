import { GameCard } from './gameCard.js';

export interface PublicPlayerInfo {
  name: string;
  health: number;
  defense: number;
  damage: number;
}

export interface LimitedPlayerInfo extends PublicPlayerInfo {
  actions: number;
  buys: number;
  trash: number;
  cards: number;
  impedes: number;
  credits: number;
  floatingCredits: number;
  hand: GameCard[];
}

export class Player implements LimitedPlayerInfo {
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

  constructor(name: string = ``) {
    this.name = name;
    this.health = 0;
    this.hand = [];
    this.deck = [];
    this.discard = [];
    this.actions = 0;
    this.buys = 0;
    this.defense = 0;
    this.damage = 0;
    this.trash = 0;
    this.cards = 0;
    this.impedes = 0;
    this.credits = 0;
    this.floatingCredits = 0;
  }

  getName(): string {
    return this.name;
  }

  getHealth(): number {
    return this.health;
  }

  getHand(): (GameCard)[] {
    return this.hand;
  }

  getDeck(): GameCard[] {
    return this.deck;
  }

  getDiscard(): GameCard[] {
    return this.discard;
  }

  getActions(): number {
    return this.actions;
  }

  getBuys(): number {
    return this.buys;
  }

  getDefense(): number {
    return this.defense;
  }

  getDamage(): number {
    return this.damage;
  }

  getTrash(): number {
    return this.trash;
  }

  getCards(): number {
    return this.cards;
  }

  getImpedes(): number {
    return this.impedes;
  }

  getCredits(): number {
    return this.credits;
  }

  getFloatingCredits(): number {
    return this.floatingCredits;
  }

  setActions(actions: number): void {
    this.actions = actions;
  }

  setName(name: string): void {
    this.name = name;
  }

  setHealth(health: number): void {
    this.health = health;
  }

  setBuys(buys: number): void {
    this.buys = buys;
  }

  setDefense(defense: number): void {
    this.defense = defense;
  }

  setDamage(damage: number): void {
    this.damage = damage;
  }

  setTrash(trash: number): void {
    this.trash = trash;
  }

  setCards(cards: number): void {
    this.cards = cards;
  }

  setImpedes(impedes: number): void {
    this.impedes = impedes;
  }

  setCredits(credits: number): void {
    this.credits = credits;
  }

  setFloatingCredits(floatingCredits: number): void {
    this.floatingCredits = floatingCredits;
  }
}