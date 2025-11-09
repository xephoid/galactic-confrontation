class AI {
  constructor(gameState) {
    this.gameState = gameState;
  }

  decideMove(availableMoves) {
    if (this.gameState.phase === "action") {
      return this.decideActionMove(availableMoves);
    } else if (this.gameState.phase === "buy") {
      return this.decideBuyMove(availableMoves);
    } else if (this.gameState.phase === "cleanup") {
      return this.decideCleanupMove(availableMoves);
    }
  }

  decideActionMove(availableMoves) {
  }

  decideBuyMove(availableMoves) {
  }

  decideCleanupMove(availableMoves) {
  }

  setGameState(gameState) {
    this.gameState = gameState;
  }
}

class HardCodedAI extends AI {
  decideActionMove(availableMoves) {
    // Play the most expensive strategy card
    console.log('decideActionMove', availableMoves);
    return this.findMaxValueMove(availableMoves);
  }

  findMaxValueMove(availableMoves) {
    var maxValue = 0;
    availableMoves.forEach(move => {
      const value = move.card ? move.card.price : 0;
      if (value > maxValue) {
        maxValue = value;
      }
    });
    availableMoves.sort(() => Math.random() - 0.5);
    const maxMove = availableMoves.find(move => move.card ? move.card.price === maxValue : false);
    return maxMove ? maxMove : availableMoves[0];
  }

  findMinValueMove(availableMoves) {
    var minValue = Infinity;
    availableMoves.forEach(move => {
      const value = move.card ? move.card.price : 0;
      if (value < minValue) {
        minValue = value;
      }
    });
    availableMoves.sort(() => Math.random() - 0.5);
    const minMove = availableMoves.find(move => move.card ? move.card.price === minValue : false);
    return minMove ? minMove : availableMoves[0];
  }

  decideBuyMove(availableMoves) {
    // Buy the most expensive card
    console.log('decideBuyMove', availableMoves);
    const move = this.findMaxValueMove(availableMoves.filter(move => move.action === "end-buy" || (move.card && move.card.price > 0))); // Don't buy hydrogen cards
    return move;
  }

  decideCleanupMove(availableMoves) {
    // Trash the cheapest card
    console.log('decideCleanupMove', availableMoves);
    return this.findMinValueMove(availableMoves);
  }
}

class ClaudeAI extends AI {
  constructor(gameState, apiKey, apiUrl = 'https://api.anthropic.com/v1/messages') {
    super(gameState);
    this.apiKey = apiKey;
    this.apiUrl = apiUrl;
    this.maxRetries = 3;
  }

  async decideMove(availableMoves) {
    const forApiData = this.formatForApi(availableMoves);
    
    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        console.log(`Claude AI attempt ${attempt}/${this.maxRetries}`);
        const response = await this.callClaudeApi(forApiData);
        
        if (this.validateResponse(response, availableMoves)) {
          console.log('Claude AI response validated successfully');
          return response;
        } else {
          console.log(`Claude AI attempt ${attempt}: Invalid response format or move not in available moves`);
          if (attempt === this.maxRetries) {
            console.log('Claude AI exhausted all retries, falling back to random move');
            return availableMoves[Math.floor(Math.random() * availableMoves.length)];
          }
        }
      } catch (error) {
        console.log(`Claude AI attempt ${attempt}: API call failed:`, error.message);
        if (attempt === this.maxRetries) {
          console.log('Claude AI exhausted all retries, falling back to random move');
          return availableMoves[Math.floor(Math.random() * availableMoves.length)];
        }
      }
    }
  }

  formatForApi(availableMoves) {
    const gameState = this.gameState;
    return {
      gameState: {
        turn: gameState.turn,
        round: gameState.round,
        phase: gameState.phase,
        currentPlayer: {
          name: gameState.currentPlayer.name,
          health: gameState.currentPlayer.health,
          damage: gameState.currentPlayer.damage,
          defense: gameState.currentPlayer.defense,
          cards: gameState.currentPlayer.cards,
          buys: gameState.currentPlayer.buys,
          actions: gameState.currentPlayer.actions,
          impedes: gameState.currentPlayer.impedes,
          trash: gameState.currentPlayer.trash,
          credits: gameState.currentPlayer.credits,
          floatingCredits: gameState.currentPlayer.floatingCredits,
          hand: gameState.currentPlayer.hand,
        },
        otherPlayer: {
          name: gameState.otherPlayer.name,
          health: gameState.otherPlayer.health,
          damage: gameState.otherPlayer.damage,
          defense: gameState.otherPlayer.defense,
        },
        cardSupply: gameState.cardSupply,
        actionLog: gameState.actionLog,
        moves: gameState.moves,
      }, 
      availableNextMoves: availableMoves
    };
  }

  async callClaudeApi(forApiData) {
    const prompt = `Here is the current game state and available moves:\n\n${JSON.stringify(forApiData, null, 2)}\n\nRespond with a valid JSON object selecting one of the available moves. The response must be in this exact format:\n{\n  "action": "move_action",\n  "description": "move description",\n  "card": { /* card object if applicable */ },\n  "reasoning": "brief explanation of your reasoning"\n}`;

    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 1024,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: `Here are the rules of the game:\n\n${gameRules}`
          },
          {
          role: 'user',
          content: prompt
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.content[0].text;
    
    // Try to extract JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }

    try {
      return JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      throw new Error(`Invalid JSON in response: ${parseError.message}`);
    }
  }

  validateResponse(response, availableMoves) {
    // Check if response has required fields
    if (!response || typeof response !== 'object') {
      console.log('Invalid response: not an object');
      return false;
    }

    if (!response.action || !response.description) {
      console.log('Invalid response: missing action or description');
      return false;
    }

    // Check if the response matches one of the available moves
    const matchingMove = availableMoves.find(move => {
      if (move.action !== response.action) {
        return false;
      }

      // For moves with cards, check if card matches
      if (move.card && response.card) {
        return move.card.id === response.card.id;
      }

      // For moves without cards, just check action
      if (!move.card && !response.card) {
        return true;
      }

      return false;
    });

    if (!matchingMove) {
      console.log('Invalid response: move not found in available moves', response);
      console.log('Available moves:', availableMoves);
      return false;
    }

    return true;
  }

  // Override the base class methods to use the unified decideMove
  async decideActionMove(availableMoves) {
    return await this.decideMove(availableMoves);
  }

  async decideBuyMove(availableMoves) {
    return await this.decideMove(availableMoves);
  }

  async decideCleanupMove(availableMoves) {
    return await this.decideMove(availableMoves);
  }
}
const gameRules = `
# Galactic Confrontation

## Components

### Resource Cards
Hydrogen
Oxygen
Carbon

### Strategy Cards
Counter intelligence
Preemptive Insurgence
Impose Tariffs 
Trade negotiation
Decisive strike
Critical hit
Defensive maneuver
Technology investment
Aggressive acquisition
Braintrust accumulation

### Impeded Cards

## The Game
This is a two player strategy deck building game. Players buy action and resource cards to build a deck that can beat their opponent.

The goal of the game is to reduce your opponents base hit points to 0. The game is played over several rounds where each player takes a turn. Each round has two phases. First is the player phase where each player takes a turn. Then there is a combat resolution phase where damage is dealt.

## Setup

Separate all the different cards into individual piles so that all the cards of the same name are in their own piles. There are 10 cards of each kind. This is called the supply. Then each player builds a starting deck with 7 Hydrogen cards and 3 Impeded cards and shuffles them. Players then each draw 5 cards into their hand. Each player starts with 10 base hit points.

## Hot to Play
A player’s turn also has multiple phases. They are as follows:
1. Strategy
2. Buy
3. Cleanup

The strategy phase is where the player may play strategy cards from their hand. By default the player can play one strategy card. However, the card may allow them to increase the number of strategy cards they can play. It may also give other bonuses. Once a card is played it is placed in the player’s discard pile unless it is a damage or defense card. When playing a strategy card its effect is immediately applied and effects can stack so think carefully about the sequence of cards you will play. Some strategy cards allow you to draw more cards which can be useful to play more cards or gain more resources.

The buy phase is where the player may use resource cards to pay for additional cards from the supply. Each card has a price and the player can combine resources to add up to the price of the card. There is no change after a card is purchased. If there is a situation where the player must spend more resource cards than they need to purchase a card the extra is lost. Once a card is purchased the player may put that card in their discard pile. They also put all resource cards used for the purchase into the discard pile as well. By default the player may only purchase on card during their Buy Phase, however there are strategy cards which may increase the number of cards a player can buy. There are also strategy cards that increase the amount of resources the player has available during the Buy Phase. These resources can only be used during the subsequent buy phase that the strategy card was played. Once the Buy Phase ends the additional resources are lost if they are not spent.

The cleanup phase is at the end of the player’s turn. Some strategy cards allow the player to trash a number of cards. The player may trash cards at this time. To trash a card simply remove it from the game. At this point they will discard any cards left in their hand. Then draw a new set of 5 cards from their deck. If they are unable to draw more cards because the deck has run out they first draw the cars that are left and then they must shuffle their discard pile and this becomes their new deck where they then draw the remaining cards.

After both players have finished their turn the combat phase of the round begins. During this phase players count up damage and defense from strategy cards they played during their strategy phase. Defense cards reduce the damage an opponent has done. Both players calculate damage simultaneously and reduce their base hit points. If a player has 0 or less base hit points they have been defeated and their opponent wins! If both have been reduced to 0 or less at the same time then the game ends in a tie. If neither has been reduced to 0 all damage and defense cards are discarded and the next round begins.

## Impeded cards
Impeded cards have no use in the game. They represent setbacks the players face when trying to achieve their goals. They cannot be played or discarded during the strategy or buy phase. They can only be trashed or discarded during the cleanup phase.

## Strategy Card Explanations

Counter Intelligence - Price 200 credits. Allows the player to play 2 more strategy cards and add 2 Impeded cards (from the supply) to their opponents discard pile.

Preemptive Insurgence - Price 300 credits. Allows the player to draw an additional card from their deck and play 2 more strategy cards.

Aggressive Acquisition - Prices 300 credits. Allows the player to play 2 more strategy cards and lets them buy an additional card during their buy phase.

Defensive Maneuver - Price 300 credits. Allows the player to play 1 more strategy card and also adds 1 defense during the combat phase.

Trade Negotiations - Price 400 credits. The player gains 200 more credits and can buy an additional card during their buy phase.

Technology Investment - Price 400 credits. Allows the player to buy and additional card during their buy phase and adds 2 defence during the combat phase

Braintrust Accumulation - Price 400 credits. Allow the player to immediately draw 3 cards from their deck.

Impose Tariffs - Price 500 credits. Allows the player to immediately draw 1 card from their deck then they gain 200 more credits and can buy an additional card during their buy phase.

Decisive Strike - Price 600 credits. Allows the player to trash 1 card from their hand during their cleanup phase and deals 1 damage during the combat phase.

Critical Hit - Price 800 credits. Allows the player to trash 2 cards from their hand during their cleanup phase and deals 3 damage during the combat phase.

## Resource cards

Hydrogen - Price 0 credits. Worth 100 credits.

Oxygen - Price 300 credits. Worth 200 credits.

Carbon - Price 600 credits. Worth 300 credits.

`;

const systemPrompt = `
You are a master of the game Galactic Confrontation. You will be give an README document with the rules. You will be sent the current state of the game and a set of next moves to choose from. It will be JSON in the following format:

{
  gameState: {
    "currentPlayer": {
        "name": "Player A",
        "health": 4,
        "credits": 100,
        "floatingCredits": 0,
        "hand": [
            {
                "available": 9,
                "id": "aggressive-acquisition",
                "type": "strategy",
                "name": "Aggressive Acquisition (2 actions, 1 buy)",
                "price": 300,
                "actions": 2,
                "buys": 1
            },
            {
                "id": "hydrogen",
                "type": "credits",
                "name": "Hydrogen 100",
                "price": 0,
                "credits": 100
            },
            {
                "available": 8,
                "id": "impose-tarrifs",
                "type": "strategy",
                "name": "Impose Tarrifs (200 credits, 1 card, 1 buy)",
                "price": 500,
                "credits": 200,
                "cards": 1,
                "buys": 1
            },
            {
                "id": "hydrogen",
                "type": "credits",
                "name": "Hydrogen 100",
                "price": 0,
                "credits": 100
            },
            {
                "available": 7,
                "id": "decisive-strike",
                "type": "strategy",
                "name": "Decisive Strike (1 damage, 1 trash)",
                "price": 600,
                "damage": 1,
                "trash": 1
            }
        ],
    },
    "otherPlayer": {
      name: "PlayerB"
      health: 10,
    },
    "cardSupply": [
        {
            "available": 9,
            "id": "counter-intelligence",
            "type": "strategy",
            "name": "Counter Intelligence (2 actions, 1 impede)",
            "price": 300,
            "actions": 2,
            "impedes": 2
        },
        {
            "available": 10,
            "id": "preemptive-insurgence",
            "type": "strategy",
            "name": "Preemptive Insurgence (2 actions, 1 card)",
            "price": 300,
            "actions": 2,
            "cards": 1
        },
        {
            "available": 9,
            "id": "aggressive-acquisition",
            "type": "strategy",
            "name": "Aggressive Acquisition (2 actions, 1 buy)",
            "price": 300,
            "actions": 2,
            "buys": 1
        },
        {
            "available": 10,
            "id": "defensive-maneuver",
            "type": "strategy",
            "name": "Defensive Maneuver (1 defense, 1 action)",
            "price": 300,
            "defense": 1,
            "actions": 1
        },
        {
            "available": 10,
            "id": "trade-negotiations",
            "type": "strategy",
            "name": "Trade Negotiations (200 credits, 1 buy)",
            "price": 400,
            "credits": 200,
            "buys": 1
        },
        {
            "available": 9,
            "id": "technology-investment",
            "type": "strategy",
            "name": "Technology Investment (2 defense, 1 buy)",
            "price": 400,
            "defense": 2,
            "buys": 1
        },
        {
            "available": 9,
            "id": "braintrust-accumulation",
            "type": "strategy",
            "name": "Braintrust Accumulation (3 cards)",
            "price": 400,
            "cards": 3
        },
        {
            "available": 8,
            "id": "impose-tarrifs",
            "type": "strategy",
            "name": "Impose Tarrifs (200 credits, 1 card, 1 buy)",
            "price": 500,
            "credits": 200,
            "cards": 1,
            "buys": 1
        },
        {
            "available": 7,
            "id": "decisive-strike",
            "type": "strategy",
            "name": "Decisive Strike (1 damage, 1 trash)",
            "price": 600,
            "damage": 1,
            "trash": 1
        },
        {
            "available": 9,
            "id": "critical-hit",
            "type": "strategy",
            "name": "Critical Hit (3 damage, 2 trash)",
            "price": 800,
            "damage": 3,
            "trash": 2
        },
        {
            "id": "hydrogen",
            "type": "credits",
            "name": "Hydrogen 100",
            "price": 0,
            "credits": 100,
            "available": 10
        },
        {
            "id": "oxygen",
            "type": "credits",
            "name": "Oxygen 200",
            "price": 300,
            "credits": 200,
            "available": 4
        },
        {
            "id": "carbon",
            "type": "credits",
            "name": "Carbon 300",
            "price": 600,
            "credits": 300,
            "available": 9
        }
    ],
    "turn": 0,
    "round": 9,
    "phase": "action",
    "actionLog": [
        "[0][0] Game started",
        "[0][0] Player A ends their strategy phase",
        "[0][0] Player A bought Oxygen 200",
        "[0][0] Player A ends their buy phase",
        "[0][0] Player A ends their cleanup phase",
        "[0][1] Player B ends their strategy phase",
        "[0][1] Player B bought Braintrust Accumulation (3 cards)",
        "[0][1] Player B ends their buy phase",
        "[0][1] Player B ends their cleanup phase",
        "[1][0] Player A ends their strategy phase",
        "[1][0] Player A bought Aggressive Acquisition (2 actions, 1 buy)",
        "[1][0] Player A ends their buy phase",
        "[1][0] Player A ends their cleanup phase",
        "[1][1] Player B ends their strategy phase",
        "[1][1] Player B bought Oxygen 200",
        "[1][1] Player B ends their buy phase",
        "[1][1] Player B ends their cleanup phase",
        "[2][0] Player A ends their strategy phase",
        "[2][0] Player A bought Carbon 300",
        "[2][0] Player A ends their buy phase",
        "[2][0] Player A ends their cleanup phase",
        "[2][1] Player B ends their strategy phase",
        "[2][1] Player B bought Oxygen 200",
        "[2][1] Player B ends their buy phase",
        "[2][1] Player B ends their cleanup phase",
        "[3][0] Player A played Aggressive Acquisition (2 actions, 1 buy)",
        "[3][0] Player A ends their strategy phase",
        "[3][0] Player A ends their buy phase",
        "[3][0] Player A ends their cleanup phase",
        "[3][1] Player B played Braintrust Accumulation (3 cards)",
        "[3][1] Player B ends their strategy phase",
        "[3][1] Player B bought Critical Hit (3 damage, 2 trash)",
        "[3][1] Player B ends their buy phase",
        "[3][1] Player B ends their cleanup phase",
        "[4][0] Player A ends their strategy phase",
        "[4][0] Player A bought Oxygen 200",
        "[4][0] Player A ends their buy phase",
        "[4][0] Player A ends their cleanup phase",
        "[4][1] Player B played Braintrust Accumulation (3 cards)",
        "[4][1] Player B ends their strategy phase",
        "[4][1] Player B bought Technology Investment (2 defense, 1 buy)",
        "[4][1] Player B ends their buy phase",
        "[4][1] Player B ends their cleanup phase",
        "[5][0] Player A ends their strategy phase",
        "[5][0] Player A bought Decisive Strike (1 damage, 1 trash)",
        "[5][0] Player A ends their buy phase",
        "[5][0] Player A ends their cleanup phase",
        "[5][1] Player B played Critical Hit (3 damage, 2 trash)",
        "[5][1] Player B ends their strategy phase",
        "[5][1] Player B bought Decisive Strike (1 damage, 1 trash)",
        "[5][1] Player B ends their buy phase",
        "[5][1] Player B ends their cleanup phase",
        "[6][0] Player A takes 3 (3 dmg - 0 def) damage from Player B",
        "[6][0] Player A played Decisive Strike (1 damage, 1 trash)",
        "[6][0] Player A ends their strategy phase",
        "[6][0] Player A bought Impose Tarrifs (200 credits, 1 card, 1 buy)",
        "[6][0] Player A ends their buy phase",
        "[6][0] Player A trashes Impeded",
        "[6][0] Player A ends their cleanup phase",
        "[6][1] Player B played Critical Hit (3 damage, 2 trash)",
        "[6][1] Player B ends their strategy phase",
        "[6][1] Player B bought Oxygen 200",
        "[6][1] Player B ends their buy phase",
        "[6][1] Player B ends their cleanup phase",
        "[7][0] Player A takes 3 (3 dmg - 0 def) damage from Player B",
        "[7][0] Player B takes 1 (1 dmg - 0 def) damage from Player A",
        "[7][0] Player A ends their strategy phase",
        "[7][0] Player A bought Oxygen 200",
        "[7][0] Player A ends their buy phase",
        "[7][0] Player A ends their cleanup phase",
        "[7][1] Player B ends their strategy phase",
        "[7][1] Player B bought Impose Tarrifs (200 credits, 1 card, 1 buy)",
        "[7][1] Player B ends their buy phase",
        "[7][1] Player B ends their cleanup phase",
        "[8][0] Player A ends their strategy phase",
        "[8][0] Player A bought Decisive Strike (1 damage, 1 trash)",
        "[8][0] Player A ends their buy phase",
        "[8][0] Player A ends their cleanup phase",
        "[8][1] Player B played Technology Investment (2 defense, 1 buy)",
        "[8][1] Player B ends their strategy phase",
        "[8][1] Player B bought Counter Intelligence (2 actions, 1 impede)",
        "[8][1] Player B ends their buy phase",
        "[8][1] Player B ends their cleanup phase",
        "[9][0] Player B takes 0 (0 dmg - 2 def) damage from Player A"
    ],
    "moves": [
        {
            "round": 0,
            "turn": 0,
            "phase": "action",
            "player": "Player A",
            "action": "end-strategy",
            "description": "End Strategy Phase"
        },
        {
            "round": 0,
            "turn": 0,
            "phase": "buy",
            "player": "Player A",
            "action": "buy-card",
            "description": "Buy Oxygen 200 (300 credits)",
            "card": {
                "id": "oxygen",
                "type": "credits",
                "name": "Oxygen 200",
                "price": 300,
                "credits": 200,
                "available": 10
            }
        },
        {
            "round": 0,
            "turn": 0,
            "phase": "cleanup",
            "player": "Player A",
            "action": "end-cleanup",
            "description": "End Cleanup Phase"
        },
        {
            "round": 0,
            "turn": 1,
            "phase": "action",
            "player": "Player B",
            "action": "end-strategy",
            "description": "End Strategy Phase"
        },
        {
            "round": 0,
            "turn": 1,
            "phase": "buy",
            "player": "Player B",
            "action": "buy-card",
            "description": "Buy Braintrust Accumulation (3 cards) (400 credits)",
            "card": {
                "available": 10,
                "id": "braintrust-accumulation",
                "type": "strategy",
                "name": "Braintrust Accumulation (3 cards)",
                "price": 400,
                "cards": 3
            }
        },
        {
            "round": 0,
            "turn": 1,
            "phase": "cleanup",
            "player": "Player B",
            "action": "end-cleanup",
            "description": "End Cleanup Phase"
        },
        {
            "round": 1,
            "turn": 0,
            "phase": "action",
            "player": "Player A",
            "action": "end-strategy",
            "description": "End Strategy Phase"
        },
        {
            "round": 1,
            "turn": 0,
            "phase": "buy",
            "player": "Player A",
            "action": "buy-card",
            "description": "Buy Aggressive Acquisition (2 actions, 1 buy) (300 credits)",
            "card": {
                "available": 10,
                "id": "aggressive-acquisition",
                "type": "strategy",
                "name": "Aggressive Acquisition (2 actions, 1 buy)",
                "price": 300,
                "actions": 2,
                "buys": 1
            }
        },
        {
            "round": 1,
            "turn": 0,
            "phase": "cleanup",
            "player": "Player A",
            "action": "end-cleanup",
            "description": "End Cleanup Phase"
        },
        {
            "round": 1,
            "turn": 1,
            "phase": "action",
            "player": "Player B",
            "action": "end-strategy",
            "description": "End Strategy Phase"
        },
        {
            "round": 1,
            "turn": 1,
            "phase": "buy",
            "player": "Player B",
            "action": "buy-card",
            "description": "Buy Oxygen 200 (300 credits)",
            "card": {
                "id": "oxygen",
                "type": "credits",
                "name": "Oxygen 200",
                "price": 300,
                "credits": 200,
                "available": 9
            }
        },
        {
            "round": 1,
            "turn": 1,
            "phase": "cleanup",
            "player": "Player B",
            "action": "end-cleanup",
            "description": "End Cleanup Phase"
        },
    ]
},
  availableNextMoves: [
    {
        "action": "buy-card",
        "description": "Buy Counter Intelligence (2 actions, 1 impede) (300 credits)",
        "card": {
            "available": 10,
            "id": "counter-intelligence",
            "type": "strategy",
            "name": "Counter Intelligence (2 actions, 1 impede)",
            "price": 300,
            "actions": 2,
            "impedes": 2
        }
    },
    {
        "action": "buy-card",
        "description": "Buy Preemptive Insurgence (2 actions, 1 card) (300 credits)",
        "card": {
            "available": 10,
            "id": "preemptive-insurgence",
            "type": "strategy",
            "name": "Preemptive Insurgence (2 actions, 1 card)",
            "price": 300,
            "actions": 2,
            "cards": 1
        }
    },
    {
        "action": "buy-card",
        "description": "Buy Aggressive Acquisition (2 actions, 1 buy) (300 credits)",
        "card": {
            "available": 10,
            "id": "aggressive-acquisition",
            "type": "strategy",
            "name": "Aggressive Acquisition (2 actions, 1 buy)",
            "price": 300,
            "actions": 2,
            "buys": 1
        }
    },
    {
        "action": "buy-card",
        "description": "Buy Defensive Maneuver (1 defense, 1 action) (300 credits)",
        "card": {
            "available": 10,
            "id": "defensive-maneuver",
            "type": "strategy",
            "name": "Defensive Maneuver (1 defense, 1 action)",
            "price": 300,
            "defense": 1,
            "actions": 1
        }
    },
    {
        "action": "buy-card",
        "description": "Buy Trade Negotiations (200 credits, 1 buy) (400 credits)",
        "card": {
            "available": 10,
            "id": "trade-negotiations",
            "type": "strategy",
            "name": "Trade Negotiations (200 credits, 1 buy)",
            "price": 400,
            "credits": 200,
            "buys": 1
        }
    },
    {
        "action": "buy-card",
        "description": "Buy Technology Investment (2 defense, 1 buy) (400 credits)",
        "card": {
            "available": 10,
            "id": "technology-investment",
            "type": "strategy",
            "name": "Technology Investment (2 defense, 1 buy)",
            "price": 400,
            "defense": 2,
            "buys": 1
        }
    },
    {
        "action": "buy-card",
        "description": "Buy Braintrust Accumulation (3 cards) (400 credits)",
        "card": {
            "available": 10,
            "id": "braintrust-accumulation",
            "type": "strategy",
            "name": "Braintrust Accumulation (3 cards)",
            "price": 400,
            "cards": 3
        }
    },
    {
        "action": "buy-card",
        "description": "Buy Hydrogen 100 (0 credits)",
        "card": {
            "id": "hydrogen",
            "type": "credits",
            "name": "Hydrogen 100",
            "price": 0,
            "credits": 100,
            "available": 10
        }
    },
    {
        "action": "buy-card",
        "description": "Buy Oxygen 200 (300 credits)",
        "card": {
            "id": "oxygen",
            "type": "credits",
            "name": "Oxygen 200",
            "price": 300,
            "credits": 200,
            "available": 10
        }
    },
    {
        "action": "end-buy",
        "description": "End Buy Phase"
    }
]
}

You only respond with JSON in the following format:
{
        "action": "buy-card",
        "description": "Buy Oxygen 200 (300 credits)",
        "card": {
            "id": "oxygen",
            "type": "credits",
            "name": "Oxygen 200",
            "price": 300,
            "credits": 200,
        },
        "reasoning": "[A short description of your reasoning for making this move]"
    }

Be sure to refer to the STRATEGY file when deciding your next move.

The response MUST be one of the options provided in the availableNextMoves. Do not create new moves that are not from the request.

Please only respond with JSON
`;