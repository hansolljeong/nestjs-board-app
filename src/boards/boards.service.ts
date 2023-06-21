import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardEntity } from './board.entity';
import { BoardRepository } from './boards.repository';
import { BoardStatus } from './board-status.enum';
import { UserEntity } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
  constructor(private readonly boardRepository: BoardRepository) {}

  createBoard(
    createBoardDto: CreateBoardDto,
    user: UserEntity,
  ): Promise<BoardEntity> {
    return this.boardRepository.createBoard(createBoardDto, user);
  }

  getBoardsByUser(user: UserEntity): Promise<BoardEntity[]> {
    return this.boardRepository.getBoardsByUser(user);
  }

  async getBoard(id: number): Promise<BoardEntity> {
    const found = await this.boardRepository.getBoard(id);

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return found;
  }

  getBoards(): Promise<BoardEntity[]> {
    return this.boardRepository.getBoards();
  }

  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.deleteBoard(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
  }

  async updateBoard(
    id: number,
    status: BoardStatus,
    user: UserEntity,
  ): Promise<BoardEntity> {
    return this.boardRepository.updateBoard(id, status, user);
  }
}
