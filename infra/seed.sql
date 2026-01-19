INSERT INTO users (id, phone_encrypted, phone_iv, phone_auth_tag, phone_data_key_encrypted, phone_hash, role)
VALUES (
  gen_random_uuid(),
  'demo',
  'demo',
  'demo',
  'demo',
  'demo_hash',
  'patient'
) ON CONFLICT DO NOTHING;
