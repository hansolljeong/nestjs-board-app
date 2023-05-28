import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board, BoardStatus } from './board.model';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  getAllTask(): Board[] {
    return this.boardsService.getAllBoards();
  }

  @Post()
  createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Get('/:id')
  getBoardById(@Param('id') id: string) {
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoardById(@Param('id') id: string) {
    return this.boardsService.deleteBoardById(id);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id') id: string,
    @Body('status') status: BoardStatus,
  ) {
    return this.boardsService.updateBoardStatus(id, status);
  }
}
