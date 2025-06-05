import { Selector } from '@ngxs/store';
import { SystemState, SystemStateModel } from './system.state';

export class SystemSelector {
  @Selector([SystemState])
  static isCollapsed({isCollapsed}: SystemStateModel) {
    return isCollapsed;
  }
}
