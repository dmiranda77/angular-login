import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { BlogForm } from '../../model/blog-form';
import { BlogFormComponent } from '../../pages/blog-form/blog-form.component';
import { Router } from '@angular/router';
import { BlogServiceService } from '../../service/blog-service.service';

@Component({
  selector: 'app-blog-item',
  templateUrl: './blog-item.component.html',
  styleUrl: './blog-item.component.scss'
})
export class BlogItemComponent implements OnInit{
  blogs: BlogForm[] = [];
  
  @Input () blogInput: BlogForm | undefined;
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  constructor(private router: Router, private blogService: BlogServiceService) {}
  
  ngOnInit(): void {
    this.loadBlogs();
  }
  editBlog() {
    if (this.blogInput && this.blogInput.id) {
      this.edit.emit(this.blogInput.id); // Emit the blog ID
      this.router.navigate(['blog/form'], { queryParams: { id: this.blogInput.id } });
    }
  }
  loadBlogs() {
    // Assuming you have a method in your service to fetch all blogs
    this.blogService.getAllBlogs().subscribe(blogs => {
      this.blogs = blogs;
    });
  }
  
  deleteBlog() {
    if (this.blogInput && this.blogInput.id) {
      const blogId = this.blogInput.id;
      this.blogService.deleteBlog(blogId).subscribe(() => {
        this.delete.emit(blogId); 
      }, error => {
        console.error('Error deleting blog:', error);
      });
    }
  }
  }