import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private router: Router) {} 
  command1(): void {
    this.router.navigate(['/blog'])
  }

  command2(): void {
    this.router.navigate(['/book'])
  }

  command3(): void {
    this.router.navigate(['/user'])
  }

}