import { factories } from '@strapi/strapi';
import fs from 'fs';
import path from 'path';

export default factories.createCoreController('api::backup.backup', ({ strapi }) => ({
  async download(ctx) {
    const token = ctx.query.token;
    if (token !== process.env.BACKUP_TOKEN) {
      return ctx.unauthorized('Invalid token');
    }

    const dbPath = path.join('/var/data', 'data.db');
    if (!fs.existsSync(dbPath)) {
      return ctx.notFound('Database file not found.');
    }

    ctx.set('Content-Disposition', 'attachment; filename=data.db');
    ctx.body = fs.createReadStream(dbPath);
  },
}));
