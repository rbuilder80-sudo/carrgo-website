// Mint a long-lived pairing code for the pre-configured extension build
const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();
const crypto = require('crypto');

async function main() {
  const code = 'CARRGO-' + crypto.randomBytes(4).toString('hex').toUpperCase();
  const expiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
  await db.setting.upsert({
    where: { key: 'bridge_pairing_code' },
    create: { key: 'bridge_pairing_code', value: `${code}|${expiry.toISOString()}` },
    update: { value: `${code}|${expiry.toISOString()}` },
  });
  console.log(`PAIRING_CODE=${code}`);
  console.log(`EXPIRES=${expiry.toISOString()}`);
}
main().finally(() => db.$disconnect());
