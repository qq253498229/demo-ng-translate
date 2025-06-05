import { Injectable } from '@angular/core';
import { Action, NgxsOnInit, State, StateContext } from '@ngxs/store';
import { SystemAction } from './system.action';
import * as immutable from 'object-path-immutable';

export interface SystemStateModel {
  isCollapsed: boolean;
}

@State<SystemStateModel>({
  name: 'system',
  defaults: {
    isCollapsed: false,
  },
})
@Injectable({
  providedIn: 'root',
})
export class SystemState implements NgxsOnInit {
  ngxsOnInit(ctx: StateContext<any>): void {
    ctx.patchState({});
  }

  @Action(SystemAction.UpdateCollapsed)
  UpdateCollapsed(ctx: StateContext<SystemStateModel>) {
    let state = ctx.getState();
    ctx.setState(immutable.set(state, ['isCollapsed'], !state.isCollapsed));
  }

}
