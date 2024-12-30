export enum SigningMessageScope {
  COMMITMENT_RESOLUTION = 'commitment:resolution',
}

export interface AuthResourceParams {
  params: Promise<object>
}
