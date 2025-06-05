import { Injectable } from '@angular/core';
import { Action, NgxsOnInit, State, StateContext } from '@ngxs/store';
import { LoggerAction } from './logger.action';
import { Navigate } from '@ngxs/router-plugin';

export interface LoggerStateModel {
  project: string,
  service: string,
}

@State<LoggerStateModel>({
  name: 'logger',
  defaults: {
    project: '',
    service: '',
  },
})
@Injectable({
  providedIn: 'root',
})
export class LoggerState implements NgxsOnInit {
  ngxsOnInit(ctx: StateContext<any>): void {
    ctx.patchState({});
  }

  @Action(LoggerAction.ActiveProject)
  ActiveProject(ctx: StateContext<LoggerStateModel>, {data}: LoggerAction.ActiveProject) {
    ctx.patchState({project: data.name});
  }

  @Action(LoggerAction.ViewLog)
  ViewLog(ctx: StateContext<LoggerStateModel>, {pod_name}: LoggerAction.ViewLog) {
    ctx.patchState({service: pod_name});
    return ctx.dispatch(new Navigate(['/log']));
  }

  @Action(LoggerAction.ReActiveService)
  ReActiveService(ctx: StateContext<LoggerStateModel>) {
    ctx.patchState({service: ``});
    return ctx.dispatch(new Navigate(['/service']));
  }

}
