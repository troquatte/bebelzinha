// Identificador curto da origem do link. Mantém o link anterior compatível.
export function salesCampaign(value: unknown): string | null {
  if (value === '1') return 'direto';
  return typeof value === 'string' && value.length <= 64
    && /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(value) ? value : null;
}
