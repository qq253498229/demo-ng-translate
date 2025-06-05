export namespace LoggerAction {
  export class ActiveProject {
    static readonly type = `[logger] 激活项目`;

    constructor(public data: any) {
    }
  }

  export class ViewLog {
    static readonly type = `[logger] 显示日志`;

    constructor(public pod_name: string) {
    }
  }

  export class ReActiveService {
    static readonly type = `[logger] 重新选择服务`;
  }
}
