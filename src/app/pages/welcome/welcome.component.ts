import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { Store } from '@ngxs/store';
import { SwitchLanguage } from '../../store/system/system.action';
import { SystemSelector } from '../../store/system/system.selector';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
  imports: [CommonModule, SharedModule, NzDividerComponent],
})
export class WelcomeComponent implements OnInit {
  store = inject(Store);
  translate = inject(TranslateService);
  text = '';

  test() {
    let language = this.store.selectSnapshot(SystemSelector.language());
    console.log('currentLang: ', language);

    let lang = Intl.DateTimeFormat().resolvedOptions().locale;
    console.log('system Language:', lang);
  }

  switchLanguage() {
    this.store.dispatch(new SwitchLanguage());
  }

  ngOnInit() {
    this.loadText();
    this.translate.onLangChange.subscribe(lang => {
      this.loadText();
    });
  }

  private loadText() {
    this.translate.get('app.readByProgram').subscribe(r => {
      this.text = r;
    });
  }
}
