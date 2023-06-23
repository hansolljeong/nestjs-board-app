import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async deleteBoard(id: number, user: UserEntity): Promise<void> {
    const boardWithUserInfo = await this.boardRepository.getBoardWithUserInfo(
      id,
    );

    if (!boardWithUserInfo) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    const hasPermission = user.id === boardWithUserInfo.user.id;

    if (!hasPermission) {
      throw new ForbiddenException(
        "You don't have permission to delete this board.",
      );
    }

    this.boardRepository.deleteBoard(id);
  }

  async updateBoard(
    id: number,
    status: BoardStatus,
    user: UserEntity,
  ): Promise<BoardEntity> {
    const boardWithUserInfo = await this.boardRepository.getBoardWithUserInfo(
      id,
    );

    if (!boardWithUserInfo) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    const hasPermission = user.id === boardWithUserInfo.user.id;

    if (!hasPermission) {
      throw new ForbiddenException(
        "You don't have permission to update this board.",
      );
    }

    return this.boardRepository.updateBoard(id, status);
  }
}
