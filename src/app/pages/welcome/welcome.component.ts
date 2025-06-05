import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { Store } from '@ngxs/store';
import { SwitchLanguage } from '../../store/system/system.action';
import { SystemSelector } from '../../store/system/system.selector';

@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
  imports: [CommonModule, SharedModule, NzDividerComponent],
})
export class WelcomeComponent {
  store = inject(Store);

  test() {
    let language = this.store.selectSnapshot(SystemSelector.language());
    console.log('currentLang: ', language);
  }

  switchLanguage() {
    this.store.dispatch(new SwitchLanguage());
  }
}
