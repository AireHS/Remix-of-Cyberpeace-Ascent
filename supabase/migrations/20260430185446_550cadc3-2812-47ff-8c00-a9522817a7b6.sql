DO $$
DECLARE
  new_user_id uuid := gen_random_uuid();
BEGIN
  INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password,
    email_confirmed_at, created_at, updated_at,
    raw_app_meta_data, raw_user_meta_data, is_super_admin, confirmation_token, email_change, email_change_token_new, recovery_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated',
    'test2@empresademo.com', crypt('Patito2026!Secure', gen_salt('bf')),
    now(), now(), now(),
    '{"provider":"email","providers":["email"]}'::jsonb, '{}'::jsonb, false, '', '', '', ''
  );

  INSERT INTO auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at)
  VALUES (gen_random_uuid(), new_user_id,
    jsonb_build_object('sub', new_user_id::text, 'email', 'test2@empresademo.com', 'email_verified', true),
    'email', new_user_id::text, now(), now(), now());

  INSERT INTO public.user_roles (user_id, role) VALUES (new_user_id, 'admin');

  INSERT INTO public.partner_profiles (user_id, company_name, contact_name, status, level, is_company_rep)
  VALUES (new_user_id, 'Empresa Demo', 'Admin Demo', 'approved', 'platinum', true);
END $$;