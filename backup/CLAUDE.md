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