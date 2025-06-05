import { inject, Injectable } from '@angular/core';
import { Action, NgxsOnInit, State, StateContext } from '@ngxs/store';
import { ChangeLanguage, InitLanguage, SwitchLanguage, SystemAction } from './system.action';
import * as immutable from 'object-path-immutable';
import translateEN from '../../../../public/i18n/en.json';
import translateZH from '../../../../public/i18n/zh.json';
import { TranslateService } from '@ngx-translate/core';

export interface SystemStateModel {
  isCollapsed: boolean;
  language: string;
}

@State<SystemStateModel>({
  name: 'system',
  defaults: {
    isCollapsed: false,
    language: 'en',
  },
})
@Injectable({
  providedIn: 'root',
})
export class SystemState implements NgxsOnInit {
  translate = inject(TranslateService);

  ngxsOnInit(ctx: StateContext<any>): void {
    let state = ctx.getState();
    ctx.patchState({
      language: state.language || 'en',
    });
  }

  @Action(SystemAction.UpdateCollapsed)
  UpdateCollapsed(ctx: StateContext<SystemStateModel>) {
    let state = ctx.getState();
    ctx.setState(immutable.set(state, ['isCollapsed'], !state.isCollapsed));
  }

  @Action(InitLanguage)
  initLanguage(ctx: StateContext<SystemStateModel>) {
    this.translate.addLangs(['en', 'zh']);
    this.translate.setDefaultLang('en');
    this.translate.use(ctx.getState().language);
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
