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
