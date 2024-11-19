export const minutesByToken = {
  '1': '60000',
  '5': '300000',
  '10': '600000',
} as const;

export type Token = keyof typeof minutesByToken;

export function getMinutes(token: Token) {
  return minutesByToken[token];
}
