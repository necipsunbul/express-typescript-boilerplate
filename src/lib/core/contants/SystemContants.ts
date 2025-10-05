export const timeZone = 'Europe/Istanbul';

export enum ApplicationMode {
  dev = 'development',
  production = 'production',
}

export enum VercelMs {
  TWO_HOURS = '2h',
  SIX_MONTH = '180 days',
}

export class ResponseMessages {
  static defaultSuccessMessage: string = 'ok';
}
