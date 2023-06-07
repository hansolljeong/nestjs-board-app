import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardEntity } from './board.entity';
import { BoardRepository } from './boards.repository';
import { BoardStatus } from './board-status.enum';

@Injectable()
export class BoardsService {
  constructor(private readonly boardRepository: BoardRepository) {}

  createBoard(createBoardDto: CreateBoardDto): Promise<BoardEntity> {
    return this.boardRepository.createBoard(createBoardDto);
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

  async updateBoard(id: number, status: BoardStatus): Promise<BoardEntity> {
    return this.boardRepository.updateBoard(id, status);
  }
}
