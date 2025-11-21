import { Injectable } from '@nestjs/common';
import { Anthropic } from '@anthropic-ai/sdk';
import { NextMoveRequest } from '@repo/engine/model/gameState';
import { Move } from '@repo/engine/model/move';
import { aiConfig } from './aiConfig';
import { MessageParam } from '@anthropic-ai/sdk/resources/messages/messages';

import {
  ContentBlock,
  ThinkingBlock,
  TextBlock,
} from '@anthropic-ai/sdk/resources/messages/messages';

@Injectable()
export class AnthropicService {
  private readonly anthropic: Anthropic;

  constructor() {
    this.anthropic = new Anthropic({
      apiKey: process.env.CLAUDE_API_KEY,
    });
  }

  async chooseNextMove(request: NextMoveRequest): Promise<Move | null> {
    let retries = 0;
    let success = false;
    let lastContent: string = '';
    const messages: MessageParam[] = [
      {
        role: 'user',
        content: `Here are the rules of the game: ${aiConfig.gameRules}\n\n And here is the stratgey to win: \n\n ${aiConfig.bestStrategy}`,
      },
      {
        role: 'user',
        content: `
        Here is the current state of the game:\n\n${JSON.stringify(request)}\n\n
        Choose one of the availableNextMoves in the JSON provided. Do not respond with moves that are not in the array. 
        The strategy guidelines provided will be your guide. Do not deviate from the strategy.
        If you are unsure about the best move, consider the strategy guidelines and choose the move that is most likely to win the game.
        Only respond with a valid JSON move.`,
      },
    ];
    while (!success && retries < 5) {
      try {
        if (retries > 0) {
          // Only print the last 2 messages for debugging
          console.log('messages', [messages[messages.length - 2], messages[messages.length - 1]].map(m => m.content));
        }
        // console.log('nextAvailableMoves', request.availableNextMoves);
        const response = await this.anthropic.messages.create({
          model: aiConfig.model,
          max_tokens: aiConfig.maxTokens,
          system: aiConfig.systemPrompt,
          messages: messages,
        });
        const content: TextBlock | ContentBlock | ThinkingBlock = response.content[0]!;
        if (!content) {
          retries++;
          continue;
        }
        if (content.type === 'text') {
          lastContent = content.text;
          const move = JSON.parse(content.text.replace(/^```json\n/, '').replace(/\n```$/, '')) as Move;
          if (!move) {
            messages.push({
              role: 'assistant',
              content: content.text,
            });
            messages.push({
              role: 'user',
              content: `No move found in response. Please try again.`,
            });
            retries++;
            continue;
          }
          if (!request.availableNextMoves.find(m => m.description === move.description)) {
            messages.push({
              role: 'assistant',
              content: content.text,
            });
            console.log('move not found in available moves', move);
            messages.push({
              role: 'user',
              content: `Move not found in available moves. Please try again.`,
            });
            retries++;
            continue;
          }
          success = true;
          return move;
        } else {
          throw new Error('Content is not a text block');
        }
      } catch (error) {
        console.error('Error choosing next move', error, lastContent);
        retries++;
        messages.push({
          role: 'assistant',
          content: lastContent,
        });
        messages.push({
          role: 'user',
          content: `Your last response was not valid JSON. Please respone with only valid JSON.`,
        });
        continue;
      }
    }
    return null;
  }
}
