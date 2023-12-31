import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { Book } from './schema/book.schema';
import { InjectModel } from '@nestjs/mongoose';
import { createBookDto, updateBookDto } from './dto';
@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private bookModel: mongoose.Model<Book>,
  ) {}

  async createBook(payload: createBookDto, userId: string) {
    const book = await this.bookModel.create({
      title: payload.title,
      description: payload.description,
      year: payload.year,
      author: payload.author,
      userId: userId,
    });
    return book;
  }
  async getAllBooks(queryParams: {
    page: number;
    limit: number;
    search: string;
    sortBy: string;
  }) {
    const { page, limit, search, sortBy } = queryParams;

    const skip = (page - 1) * limit;

    const filter: any = {};
    if (search) {
      filter.title = { $regex: new RegExp(search, 'i') }; // Search case-insensitive
    }
    const itemsQuery = this.bookModel
      .find(filter)
      .sort({ [sortBy]: 1 }) // Ganti dengan -1 jika ingin descending
      .skip(skip)
      .limit(limit);

    const totalQuery = this.bookModel.countDocuments(filter);

    const [items, total] = await Promise.all([
      itemsQuery.exec(),
      totalQuery.exec(),
    ]);

    return {
      total,
      items,
    };
  }

  async getBookById(id: string) {
    const book = await this.bookModel.findById(id);
    if (!book) throw new NotFoundException('Book Not Found!');
    return book;
  }

  async updateBook(id: string, payload: updateBookDto, userId: string) {
    const updateBook = await this.bookModel.findById(id);
    if (!updateBook) throw new NotFoundException('Book Not Found!');
    if (updateBook.userId !== userId)
      throw new UnauthorizedException('Your are not authenticated!');
    const update = await this.bookModel.findByIdAndUpdate(id, payload, {
      new: true,
    });
    return update;
  }

  async deleteBook(id: string, userId: string) {
    const deleteBook = await this.bookModel.findById(id);
    if (!deleteBook) throw new NotFoundException('Book Not Found!');
    if (deleteBook.userId !== userId)
      throw new UnauthorizedException('Your are not authenticated!');
    await this.bookModel.deleteOne({ id: id });

    return deleteBook;
  }
}
