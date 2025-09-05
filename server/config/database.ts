export default ({ env }) => {
  const isProduction = env('NODE_ENV') === 'production';

  if (isProduction) {
    // Railway / Production → Postgres
    return {
      connection: {
        client: 'postgres',
        connection: {
          host: env('PGHOST'),
          port: env.int('PGPORT', 5432),
          database: env('PGDATABASE'),
          user: env('PGUSER'),
          password: env('PGPASSWORD'),
          ssl: {
            rejectUnauthorized: true,
          },
        },
        debug: false,
      },
    };
  }

  // Local Development → SQLite
  return {
    connection: {
      client: 'sqlite',
      connection: {
        filename: env('DATABASE_FILENAME', './database/data.db'),
      },
      useNullAsDefault: true,
    },
  };
};
