import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { BoardStatus } from './board-status.enum';

@Injectable()
export class BoardsService {
  constructor(private readonly boardRepository: BoardRepository) {}

  createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  }

  async getBoard(id: number): Promise<Board> {
    const found = await this.boardRepository.getBoard(id);

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return found;
  }

  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.deleteBoard(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
  }

  async updateBoard(id: number, status: BoardStatus): Promise<Board> {
    return this.boardRepository.updateBoard(id, status);
  }
}
