import { DataSource, DeleteResult, Repository } from 'typeorm';
import { BoardEntity } from './board.entity';
import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board-status.enum';

@Injectable()
export class BoardRepository {
  #boardRepository: Repository<BoardEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.#boardRepository = this.dataSource.getRepository(BoardEntity);
  }

  createBoard(createBoardDto: CreateBoardDto): Promise<BoardEntity> {
    const { title, description } = createBoardDto;

    const board = this.#boardRepository.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    return this.#boardRepository.save(board);
  }

  getBoard(id: number): Promise<BoardEntity> {
    return this.#boardRepository.findOneBy({ id });
  }

  getBoards(): Promise<BoardEntity[]> {
    return this.#boardRepository.find();
  }

  deleteBoard(id: number): Promise<DeleteResult> {
    return this.#boardRepository.delete(id);
  }

  async updateBoard(id: number, status: BoardStatus): Promise<BoardEntity> {
    await this.#boardRepository.update(id, { status });
    return this.getBoard(id);
  }
}
