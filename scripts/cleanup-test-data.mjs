import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();
// remove test device and invalid test credential; keep real pipeline evidence
await db.pairedDevice.deleteMany({ where: { deviceId: 'test-chrome-001' } });
await db.platformCredential.deleteMany({ where: { platform: 'telegram', status: 'invalid' } });
console.log('cleaned');
await db.$disconnect();
