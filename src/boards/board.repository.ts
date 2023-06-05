import { DataSource, DeleteResult, Repository } from 'typeorm';
import { Board } from './board.entity';
import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board-status.enum';

@Injectable()
export class BoardRepository {
  #boardRepository: Repository<Board>;

  constructor(private readonly dataSource: DataSource) {
    this.#boardRepository = this.dataSource.getRepository(Board);
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;

    const board = this.#boardRepository.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    await this.#boardRepository.save(board);
    return board;
  }

  async getBoard(id: number): Promise<Board> {
    return this.#boardRepository.findOneBy({ id });
  }

  async deleteBoard(id: number): Promise<DeleteResult> {
    return this.#boardRepository.delete(id);
  }

  async updateBoard(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoard(id);

    board.status = status;
    return this.#boardRepository.save(board);
  }
}
