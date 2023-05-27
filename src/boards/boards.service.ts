import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardsService {
  private boards = ['boards test'];
  getAllBoards = () => {
    return this.boards;
  };
}
