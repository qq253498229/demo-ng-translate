export namespace SystemAction {
  export class UpdateCollapsed {
    static readonly type = `[system] 切换侧边栏展开状态`;
  }
}

export class InitLanguage {
  static readonly type = `[system] 初始化语言`;
}

export class SwitchLanguage {
  static readonly type = `[system] 切换语言`;
}

export class ChangeLanguage {
  static readonly type = `[system] 改变语言`;

  constructor(public language: string) {
  }
}
