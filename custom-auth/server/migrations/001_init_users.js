// migrations/001_init_users.js
// node-pg-migrate migration

export async function up(pgm) {
  pgm.createTable(
    "users",
    {
      id: "id", // SERIAL PRIMARY KEY
      email: { type: "text", notNull: true },
      username: { type: "text", notNull: true, unique: true },
      password_hash: { type: "text", notNull: true },
      is_email_verified: {
        type: "boolean",
        notNull: true,
        default: false,
      },
      created_at: {
        type: "timestamptz",
        notNull: true,
        default: pgm.func("now()"),
      },
    },
    { ifNotExists: true }
  );

  // CREATE UNIQUE INDEX IF NOT EXISTS users_email_lower_unique ON users (lower(email));
  pgm.createIndex("users", "email", {
    name: "users_email_lower_unique",
    unique: true,
    method: "btree",
    expression: "lower(email)",
    ifNotExists: true,
  });
}

export async function down(pgm) {
  // Drop index first (safe even if table drop would remove it, but keeps down explicit)
  pgm.dropIndex("users", null, { name: "users_email_lower_unique", ifExists: true });

  pgm.dropTable("users", { ifExists: true });
}
