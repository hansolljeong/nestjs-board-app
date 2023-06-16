import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardEntity } from './board.entity';
import { BoardStatus } from './board-status.enum';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { UserEntity } from 'src/auth/user.entity';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    user: UserEntity,
  ): Promise<BoardEntity> {
    return this.boardsService.createBoard(createBoardDto, user);
  }

  @Get('/:id')
  getBoard(@Param('id') id: number): Promise<BoardEntity> {
    return this.boardsService.getBoard(id);
  }

  @Get()
  getBoards(): Promise<BoardEntity[]> {
    return this.boardsService.getBoards();
  }

  @Delete('/:id')
  deleteBoard(@Param('id') id: number): Promise<void> {
    return this.boardsService.deleteBoard(id);
  }

  @Patch('/:id')
  updateBoard(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ) {
    return this.boardsService.updateBoard(id, status);
  }
}
