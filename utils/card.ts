enum Color {
  Diamond,
  Club,
  Heart,
  Spade,
}

enum Num {
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

export default class Card {
  constructor(color: Color, number: Num) {}

  public print() {
    console.log("tes card");
  }
}
