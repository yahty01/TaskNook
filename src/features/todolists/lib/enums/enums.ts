export enum TaskStatus {
  New = 0,
  InProgress = 1,
  Complete = 2,
  Draft = 3,
}

export enum TaskPriority {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Latter = 4,
}

export enum ResultCode {
  Success = 0,
  Error = 1,
  CaptchaError = 10,
}
