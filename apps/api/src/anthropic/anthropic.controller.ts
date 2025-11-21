import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AnthropicService } from './anthropic.service';
import { Move } from '@repo/engine/model/move';
import type { NextMoveRequest } from '@repo/engine/model/gameState';

@Controller('ai')
export class AnthropicController {
  constructor(private readonly anthropicService: AnthropicService) {}

  @Post()
  async nextMove(@Body() request: NextMoveRequest): Promise<Move | null> {
    // console.log('request', request);
    if (!request) {
      throw new BadRequestException('Request is required');
    }
    return await this.anthropicService.chooseNextMove(request);
  }
}
