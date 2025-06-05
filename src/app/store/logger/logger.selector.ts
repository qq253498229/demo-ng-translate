import { Selector } from '@ngxs/store';
import { LoggerState, LoggerStateModel } from './logger.state';

export class LoggerSelector {
  @Selector([LoggerState])
  static project({project}: LoggerStateModel) {
    return project;
  }

  @Selector([LoggerState])
  static service({service}: LoggerStateModel) {
    return service;
  }
}
