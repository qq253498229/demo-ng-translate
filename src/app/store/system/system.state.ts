import { inject, Injectable } from '@angular/core';
import { Action, NgxsOnInit, State, StateContext } from '@ngxs/store';
import { ChangeLanguage, InitLanguage, SwitchLanguage } from './system.action';
import translateEN from '../../../../public/i18n/en.json';
import translateZH from '../../../../public/i18n/zh.json';
import { TranslateService } from '@ngx-translate/core';

export interface SystemStateModel {
  language?: string;
}

@State<SystemStateModel>({
  name: 'system',
  defaults: {},
})
@Injectable({
  providedIn: 'root',
})
export class SystemState implements NgxsOnInit {
  translate = inject(TranslateService);

  ngxsOnInit(ctx: StateContext<any>): void {
    ctx.patchState({});
  }

  @Action(InitLanguage)
  initLanguage(ctx: StateContext<SystemStateModel>) {
    let systemLanguage = Intl.DateTimeFormat().resolvedOptions().locale || 'en';
    let defaultLanguage;
    if ('zh-CN' === systemLanguage) {
      defaultLanguage = 'zh';
    } else {
      defaultLanguage = 'en';
    }
    this.translate.addLangs(['en', 'zh']);
    this.translate.setDefaultLang(defaultLanguage);
    this.translate.use(ctx.getState().language || defaultLanguage);
    this.translate.setTranslation('en', translateEN);
    this.translate.setTranslation('zh', translateZH);
  }

  @Action(SwitchLanguage)
  switchLanguage(ctx: StateContext<SystemStateModel>) {
    let language = ctx.getState().language;
    if ('en' === language) {
      return ctx.dispatch(new ChangeLanguage('zh'));
    } else {
      return ctx.dispatch(new ChangeLanguage('en'));
    }
  }

  @Action(ChangeLanguage)
  changeLanguage(ctx: StateContext<SystemStateModel>, {language}: ChangeLanguage) {
    this.translate.use(language);
    ctx.patchState({language});
  }

}
