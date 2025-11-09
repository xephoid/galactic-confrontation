const moves = [
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
  {
      "round": 2,
      "turn": 0,
      "phase": "action",
      "player": "Player A",
      "action": "end-strategy",
      "description": "End Strategy Phase"
  },
  {
      "round": 2,
      "turn": 0,
      "phase": "buy",
      "player": "Player A",
      "action": "buy-card",
      "description": "Buy Carbon 300 (600 credits)",
      "card": {
          "id": "carbon",
          "type": "credits",
          "name": "Carbon 300",
          "price": 600,
          "credits": 300,
          "available": 10
      }
  },
  {
      "round": 2,
      "turn": 0,
      "phase": "cleanup",
      "player": "Player A",
      "action": "end-cleanup",
      "description": "End Cleanup Phase"
  },
  {
      "round": 2,
      "turn": 1,
      "phase": "action",
      "player": "Player B",
      "action": "end-strategy",
      "description": "End Strategy Phase"
  },
  {
      "round": 2,
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
          "available": 8
      }
  },
  {
      "round": 2,
      "turn": 1,
      "phase": "cleanup",
      "player": "Player B",
      "action": "end-cleanup",
      "description": "End Cleanup Phase"
  },
  {
      "round": 3,
      "turn": 0,
      "phase": "action",
      "player": "Player A",
      "action": "play-strategy",
      "description": "Play Aggressive Acquisition (2 actions, 1 buy)",
      "card": {
          "available": 9,
          "id": "aggressive-acquisition",
          "type": "strategy",
          "name": "Aggressive Acquisition (2 actions, 1 buy)",
          "price": 300,
          "actions": 2,
          "buys": 1
      }
  },
  {
      "round": 3,
      "turn": 0,
      "phase": "action",
      "player": "Player A",
      "action": "end-strategy",
      "description": "End Strategy Phase"
  },
  {
      "round": 3,
      "turn": 0,
      "phase": "buy",
      "player": "Player A",
      "action": "end-buy",
      "description": "End Buy Phase"
  },
  {
      "round": 3,
      "turn": 0,
      "phase": "cleanup",
      "player": "Player A",
      "action": "end-cleanup",
      "description": "End Cleanup Phase"
  },
  {
      "round": 3,
      "turn": 1,
      "phase": "action",
      "player": "Player B",
      "action": "play-strategy",
      "description": "Play Braintrust Accumulation (3 cards)",
      "card": {
          "available": 9,
          "id": "braintrust-accumulation",
          "type": "strategy",
          "name": "Braintrust Accumulation (3 cards)",
          "price": 400,
          "cards": 3
      }
  },
  {
      "round": 3,
      "turn": 1,
      "phase": "action",
      "player": "Player B",
      "move": {
          "action": "draw-card",
          "description": "Drew Hydrogen 100",
          "card": {
              "id": "hydrogen",
              "type": "credits",
              "name": "Hydrogen 100",
              "price": 0,
              "credits": 100
          }
      }
  },
  {
      "round": 3,
      "turn": 1,
      "phase": "action",
      "player": "Player B",
      "move": {
          "action": "draw-card",
          "description": "Drew Hydrogen 100",
          "card": {
              "id": "hydrogen",
              "type": "credits",
              "name": "Hydrogen 100",
              "price": 0,
              "credits": 100
          }
      }
  },
  {
      "round": 3,
      "turn": 1,
      "phase": "action",
      "player": "Player B",
      "move": {
          "action": "draw-card",
          "description": "Drew Oxygen 200",
          "card": {
              "id": "oxygen",
              "type": "credits",
              "name": "Oxygen 200",
              "price": 300,
              "credits": 200,
              "available": 4
          }
      }
  },
  {
      "round": 3,
      "turn": 1,
      "phase": "buy",
      "player": "Player B",
      "action": "buy-card",
      "description": "Buy Critical Hit (3 damage, 2 trash) (800 credits)",
      "card": {
          "available": 10,
          "id": "critical-hit",
          "type": "strategy",
          "name": "Critical Hit (3 damage, 2 trash)",
          "price": 800,
          "damage": 3,
          "trash": 2
      }
  },
  {
      "round": 3,
      "turn": 1,
      "phase": "cleanup",
      "player": "Player B",
      "action": "end-cleanup",
      "description": "End Cleanup Phase"
  },
  {
      "round": 4,
      "turn": 0,
      "phase": "action",
      "player": "Player A",
      "action": "end-strategy",
      "description": "End Strategy Phase"
  },
  {
      "round": 4,
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
          "available": 7
      }
  },
  {
      "round": 4,
      "turn": 0,
      "phase": "cleanup",
      "player": "Player A",
      "action": "end-cleanup",
      "description": "End Cleanup Phase"
  },
  {
      "round": 4,
      "turn": 1,
      "phase": "action",
      "player": "Player B",
      "action": "play-strategy",
      "description": "Play Braintrust Accumulation (3 cards)",
      "card": {
          "available": 9,
          "id": "braintrust-accumulation",
          "type": "strategy",
          "name": "Braintrust Accumulation (3 cards)",
          "price": 400,
          "cards": 3
      }
  },
  {
      "round": 4,
      "turn": 1,
      "phase": "action",
      "player": "Player B",
      "move": {
          "action": "draw-card",
          "description": "Drew Impeded",
          "card": {
              "id": "impeded",
              "name": "Impeded"
          }
      }
  },
  {
      "round": 4,
      "turn": 1,
      "phase": "action",
      "player": "Player B",
      "move": {
          "action": "draw-card",
          "description": "Drew Hydrogen 100",
          "card": {
              "id": "hydrogen",
              "type": "credits",
              "name": "Hydrogen 100",
              "price": 0,
              "credits": 100
          }
      }
  },
  {
      "round": 4,
      "turn": 1,
      "phase": "action",
      "player": "Player B",
      "move": {
          "action": "draw-card",
          "description": "Drew Impeded",
          "card": {
              "id": "impeded",
              "name": "Impeded"
          }
      }
  },
  {
      "round": 4,
      "turn": 1,
      "phase": "buy",
      "player": "Player B",
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
      "round": 4,
      "turn": 1,
      "phase": "cleanup",
      "player": "Player B",
      "action": "end-cleanup",
      "description": "End Cleanup Phase"
  },
  {
      "round": 5,
      "turn": 0,
      "phase": "action",
      "player": "Player A",
      "action": "end-strategy",
      "description": "End Strategy Phase"
  },
  {
      "round": 5,
      "turn": 0,
      "phase": "buy",
      "player": "Player A",
      "action": "buy-card",
      "description": "Buy Decisive Strike (1 damage, 1 trash) (600 credits)",
      "card": {
          "available": 10,
          "id": "decisive-strike",
          "type": "strategy",
          "name": "Decisive Strike (1 damage, 1 trash)",
          "price": 600,
          "damage": 1,
          "trash": 1
      }
  },
  {
      "round": 5,
      "turn": 0,
      "phase": "cleanup",
      "player": "Player A",
      "action": "end-cleanup",
      "description": "End Cleanup Phase"
  },
  {
      "round": 5,
      "turn": 1,
      "phase": "action",
      "player": "Player B",
      "action": "play-strategy",
      "description": "Play Critical Hit (3 damage, 2 trash)",
      "card": {
          "available": 9,
          "id": "critical-hit",
          "type": "strategy",
          "name": "Critical Hit (3 damage, 2 trash)",
          "price": 800,
          "damage": 3,
          "trash": 2
      }
  },
  {
      "round": 5,
      "turn": 1,
      "phase": "buy",
      "player": "Player B",
      "action": "buy-card",
      "description": "Buy Decisive Strike (1 damage, 1 trash) (600 credits)",
      "card": {
          "available": 9,
          "id": "decisive-strike",
          "type": "strategy",
          "name": "Decisive Strike (1 damage, 1 trash)",
          "price": 600,
          "damage": 1,
          "trash": 1
      }
  },
  {
      "round": 5,
      "turn": 1,
      "phase": "cleanup",
      "player": "Player B",
      "action": "end-cleanup",
      "description": "End Cleanup Phase"
  },
  {
      "round": 6,
      "turn": 0,
      "phase": "action",
      "player": "Player A",
      "action": "play-strategy",
      "description": "Play Decisive Strike (1 damage, 1 trash)",
      "card": {
          "available": 8,
          "id": "decisive-strike",
          "type": "strategy",
          "name": "Decisive Strike (1 damage, 1 trash)",
          "price": 600,
          "damage": 1,
          "trash": 1
      }
  },
  {
      "round": 6,
      "turn": 0,
      "phase": "buy",
      "player": "Player A",
      "action": "buy-card",
      "description": "Buy Impose Tarrifs (200 credits, 1 card, 1 buy) (500 credits)",
      "card": {
          "available": 10,
          "id": "impose-tarrifs",
          "type": "strategy",
          "name": "Impose Tarrifs (200 credits, 1 card, 1 buy)",
          "price": 500,
          "credits": 200,
          "cards": 1,
          "buys": 1
      }
  },
  {
      "round": 6,
      "turn": 0,
      "phase": "cleanup",
      "player": "Player A",
      "action": "trash-card",
      "description": "Trash Impeded",
      "card": {
          "id": "impeded",
          "name": "Impeded"
      }
  },
  {
      "round": 6,
      "turn": 1,
      "phase": "action",
      "player": "Player B",
      "action": "play-strategy",
      "description": "Play Critical Hit (3 damage, 2 trash)",
      "card": {
          "available": 9,
          "id": "critical-hit",
          "type": "strategy",
          "name": "Critical Hit (3 damage, 2 trash)",
          "price": 800,
          "damage": 3,
          "trash": 2
      }
  },
  {
      "round": 6,
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
          "available": 6
      }
  },
  {
      "round": 6,
      "turn": 1,
      "phase": "cleanup",
      "player": "Player B",
      "action": "end-cleanup",
      "description": "End Cleanup Phase"
  },
  {
      "round": 7,
      "turn": 0,
      "phase": "action",
      "player": "Player A",
      "action": "end-strategy",
      "description": "End Strategy Phase"
  },
  {
      "round": 7,
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
          "available": 5
      }
  },
  {
      "round": 7,
      "turn": 0,
      "phase": "cleanup",
      "player": "Player A",
      "action": "end-cleanup",
      "description": "End Cleanup Phase"
  },
  {
      "round": 7,
      "turn": 1,
      "phase": "action",
      "player": "Player B",
      "action": "end-strategy",
      "description": "End Strategy Phase"
  },
  {
      "round": 7,
      "turn": 1,
      "phase": "buy",
      "player": "Player B",
      "action": "buy-card",
      "description": "Buy Impose Tarrifs (200 credits, 1 card, 1 buy) (500 credits)",
      "card": {
          "available": 9,
          "id": "impose-tarrifs",
          "type": "strategy",
          "name": "Impose Tarrifs (200 credits, 1 card, 1 buy)",
          "price": 500,
          "credits": 200,
          "cards": 1,
          "buys": 1
      }
  },
  {
      "round": 7,
      "turn": 1,
      "phase": "cleanup",
      "player": "Player B",
      "action": "end-cleanup",
      "description": "End Cleanup Phase"
  },
  {
      "round": 8,
      "turn": 0,
      "phase": "action",
      "player": "Player A",
      "action": "end-strategy",
      "description": "End Strategy Phase"
  },
  {
      "round": 8,
      "turn": 0,
      "phase": "buy",
      "player": "Player A",
      "action": "buy-card",
      "description": "Buy Decisive Strike (1 damage, 1 trash) (600 credits)",
      "card": {
          "available": 8,
          "id": "decisive-strike",
          "type": "strategy",
          "name": "Decisive Strike (1 damage, 1 trash)",
          "price": 600,
          "damage": 1,
          "trash": 1
      }
  },
  {
      "round": 8,
      "turn": 0,
      "phase": "cleanup",
      "player": "Player A",
      "action": "end-cleanup",
      "description": "End Cleanup Phase"
  },
  {
      "round": 8,
      "turn": 1,
      "phase": "action",
      "player": "Player B",
      "action": "play-strategy",
      "description": "Play Technology Investment (2 defense, 1 buy)",
      "card": {
          "available": 9,
          "id": "technology-investment",
          "type": "strategy",
          "name": "Technology Investment (2 defense, 1 buy)",
          "price": 400,
          "defense": 2,
          "buys": 1
      }
  },
  {
      "round": 8,
      "turn": 1,
      "phase": "buy",
      "player": "Player B",
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
      "round": 8,
      "turn": 1,
      "phase": "buy",
      "player": "Player B",
      "action": "end-buy",
      "description": "End Buy Phase"
  },
  {
      "round": 8,
      "turn": 1,
      "phase": "cleanup",
      "player": "Player B",
      "action": "end-cleanup",
      "description": "End Cleanup Phase"
  }
];