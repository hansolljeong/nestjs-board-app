import { DataSource, DeleteResult, Repository } from 'typeorm';
import { BoardEntity } from './board.entity';
import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board-status.enum';
import { UserEntity } from 'src/auth/user.entity';

@Injectable()
export class BoardRepository {
  #boardRepository: Repository<BoardEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.#boardRepository = this.dataSource.getRepository(BoardEntity);
  }

  createBoard(
    createBoardDto: CreateBoardDto,
    user: UserEntity,
  ): Promise<BoardEntity> {
    const { title, description } = createBoardDto;

    const board = this.#boardRepository.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
      user,
    });

    return this.#boardRepository.save(board);
  }

  getBoardsByUser(user: UserEntity): Promise<BoardEntity[]> {
    return this.#boardRepository
      .createQueryBuilder('board')
      .where('board.userId = :userId', { userId: user.id })
      .getMany();
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

  async updateBoard(
    id: number,
    status: BoardStatus,
    user: UserEntity,
  ): Promise<BoardEntity> {
    await this.#boardRepository.update(id, { user, status });
    return this.getBoard(id);
  }
}
