import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() title: string = '';

  constructor(private router: Router) {}

  public goToHomePage() {
    this.router.navigateByUrl('');
  }

  public goToPage(url: string) {
    window.open(url, '_blank');
  }
}
