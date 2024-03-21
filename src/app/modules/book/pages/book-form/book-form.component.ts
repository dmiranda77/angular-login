import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../service/book.service';
import { checkValidName } from '../../../profile/validator/profile.validator';
import { BookForm } from '../../model/book.model';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup;
  bookId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute, 
    private bookService: BookService,
    private router: Router,
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      description: '',
      author: ['', [Validators.required, checkValidName()]],
      isbn: ''
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id = +params['id'];
      this.bookId = isNaN(id) ? null : id
      if (this.bookId) {
        this.fetchBookDetails(this.bookId);
      } else {
        this.clear(); 
      }
    });
  }

  navigateToBookList() {
    this.router.navigate(['book']); 
    
  }
  
  fetchBookDetails(id: number): void {
    this.bookService.getBookById(id).subscribe(
      (book: BookForm) => {
        this.bookForm.patchValue(book);
      },
      error => {
        console.error('Error fetching book details:', error);
      }
    );
  }

  onSubmit() {
    if (this.bookForm.valid) {
      const bookData = this.bookForm.value;
      if (this.bookId !== null) {
        bookData.id = this.bookId; 
        this.updateBook(bookData);
      
      } else {
        this.addBook(bookData);
      }
    };
    this.navigateToBookList();
  }

  addBook(book: BookForm) {
    this.bookService.addBook(book).subscribe(
      () => {
        console.log('Book added successfully');
        this.clear(); 
        this.navigateToBookList();
      },
      error => {
        console.error('Error adding book:', error);
      }
    );
  }

  updateBook(book: BookForm) {
    this.bookService.updateBook(book).subscribe(
      () => {
        console.log('Book updated successfully');
        this.navigateToBookList();
      },
      error => {
        console.error('Error updating book:', error);
      }
    );
  }

  clear() {
    this.bookForm.reset();
    this.router.navigate(['book']); 
  }

  get title() {
    return this.bookForm.get('title');
  }

  get author() {
    return this.bookForm.get('author');
  }
}
