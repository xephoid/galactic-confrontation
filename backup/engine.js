const impededCard = {id: "impeded", name: "Impeded"};

const strategyCards = [
  {
    id: "counter-intelligence",
    type: "strategy",
    name: "Counter Intelligence (2 actions, 1 impede)",
    price: 300,
    actions: 2,
    impedes: 2,
  },
  {
    id: "preemptive-insurgence",
    type: "strategy",
    name: "Preemptive Insurgence (2 actions, 1 card)",
    price: 300,
    actions: 2,
    cards: 1,
  },
  {
    id: "aggressive-acquisition",
    type: "strategy",
    name: "Aggressive Acquisition (2 actions, 1 buy)",
    price: 300,
    actions: 2,
    buys: 1,
  },
  {
    id: "defensive-maneuver",
    type: "strategy",
    name: "Defensive Maneuver (1 defense, 1 action)",
    price: 300,
    defense: 1,
    actions: 1,
  },
  {
    id: "trade-negotiations",
    type: "strategy",
    name: "Trade Negotiations (200 credits, 1 buy)",
    price: 400,
    credits: 200,
    buys: 1,
  },
  {
    id: "technology-investment",
    type: "strategy",
    name: "Technology Investment (2 defense, 1 buy)",
    price: 400,
    defense: 2,
    buys: 1,
  },
  {
    id: "braintrust-accumulation",
    type: "strategy",
    name: "Braintrust Accumulation (3 cards)",
    price: 400,
    cards: 3,
  },
  {
    id: "impose-tarrifs",
    type: "strategy",
    name: "Impose Tarrifs (200 credits, 1 card, 1 buy)",
    price: 500,
    credits: 200,
    cards: 1,
    buys: 1,
  },
  {
    id: "decisive-strike",
    type: "strategy",
    name: "Decisive Strike (1 damage, 1 trash)",
    price: 600,
    damage: 1,
    trash: 1,
  },
  {
    id: "critical-hit",
    type: "strategy",
    name: "Critical Hit (3 damage, 2 trash)",
    price: 800,
    damage: 3,
    trash: 2,
  },
]

const creditsCards = [
  {
    id: "hydrogen",
    type: "credits",
    name: "Hydrogen 100",
    price: 0,
    credits: 100,
  },
  {
    id: "oxygen",
    type: "credits",
    name: "Oxygen 200",
    price: 300,
    credits: 200,
  }, {
    id: "carbon",
    type: "credits",
    name: "Carbon 300",
    price: 600,
    credits: 300,
  },
];

function drawCards(gameState, player, count, log = false) {
  console.log(`${player.name} attempts to draw ${count} cards (${player.deck.length} cards in deck, ${player.discard.length} cards in discard)`);
  //console.log(player.deck);
  var left = count;
  while (player.deck.length > 0 && left > 0) {
    const card = player.deck.pop();
    player.hand.push(card);
    if (card.type === "credits") {
      player.credits += card.credits;
    }
    left--;
    if (log) {
      console.log(`${player.name} drew ${card.name}`);
      gameState.moves.push({ round: gameState.round, turn: gameState.turn, phase: gameState.phase, player: player.name, move: { action: "draw-card", description: `Drew ${card.name}`, card: card } });
    }
  }
  
  if (left > 0) {
    while (player.discard.length > 0) {
      const card = player.discard.pop();
      player.deck.push(card);
    }
    console.log(`${player.name} added their discard pile into deck`);
    shuffleDeck(gameState, player);
    drawCards(gameState, player, left, log);
  }
}

function shuffleDeck(gameState, player) {
  player.deck = player.deck.sort(() => Math.random() - 0.5);
  console.log(`${player.name} shuffled their deck`);
}

function discardHand(gameState, player) {
  while (player.hand.length > 0) {
    player.discard.push(player.hand.pop());
  }
  console.log(`${player.name} discarded their hand`);
}

function setup() {
  const cardSupply = [];
  strategyCards.forEach(card => {
    cardSupply.push({
      available: 10,
      ...card,
    });
  });

  creditsCards.forEach(card => {
    cardSupply.push({
      ...card,
      available: 10,
    });
  });

  const playerA = {
    name: "Player A",
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

  const playerB = {
    name: "Player B",
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
    playerA.deck.push(creditsCards[0]);
    playerB.deck.push(creditsCards[0]);
  }

  for (let i = 0; i < 3; i++) {
    playerA.deck.push(impededCard);
    playerB.deck.push(impededCard);
  }

  const gameState = {
    currentPlayer: playerA,
    otherPlayer: playerB,
    cardSupply: cardSupply,
    turn: 0,
    round: 0,
    phase: "action",
    actionLog: [],
    moves: [],
  };

  shuffleDeck(gameState, playerA);
  shuffleDeck(gameState, playerB);
  drawCards(gameState, playerA, 5);
  drawCards(gameState, playerB, 5);

  playerA.cards = playerA.hand.length;
  playerB.cards = playerB.hand.length;

  appendActionLog(gameState, `Game started`);

  return gameState;
}

function availableMoves(gameState) {
  switch (gameState.phase) {
    case "action":
      if (gameState.currentPlayer.actions <= 0) {
        return [{ action: "end-strategy", description: "End Strategy Phase" }];
      }
      return getActionMoves(gameState);
    case "buy":
      if (gameState.currentPlayer.buys <= 0) {
        return [{ action: "end-buy", description: "End Buy Phase" }];
      }
      return getBuyMoves(gameState);
    case "cleanup":
      if (gameState.currentPlayer.trash <= 0) {
        return [{ action: "end-cleanup", description: "End Cleanup Phase" }];
      }
      return getCleanupMoves(gameState);
    default:
      throw new Error("Invalid phase");
  }
}

function getActionMoves(gameState) {
  const player = gameState.currentPlayer;
  return [ ...player.hand.filter(card => card.type === "strategy").map(card => {
    return {
      action: "play-strategy",
      description: `Play ${card.name}`,
      card: card,
    };
  }), { action: "end-strategy", description: "End Strategy Phase" }];
}

function getBuyMoves(gameState) {
  const player = gameState.currentPlayer;
  const totalCredits = player.credits + player.floatingCredits;
  return [ ...gameState.cardSupply.filter(card => card.available > 0 && card.price <= totalCredits).map(card => {
    return {
      action: "buy-card",
      description: `Buy ${card.name} (${card.price} credits)`,
      card: card,
    };
  }), { action: "end-buy", description: "End Buy Phase" }];
}

function getCleanupMoves(gameState) {
  return [ ...gameState.currentPlayer.hand.map(card => {
    return {
      action: "trash-card",
      description: `Trash ${card.name}`,
      card: card,
    };
  }), { action: "end-cleanup", description: "End Cleanup Phase" }];
}

function doMove(gameState, move) {
  // console.log('doMove', move);
  gameState.moves.push({ round: gameState.round, turn: gameState.turn, phase: gameState.phase, player: gameState.currentPlayer.name, ...move });
  switch (move.action) {
    case "play-strategy":
      playStrategyCard(gameState, move.card.id);
      break;
    case "buy-card":
      buyCard(gameState, move.card.id);
      break;
    case "end-strategy":
      endStrategyPhase(gameState);
      break;
    case "end-buy":
      endBuyPhase(gameState);
      break;
    case "trash-card":
      trashCard(gameState, move.card.id);
      break;
    case "end-cleanup":
      endCleanupPhase(gameState);
      break;
  }
  // console.log('gameState.moves', gameState.moves);
}

function buyCard(gameState, cardId) {
  const player = gameState.currentPlayer;
  const card = gameState.cardSupply.find(c => c.id === cardId && c.available > 0);

  if (!card) {
    throw new Error("Card not found or not available");
  }
  card.available--;
  player.discard.push(card);
  player.buys--;
  spendCredits(gameState, card.price);
  appendActionLog(gameState, `${player.name} bought ${card.name}`);
  if (player.buys <= 0) {
    console.log(`${player.name} has no buys left, ending their buy phase`);
    endBuyPhase(gameState);
  }
}

function spendCredits(gameState, amount) {
  const player = gameState.currentPlayer;
  var totalCredits = player.credits + player.floatingCredits;
  const hadFloating = player.floatingCredits;
  if (amount > totalCredits) {
    console.log('Not enough credits', player);
    throw new Error("Not enough credits " + amount + " > " + totalCredits);
  }
  var cardsUsed = [];
  var remainingAmount = amount;
  var totalSpentAmount = 0;
  
  // Spend floating credits first
  if (player.floatingCredits > 0) {
    const spent = remainingAmount > player.floatingCredits ? player.floatingCredits : remainingAmount;
    totalSpentAmount += spent;
    player.floatingCredits -= spent;
    remainingAmount -= spent;
  }

  // Spend credits cards
  const creditsCards = player.hand.filter(card => card.type === "credits");
  creditsCards.sort((a, b) => b.credits - a.credits).forEach(card => {
    if (card.credits <= remainingAmount) {
      player.hand.splice(player.hand.indexOf(card), 1);
      player.discard.push(card);
      cardsUsed.push(card);
      remainingAmount -= card.credits;
      totalSpentAmount += card.credits;
    }
  });

  // Spend remaining credits with the cheapest card
  if (remainingAmount > 0 && creditsCards.length > 0) {
    const card = creditsCards.sort((a, b) => a.credits - b.credits).pop();
    player.hand.splice(player.hand.indexOf(card), 1);
    player.discard.push(card);
    cardsUsed.push(card);
    remainingAmount -= card.credits;
    totalSpentAmount += card.credits;
    if (remainingAmount > 0) {
      // Recursively spend remaining credits
      spendCredits(gameState, remainingAmount);
    }
  }
  
  // appendActionLog(gameState, `${player.name} spent ${totalSpentAmount} credits with ${hadFloating ? `${hadFloating} floating credits and ` : ""} ${cardsUsed.map(card => card.name).join(", ")}`);
  player.credits -= cardsUsed.reduce((acc, card) => acc + card.credits, 0);
  return totalSpentAmount;
}

function playStrategyCard(gameState, cardId) {
  const player = gameState.currentPlayer;
  const card = player.hand.find(c => c.id === cardId);
  if (!card) {
    throw new Error("Card not found");
  }
  player.hand.splice(player.hand.indexOf(card), 1);
  player.discard.push(card);
  player.actions += card.actions ? card.actions : 0;
  player.buys += card.buys ? card.buys : 0;
  player.impedes += card.impedes ? card.impedes : 0;
  player.trash += card.trash ? card.trash : 0;
  player.floatingCredits += card.credits ? card.credits : 0;
  player.damage += card.damage ? card.damage : 0;
  player.defense += card.defense ? card.defense : 0;
  if (card.cards) {
    drawCards(gameState, player, card.cards, true);
  }
  appendActionLog(gameState, `${player.name} played ${card.name}`);
  player.actions--;
  if (player.actions <= 0) {
    console.log(`${player.name} has no actions left, ending their strategy phase`);
    endStrategyPhase(gameState);
  }
}

function trashCard(gameState, cardId) {
  const player = gameState.currentPlayer;
  const card = player.hand.find(c => c.id === cardId);
  if (!card) {
    throw new Error("Card not found");
  }
  appendActionLog(gameState, `${player.name} trashes ${card.name}`);
  player.hand.splice(player.hand.indexOf(card), 1);
  player.trash--;
  if (player.trash <= 0) {
    // appendActionLog(gameState, `${player.name} has no trash left, ending their cleanup phase`);
    endCleanupPhase(gameState);
  }
}

function endStrategyPhase(gameState) {
  const player = gameState.currentPlayer;
  appendActionLog(gameState, `${player.name} ends their strategy phase`);
  gameState.phase = "buy";
}

function endBuyPhase(gameState) {
  const player = gameState.currentPlayer;
  appendActionLog(gameState, `${player.name} ends their buy phase`);
  gameState.phase = "cleanup";
}

function endCleanupPhase(gameState) {
  const player = gameState.currentPlayer;
  appendActionLog(gameState, `${player.name} ends their cleanup phase`);
  gameState.turn++;
  if (gameState.turn >= 2) {
    console.log('endRound', gameState);
    endRound(gameState);
  }
  
  // Add impeded cards to opponent's discard
  for (let i = 0; i < player.impedes; i++) {
    gameState.otherPlayer.discard.push(impededCard);
  }
  discardHand(gameState, player);
  resetCounters(gameState);
  drawCards(gameState, player, 5);
  gameState.currentPlayer = gameState.otherPlayer
  gameState.otherPlayer = player;
  gameState.phase = `action`;
}

function endRound(gameState) {
  gameState.round++;
  gameState.turn = 0;

  // apply damage to players
  const player = gameState.currentPlayer;
  const otherPlayer = gameState.otherPlayer;

  const damage1 = Math.max(0, player.damage - otherPlayer.defense);
  if (damage1 > 0 || otherPlayer.defense > 0) {
    appendActionLog(gameState, `${otherPlayer.name} takes ${damage1} (${player.damage} dmg - ${otherPlayer.defense} def) damage from ${player.name}`);
  }
  const damage2 = Math.max(0, otherPlayer.damage - player.defense); 
  if (damage2 > 0 || player.defense > 0) {
    appendActionLog(gameState, `${player.name} takes ${damage2} (${otherPlayer.damage} dmg - ${player.defense} def) damage from ${otherPlayer.name}`);
  }

  otherPlayer.health -= damage1;
  player.health -= damage2;

  player.damage = 0;
  otherPlayer.damage = 0;
  player.defense = 0;
  otherPlayer.defense = 0;

  if (player.health <= 0) {
    appendActionLog(gameState, `${player.name} is defeated by ${otherPlayer.name}`);
    endGame(gameState, otherPlayer);
  }
  if (otherPlayer.health <= 0) {
    appendActionLog(gameState, `${otherPlayer.name} is defeated by ${player.name}`);
    endGame(gameState, player);
  }
}

function resetCounters(gameState) {
  const player = gameState.currentPlayer;
  // appendActionLog(gameState, `${player.name} resets their counters`);
  player.actions = 1;
  player.buys = 1;
  player.cards = player.hand.length;
  player.impedes = 0;
  player.trash = 0;
  player.credits = 0;
  player.floatingCredits = 0;
}

function endGame(gameState, winner) {
  appendActionLog(gameState, `${winner.name} wins the game`);
  gameState.gameOver = true;
}

function appendActionLog(gameState, message) {
  gameState.actionLog.push(`[${gameState.round}][${gameState.turn}] ${message}`);
  console.log(message);
}
