export interface AIConfig {
  model: string;
  maxTokens: number;
  systemPrompt: string;
  gameRules: string;
  bestStrategy: string;
}

export const aiConfig: AIConfig = {
  model: 'claude-haiku-4-5-20251001',
  maxTokens: 1024,
  systemPrompt: `
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
                "id": "hydrogen",
                "type": "credits",
                "name": "Hydrogen 100",
                "price": 0,
                "credits": 100
            },
            {
                "available": 8,
                "id": "impose-tariffs",
                "type": "strategy",
                "name": "Impose Tariffs (200 credits, 1 card, 1 buy)",
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
                "id": "precision-strike",
                "type": "strategy",
                "name": "Precision Strike (1 damage, 1 trash)",
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
            "id": "counter-espionage",
            "type": "strategy",
            "name": "Counter Espionage (2 actions, 1 impede)",
            "price": 300,
            "actions": 2,
            "impedes": 2
        },
        {
            "available": 10,
            "id": "preemptive-intelligence",
            "type": "strategy",
            "name": "Preemptive Intelligence (2 actions, 1 card)",
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
            "id": "impose-tariffs",
            "type": "strategy",
            "name": "Impose Tariffs (200 credits, 1 card, 1 buy)",
            "price": 500,
            "credits": 200,
            "cards": 1,
            "buys": 1
        },
        {
            "available": 7,
            "id": "precision-strike",
            "type": "strategy",
            "name": "Precision Strike (1 damage, 1 trash)",
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
        "[1][0] Player A bought Oxygen 200",
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
        "[5][0] Player A bought Precision Strike (1 damage, 1 trash)",
        "[5][0] Player A ends their buy phase",
        "[5][0] Player A ends their cleanup phase",
        "[5][1] Player B played Critical Hit (3 damage, 2 trash)",
        "[5][1] Player B ends their strategy phase",
        "[5][1] Player B bought Precision Strike (1 damage, 1 trash)",
        "[5][1] Player B ends their buy phase",
        "[5][1] Player B ends their cleanup phase",
        "[6][0] Player A takes 3 (3 dmg - 0 def) damage from Player B",
        "[6][0] Player A played Precision Strike (1 damage, 1 trash)",
        "[6][0] Player A ends their strategy phase",
        "[6][0] Player A bought Impose Tariffs (200 credits, 1 card, 1 buy)",
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
        "[7][1] Player B bought Impose Tariffs (200 credits, 1 card, 1 buy)",
        "[7][1] Player B ends their buy phase",
        "[7][1] Player B ends their cleanup phase",
        "[8][0] Player A ends their strategy phase",
        "[8][0] Player A bought Precision Strike (1 damage, 1 trash)",
        "[8][0] Player A ends their buy phase",
        "[8][0] Player A ends their cleanup phase",
        "[8][1] Player B played Technology Investment (2 defense, 1 buy)",
        "[8][1] Player B ends their strategy phase",
        "[8][1] Player B bought Counter Espionage (2 actions, 1 impede)",
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
        "description": "Buy Counter Espionage (2 actions, 1 impede) (300 credits)",
        "card": {
            "available": 10,
            "id": "counter-espionage",
            "type": "strategy",
            "name": "Counter Espionage (2 actions, 1 impede)",
            "price": 300,
            "actions": 2,
            "impedes": 2
        }
    },
    {
        "action": "buy-card",
        "description": "Buy Preemptive Intelligence (2 actions, 1 card) (300 credits)",
        "card": {
            "available": 10,
            "id": "preemptive-intelligence",
            "type": "strategy",
            "name": "Preemptive Intelligence (2 actions, 1 card)",
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
  `,
  gameRules: `
# Galactic Confrontation

## Components

### Resource Cards
Hydrogen
Oxygen
Carbon

### Strategy Cards
Counter Espionage
Preemptive Intelligence
Impose Tariffs 
Trade negotiation
Precision Strike
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

Counter Espionage - Price 300 credits. Allows the player to play 2 more strategy cards and add 2 Impeded cards (from the supply) to their opponents discard pile.

Preemptive Intelligence - Price 300 credits. Allows the player to draw an additional card from their deck and play 2 more strategy cards.

Aggressive Acquisition - Prices 300 credits. Allows the player to play 2 more strategy cards and lets them buy an additional card during their buy phase.

Defensive Maneuver - Price 300 credits. Allows the player to play 1 more strategy card and also adds 1 defense during the combat phase.

Trade Negotiations - Price 400 credits. The player gains 200 more credits and can buy an additional card during their buy phase.

Technology Investment - Price 500 credits. Allows the player to add 2 defence during the combat phase and allows the player to trash 2 cards from their hand during their cleanup phase.

Braintrust Accumulation - Price 400 credits. Allow the player to immediately draw 3 cards from their deck.

Impose Tariffs - Price 500 credits. Allows the player to immediately draw 1 card from their deck then they gain 200 more credits and can buy an additional card during their buy phase.

Precision Strike - Price 600 credits. Allows the player to trash 1 card from their hand during their cleanup phase and deals 1 damage during the combat phase.

Critical Hit - Price 800 credits. Allows the player to immediately draw 1 card from their deck and deals 3 damage during the combat phase.

## Resource cards

Hydrogen - Price 0 credits. Worth 100 credits. Also if you have less health than your opponent you may discard all of your Hydrogen cards in hand and redraw that many cards. Also, gain 1 action

Oxygen - Price 300 credits. Worth 200 credits.

Carbon - Price 600 credits. Worth 300 credits.

## Glossary

Strategy Move - A move that is made during the strategy phase.
Action - Interchangeable with Strategy Move.
Buy Move - A move that is made during the buy phase.
Damage - A damage card is a card that deals damage to the opponent.
Defense - A defense card is a card that reduces the damage done by the opponent.
Trash - To trash a card is to remove it from the game.
Discard - To discard a card is to remove it from your hand and put it in the discard pile.
Draw - To draw a card is to remove it from your deck and put it in your hand.
Play - To play a card is to remove it from your hand and put it in your discard pile.
Buy - To buy a card is to remove it from the supply and put it in your discard pile. Also, remove resource cards used to purchase the card from their hand and put them in the discard pile.
  `,
  bestStrategy: `
# GALACTIC CONFRONTATION - OPTIMAL STRATEGY GUIDE v3.0

## CRITICAL RULE #1: ALWAYS BUY CRITICAL HIT
**If you can afford Critical Hit (800 credits), you MUST buy it. No exceptions.**
- Critical Hit is the win condition of this game
- Never buy anything else if you have 800+ credits and Critical Hit is available
- This rule overrides all other priorities

## CRITICAL RULE #2: DEFENSE WHEN BEHIND ON HP
**NEW: If your HP is below 5 OR opponent has 2+ Critical Hits, you MUST consider defense.**
- **At 7-8 HP with opponent dealing damage:** Buy 1 Defensive Maneuver (300)
- **At 4-6 HP:** Buy 1-2 Defensive Maneuver or 1 Technology Investment (500)
- **At 1-3 HP:** You're in lethal range - buy ALL available defense or you lose next turn
- **Defense extends survival by 1-2 turns, which often means 3-6 more damage dealt = winning**

**The Math:**
- Each Defensive Maneuver = survive 1 more turn = deal 3-6 more damage
- Opponent with 3 Critical Hits can deal 9 damage/turn
- If you have 4 HP with no defense, you have 1 turn left
- If you have 4 HP with 2 defense, you have 2 turns left = can win

## CRITICAL RULE #3: USE YOUR HYDROGEN CARDS TO CATCH UP
**IF** you have less health than your opponent and it is late game (round 9 and beyond):
- Because this action gives you another action it is basically free to use. Especially when you have extra actions available.
- Will help you find damage or defense cards you need
- Use this even if you have good cards in hand since you will not loose those cards and you can play them next (since you get another action)
- Only case where you should not use this is if you want to buy a damage card next turn and you have just enough. Even then depending on your deck you may draw a better resource.
- You can, and should, spam this if you draw more Hydrogen cards
- This is your catch-up mechanic - use it aggressively when behind

---

## PURCHASE DECISION TREE

Use this exact decision tree for EVERY buy phase:

### Step 1: Critical Hit Check
- **IF** you have 800+ credits AND Critical Hit is available → **BUY IT**
- **ELSE** proceed to Step 2

### Step 2: Survival Check (NEW!)
**Ask yourself:**
- What is my current HP?
- How much damage did opponent deal last turn?
- How many Critical Hits does opponent have? (Track this!)

**IF** any of these are true:
- Your HP ≤ 5 AND opponent has damage cards
- Opponent dealt 3+ damage last turn
- Opponent has 2+ Critical Hits
- You took damage 2+ rounds in a row

**THEN** calculate: Can opponent kill me next turn?
- **YES or MAYBE** → Buy defense (see Defense Priority below)
- **NO** → Proceed to Step 3

### Step 3: What round is it?

#### ROUNDS 0-5 (Early Game - Build Economy)
Purchase priority:
1. **Impose Tariffs** (500 credits) - Buy 2 copies total
2. **Carbon** (600 credits) - Buy 2 copies total  
3. **Oxygen** (300 credits) - Buy 2-3 copies maximum, NEVER MORE
4. **Preemptive Intelligence** (300 credits) - Buy 1 copy if you have extra credits

**DO NOT BUY:**
- Aggressive Acquisition (waste of credits)
- More than 3 Oxygen (diminishing returns)
- Hydrogen (free cards are bad)
- Trade Negotiations (inefficient - buy Impose Tariffs instead)

#### ROUNDS 6-8 (Mid Game - First Damage Cards)
Purchase priority:
1. **Critical Hit** (800 credits) - Buy EVERY copy you can afford
2. **Precision Strike** (600 credits) - Buy 1-2 copies for damage + trash
3. **Preemptive Intelligence** (300 credits) - Buy 1-2 copies (total 2-3 in deck)
4. **Defensive Maneuver** (300 credits) - IF you've taken damage, buy 1
5. **Carbon** (600 credits) - If you still need economy
6. **Impose Tariffs** (500 credits) - If you don't have 2 yet

**CRITICAL:** Round 6-8 is when damage starts. If opponent buys Critical Hit, YOU MUST MATCH THEM or buy defense.

#### ROUNDS 9-12 (Late Game - Damage Race & Survival)
**This is where games are won or lost!**

Purchase priority:
1. **Critical Hit** (800 credits) - Buy every copy until you have 3-4 total
2. **DEFENSE CHECK (NEW!):**
   - IF HP ≤ 7: Buy Defensive Maneuver (300) or Technology Investment (500)
   - IF HP ≤ 4: Buy 2 defense cards before anything else
   - IF HP ≤ 2: You're in immediate lethal - buy all defense available
3. **Preemptive Intelligence** (300 credits) - Buy until you have 3-4 TOTAL (not more!)
4. **Precision Strike** (600 credits) - Buy 1-2 more for consistent damage
5. **Counter Espionage** (300 credits) - Only if you're AHEAD on damage

**WARNING:** Do not over-buy Preemptive Intelligence! Stop at 3-4 copies.

#### ROUNDS 13+ (End Game - Execute Win Condition)
Purchase priority:
1. **Critical Hit** (800 credits) - Always buy if available
2. **Defensive Maneuver** (300 credits) - If survival is questionable
3. **Precision Strike** (600 credits) - To maintain damage pressure
4. **Counter Espionage** (300 credits) - To slow opponent's deck

**Goal:** Deal 6-9 damage per turn while surviving opponent's attacks

### Step 4: Can't afford anything good?
- **IF** you have less health and < 500 credits → Discard Hydrogen cards to possibly get better cards
- **IF** you have 0-200 credits → End buy phase, don't waste resources
- **IF** you have 300+ credits but nothing optimal available → Buy Defensive Maneuver (survival) or nothing

---

## DEFENSE PRIORITY MATRIX (NEW!)

Use this table to determine if you need defense:

| Your HP | Opponent Damage/Turn | Action Required |
|---------|---------------------|-----------------|
| 10-9 | Any | No defense needed |
| 8-7 | 1-3 | Consider 1 Defensive Maneuver |
| 8-7 | 4+ | Buy 1 Defensive Maneuver |
| 6-5 | 1-3 | Buy 1 Defensive Maneuver |
| 6-5 | 4+ | Buy 1-2 Defensive Maneuver or Technology Investment |
| 4-3 | Any | Buy 2+ defense cards immediately |
| 2-1 | Any | **CRITICAL: Buy all available defense or you lose next turn** |

**Defense Cards:**
- **Defensive Maneuver** (300): 1 defense, 1 action - cheap, efficient
- **Technology Investment** (500): 2 defense, 2 trash - expensive but strong defense + deck thinning

---

## STRATEGY PHASE DECISION TREE

**Always play cards in this exact order:**

### Priority 1: Action Generators (Play These First)
1. **Preemptive Intelligence** - Gives +2 actions and draws a card
2. **Counter Espionage** - Gives +2 actions (and impedes opponent)
3. **Impose Tariffs** - Only play in strategy phase if it enables playing more cards this turn

### Priority 2: Damage Cards (Play After Actions)
4. **Critical Hit** - Always play if you have actions remaining (3 damage is huge)
5. **Precision Strike** - Play if you have actions remaining
6. **Defensive Maneuver** - Play if you need defense this turn

### Priority 3: Economy Cards (Save for Buy Phase Usually)
7. **Trade Negotiations** - Usually save for buy phase unless you need the buy now
8. **Aggressive Acquisition** - Don't have this card (you shouldn't buy it)

**CRITICAL PRIORITY RULES:**
- If you have multiple damage cards but only 1 action remaining: Play Critical Hit over Precision Strike (3 damage > 1 damage)
- If you have Preemptive Intelligence + damage cards: Always play Preemptive Intelligence first to get more actions to play damage
- Chain Preemptive Intelligence: PI → draw → PI → draw → damage cards

---

## DECK COMPOSITION TARGETS (NEW!)

Track your deck composition and aim for these targets by round:

### Round 5 Target:
- 2-3 Oxygen
- 1-2 Carbon
- 1-2 Impose Tariffs
- 1 Preemptive Intelligence
- 5-7 Hydrogen (trash these later)
- 2-3 Impeded (trash these later)

### Round 8 Target:
- 2 Critical Hits ✓ (minimum)
- 2-3 Preemptive Intelligence
- 1-2 Precision Strike
- 0-1 Defensive Maneuver (if you've taken damage)
- Economy cards for 800+ credits/turn

### Round 12 Target (WIN CONDITION):
- **3-4 Critical Hits** ✓✓✓ (primary damage)
- **3-4 Preemptive Intelligence** (action economy)
- **1-2 Precision Strike** (secondary damage + trash)
- **1-2 Defensive Maneuver** (if HP < 7)
- **Minimal Hydrogen** (should have trashed most)
- **Deck size: 15-20 cards** (lean and consistent)

### Round 15+ Target:
- 4+ Critical Hits
- 4 Preemptive Intelligence
- 2 Precision Strike
- 2+ Defensive Maneuver (if in damage race)
- All Hydrogen trashed
- Deck size: 12-18 cards

**RED FLAGS:**
- ❌ More than 4 Preemptive Intelligence (overkill on actions)
- ❌ Fewer than 3 Critical Hits by Round 12 (not enough damage)
- ❌ Zero defense cards with HP < 5 (death sentence)
- ❌ More than 5 Hydrogen after Round 10 (deck dilution)
- ❌ Deck size > 25 cards (too inconsistent)

---

## TRACKING OPPONENT STRATEGY (NEW!)

**Pay attention every turn to opponent's purchases!**

### Damage Threat Assessment:
Count opponent's damage cards:
- **0-1 Critical Hits:** Low threat, focus on economy
- **2 Critical Hits:** Medium threat, consider defense
- **3+ Critical Hits:** High threat, BUY DEFENSE NOW

### Response Matrix:

| Opponent Action | Your Response |
|----------------|---------------|
| Buys Critical Hit | Match with your own Critical Hit next turn, or buy defense if you can't match |
| Buys 2nd Critical Hit | Buy defense next turn if HP < 8 |
| Buys 3rd Critical Hit | **URGENT: Buy 2 defense cards immediately** |
| Deals 3+ damage to you | Buy Defensive Maneuver next turn |
| Deals 6+ damage to you | Buy multiple defense cards or Technology Investment |
| Buys Counter Espionage | Expect Impeded cards - buy Precision Strike to trash them |
| Buys many Preemptive Intelligence | They're building action economy - match their damage before they combo |

---

## CLEANUP PHASE - TRASHING PRIORITY

When you have trash abilities available (Precision Strike, Technology Investment), trash in this order:

1. **Impeded** (completely useless cards, highest priority)
2. **Hydrogen** (weak economy, dilutes deck)
3. **Extra Oxygen** (if you have 4+ copies)
4. **Trade Negotiations** (after Round 8, it's not worth the deck space)
5. **Extra Impose Tariffs** (if you have 3+, keep 1-2)

**Trashing Goals:**
- Rounds 5-8: Trash 1-2 Impeded
- Rounds 9-12: Trash 2-3 Hydrogen
- Rounds 13+: Trash everything except Critical Hit, Preemptive Intelligence, Precision Strike, and essential economy

**Goal:** Keep your deck lean (15-20 cards) for maximum consistency

---

## SPECIAL RULES

### Hydrogen Redraw Ability
**IF** you have less health than opponent (and it is late game (round 9 and beyond)):
- Discard ALL Hydrogen cards in hand
- Redraw that many cards
- This is your catch-up mechanic - use it aggressively when behind

### When to Play vs When to Save
**Play immediately:**
- Preemptive Intelligence (gets you more cards/actions)
- Critical Hit (deals damage, draws a card)
- Precision Strike (deals damage)
- Defensive Maneuver (if you need defense this combat phase)

**Save for buy phase:**
- Trade Negotiations (credits only useful in buy phase)
- Impose Tariffs (unless you need to play more strategy cards this turn)

**NEVER save damage cards for later if you can play them now!** You might not draw them again for several turns.

---

## ADVANCED TACTICS (NEW!)

### The Damage Race
**Once both players start dealing damage (Round 7+), the game becomes a race.**

Calculate each turn:
1. How much damage can I deal per turn? (Current + projected)
2. How much damage is opponent dealing per turn?
3. Who will reach 0 HP first?

**If you're losing the race:**
- Option A: Buy more Critical Hits to out-damage them
- Option B: Buy defense to survive longer (and deal more total damage)
- **Usually Option B is better if you're 2+ turns behind**

**Example:**
- You: 5 HP, dealing 3 damage/turn
- Opponent: 8 HP, dealing 6 damage/turn
- Without defense: You die in 1 turn (5 HP - 6 dmg), they die in 3 turns (8 HP / 3 dmg)
- You lose!
- With 2 defense: You die in 2 turns (5 HP + 2 def - 6 dmg), they die in 3 turns
- Still lose, but closer
- With 4 defense: You die in 2 turns (5 HP + 4 def - 6 dmg = 3 HP left after turn 1), they die in 3 turns
- With 6 defense: You survive to turn 3, tie or possibly win
- **Solution: Buy 2 Defensive Maneuver + 1 Technology Investment = 4 defense for 1100 credits**

### The Critical Turn Window
**Rounds 9-11 are the most critical turns of the game.**

This is when:
- Both players have their first damage cards
- Economy is established
- The damage race begins
- Defense decisions matter most

**Common mistakes in this window:**
- Buying more economy (you have enough!)
- Buying more Preemptive Intelligence (you have enough!)
- Ignoring HP levels (death sentence!)

**Correct approach:**
- Buy Critical Hits aggressively
- Buy defense if HP < 7
- Stop buying economy/actions

### The Trap of Over-Optimization
**Don't fall into these traps:**

1. **"I need more actions!"** → No, you need damage cards to use those actions on
2. **"I need more economy!"** → No, 800 credits/turn is enough
3. **"Defense is wasteful!"** → No, dying is more wasteful
4. **"I'll buy defense next turn!"** → No, you'll be dead

**The Rule:** Once you can consistently generate 800 credits/turn (around Round 6-7), STOP buying economy and START buying damage + defense.

---

## QUICK REFERENCE: CARD VALUES

**S-Tier (Always Buy When Appropriate):**
- Critical Hit (800) - Win condition, buy 3-4 copies

**A-Tier (Core Strategy):**
- Impose Tariffs (500) - Acceleration engine, buy 2 copies
- Carbon (600) - Strong economy, buy 2 copies
- Preemptive Intelligence (300) - Action economy, buy 3-4 copies
- Defensive Maneuver (300) - Survival, buy 1-3 copies when HP < 7

**B-Tier (Situational):**
- Precision Strike (600) - Solid damage + trash, buy 2-3 copies
- Oxygen (300) - Early economy only, buy 2-3 copies
- Technology Investment (500) - Strong defense + trash when desperate
- Counter Espionage (300) - If ahead and want to slow opponent

**C-Tier (Rarely Buy):**
- Trade Negotiations (400) - Worse than Impose Tariffs
- Braintrust Accumulation (400) - Draw 3 is weak

**F-Tier (Never Buy):**
- Aggressive Acquisition (300) - Waste of credits
- Hydrogen (0) - Dilutes deck
- Any card after you have enough of it

---

## COMMON MISTAKES TO AVOID (NEW!)

### Mistake #1: "I'll buy defense later"
**Result:** You die before "later" arrives
**Fix:** Buy defense the turn AFTER you take significant damage

### Mistake #2: Buying 5+ Preemptive Intelligence
**Result:** Too many actions, not enough damage cards to use them on
**Fix:** Stop at 3-4 copies

### Mistake #3: Ignoring opponent's purchases
**Result:** Opponent builds 4 Critical Hits while you build economy
**Fix:** Match opponent's damage card purchases

### Mistake #4: Buying economy after Round 8
**Result:** Wasted credits on cards that don't win games
**Fix:** After Round 8, only buy damage and defense

### Mistake #5: Never trashing Hydrogen
**Result:** Deck is 40% useless cards
**Fix:** Buy Precision Strike and aggressively trash Hydrogen

### Mistake #6: Thinking "I can race them"
**Result:** You both die, or you die first
**Fix:** Do the math - if you're behind on HP, buy defense

### Mistake #7: Saving damage cards "for a better turn"
**Result:** Never draw them again when you need them
**Fix:** Play all damage cards immediately

---

## WINNING FORMULA SUMMARY

**Early Game (Rounds 0-5):**
- Buy: 2-3 Oxygen, 2 Carbon, 2 Impose Tariffs, 1 Preemptive Intelligence
- Goal: Reach 800 credits per turn consistently
- Never buy: Hydrogen, Aggressive Acquisition, more than 3 Oxygen

**Mid Game (Rounds 6-9):**
- Buy: 2-3 Critical Hits, 2 Preemptive Intelligence, 1-2 Precision Strike
- Buy: 1 Defensive Maneuver if you've taken damage
- Goal: Start dealing damage, survive opponent's damage
- Track opponent's Critical Hit purchases

**Late Game (Rounds 10-13):**
- Buy: More Critical Hits (until you have 3-4), 1-2 more Preemptive Intelligence
- Buy: Defense cards if HP < 7 or opponent has 2+ Critical Hits
- Goal: Play 2-3 damage cards per turn for 4-9 damage
- Trash Hydrogen/Impeded aggressively
- Use Hydrogen cards to catch up if you are behind on health

**End Game (Rounds 14+):**
- Buy: Any remaining Critical Hits, defense as needed
- Goal: Deal 6-9 damage per turn, survive to deliver it
- Each turn: Play all Preemptive Intelligence → draw cards → play all damage cards

**Victory Condition:**
- 3+ Critical Hits + 3+ Preemptive Intelligence = 6-9 damage per turn
- Opponent dead in 2-3 turns
- **NEW:** 1-2 Defensive Maneuver = survive 1-2 extra turns = deal 6-18 more damage = WIN

---

## THE GOLDEN RULES

1. **Always buy Critical Hit at 800+ credits**
2. **Buy defense when HP < 7 or opponent has 2+ Critical Hits** ← NEW!
3. **Stop at 3-4 Preemptive Intelligence, no more**
4. **Match opponent's damage purchases**
5. **After Round 8, only buy damage and defense**
6. **Play all damage cards immediately, never save them**
7. **Trash Hydrogen and Impeded aggressively**
8. **Track opponent's deck - count their Critical Hits**
9. **Do the damage race math every turn after Round 9**
10. **When in doubt, survival > optimization**

---

## WIN CONDITION CHECKLIST

Before Round 12, you should have:
- ☑ 3-4 Critical Hits
- ☑ 3-4 Preemptive Intelligence
- ☑ 1-2 Precision Strike
- ☑ 1-2 Defensive Maneuver (if HP < 7)
- ☑ Deck size under 20 cards
- ☑ Can deal 6-9 damage per turn
- ☑ Can survive 2-3 more turns

If you're missing any of these, you're in danger of losing.

**The most common missing item: Defense cards. Don't let this be you!**
  `,
};
