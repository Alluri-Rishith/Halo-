export function isConsentValid(expiresAt: Date): boolean {
  return expiresAt.getTime() > Date.now();
}
