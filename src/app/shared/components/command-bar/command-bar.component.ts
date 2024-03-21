import { Component, Input } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-command-bar',
  templateUrl: './command-bar.component.html',
  styleUrl: './command-bar.component.scss'
})
export class CommandBarComponent {
  @Input() isBookList: boolean = false;
  @Input() isBlogList: boolean = false;
  
  constructor(private router: Router) {} 
  command1(): void {
    if (this.isBookList) {
      this.router.navigate(['book/form']); // Navigate to book form
    } else if (this.isBlogList) {
      this.router.navigate(['blog/form']); // Navigate to blog form
    }
  }

  command2(): void {
    if (this.isBookList) {
      // If it's a Book List, delete all books
      // You may need to implement deleteAllBooks() in your BookService
      // and handle the response appropriately.
      // Assuming you have implemented it similarly to deleteAllBlogs() method.
      this.router.navigate(['/book']); // Navigate back to book list after deletion
    } else if (this.isBlogList) {
      // If it's a Blog List, delete all blogs
      // You may need to implement deleteAllBlogs() in your BlogService
      // and handle the response appropriately.
      this.router.navigate(['/blog']); // Navigate back to blog list after deletion
    }
  }
}
