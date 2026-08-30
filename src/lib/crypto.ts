import crypto from 'crypto';

// Master key: from env or derived deterministically for this deployment.
const RAW_KEY = process.env.VAULT_KEY || 'carrgo-seo-saas-vault-key-v1';
const KEY = crypto.createHash('sha256').update(RAW_KEY).digest();

export function encryptSecret(plain: string): string {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', KEY, iv);
  const enc = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `${iv.toString('hex')}.${tag.toString('hex')}.${enc.toString('hex')}`;
}

export function decryptSecret(payload: string): string {
  try {
    const [ivHex, tagHex, encHex] = payload.split('.');
    if (!ivHex || !tagHex || !encHex) return '';
    const decipher = crypto.createDecipheriv('aes-256-gcm', KEY, Buffer.from(ivHex, 'hex'));
    decipher.setAuthTag(Buffer.from(tagHex, 'hex'));
    return Buffer.concat([decipher.update(Buffer.from(encHex, 'hex')), decipher.final()]).toString('utf8');
  } catch {
    return '';
  }
}

export function newControlKey(): string {
  return crypto.randomBytes(24).toString('hex');
}

export function newPairingCode(): string {
  return String(crypto.randomInt(100000, 999999));
}

export function sha256(s: string): string {
  return crypto.createHash('sha256').update(s).digest('hex');
}
