export enum Suit {
  Diamonds,
  Clubs,
  Hearts,
  Spades,
}

export enum Rank {
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Nine,
  Ten,
  Jack,
  Queen,
  King,
  Ace,
  Two,
}

export class Card {
  constructor(suit: Suit, rank: Rank) {}

  public print() {
    console.log("tes card");
  }
}
