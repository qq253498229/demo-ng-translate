import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';
import { InitLanguage } from './store/system/system.action';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SharedModule, NzMenuModule, RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isCollapsed = false;
  store = inject(Store);

  ngOnInit() {
    this.store.dispatch(new InitLanguage());
  }
}
