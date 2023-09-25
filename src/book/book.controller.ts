import { BookService } from './book.service';
import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  Param,
  Put,
  Delete,
  Request,
  Query,
} from '@nestjs/common';
import { createBookDto, updateBookDto } from './dto/index';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Book')
@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Post()
  @UseGuards(AuthGuard)
  createBook(@Body() payload: createBookDto, @Request() req: any) {
    const userId = req.user.sub;
    return this.bookService.createBook(payload, userId);
  }

  @Get()
  @UseGuards(AuthGuard)
  async getAllBooks(@Query() queryParams) {
    const page = queryParams.page || 1;
    const limit = queryParams.limit || 10;
    const search = queryParams.search || '';
    const sortBy = queryParams.sortBy || 'year';
    return this.bookService.getAllBooks({ page, limit, search, sortBy });
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getBook(
    @Param('id')
    id: string,
  ) {
    return this.bookService.getBookById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async updateBook(
    @Param('id')
    id: string,
    @Body()
    payload: updateBookDto,
    @Request() req: any,
  ) {
    const userId = req.user.sub;
    return this.bookService.updateBook(id, payload, userId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteBook(
    @Param('id')
    id: string,
    @Request() req: any,
  ) {
    const userId = req.user.sub;
    return this.bookService.deleteBook(id, userId);
  }
}
