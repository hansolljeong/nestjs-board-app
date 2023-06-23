import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardEntity } from './board.entity';
import { BoardStatus } from './board-status.enum';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { UserEntity } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtGuard } from 'src/jwt/jwt.guard';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @UseGuards(JwtGuard)
  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: UserEntity,
  ): Promise<BoardEntity> {
    return this.boardsService.createBoard(createBoardDto, user);
  }

  @UseGuards(JwtGuard)
  @Get('/user')
  getBoardsByUser(@GetUser() user: UserEntity): Promise<BoardEntity[]> {
    return this.boardsService.getBoardsByUser(user);
  }

  @Get('/:id')
  getBoard(@Param('id') id: number): Promise<BoardEntity> {
    return this.boardsService.getBoard(id);
  }

  @Get()
  getBoards(): Promise<BoardEntity[]> {
    return this.boardsService.getBoards();
  }

  @UseGuards(JwtGuard)
  @Delete('/:id')
  deleteBoard(@Param('id') id: number, @GetUser() user: UserEntity): void {
    this.boardsService.deleteBoard(id, user);
  }

  @UseGuards(JwtGuard)
  @Patch('/:id')
  updateBoard(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
    @GetUser() user: UserEntity,
  ): Promise<BoardEntity> {
    return this.boardsService.updateBoard(id, status, user);
  }
}
