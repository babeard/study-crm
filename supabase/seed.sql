-- create auth user, will also create profile via trigger fn
do $$
begin
  perform public.create_user('59cd44cf-1d5b-44a4-b2a2-e83882acb3e9', 'brian@test.com', 'testing123');
end$$;

-- create expense types
insert into public.expense_types (id, name, description, expense_group) values
  (1, 'Lessons', 'Study guides, lessons, or courses.', 'Study Material'::expense_group),
  (2, 'Envelopes', null, 'Office Supplies'::expense_group),
  (3, 'Labels', null, 'Office Supplies'::expense_group),
  (4, 'Postage', null, 'Mail Service'::expense_group),
  (5, 'PO Box', null, 'Mail Service'::expense_group),
  (6, 'Shipping', null, 'Mail Service'::expense_group),
  (7, 'Program Fees', null, 'Marketing'::expense_group),
  (8, 'Ad Campaigns', null, 'Marketing'::expense_group),
  (9, 'Taxes', null, 'Other'::expense_group),
  (10, 'I.T. Services', 'Used for online program fees like web hosting.', 'Other'::expense_group),
  (11, 'Other', null, 'Other'::expense_group);

-- !! Fake

-- Students

insert into public.students (id, name, email, phone, lead_source) values (
  '4866c479-efac-42d9-a291-2dbe54b3e57f', 'John Doe', 'johnd@test.com', '123-456-7890', 'VOP'
), (
  '1b0bd7e9-b04c-4a22-96cf-324e81a3afa4', 'Jane Doe', 'janed@test.com', '456-789-0123', 'Amazing Facts'
);

-- Addresses
insert into public.addresses (student_id, address, is_default) values (
  '4866c479-efac-42d9-a291-2dbe54b3e57f', '123 Main St, Anytown, USA', true
), (
  '1b0bd7e9-b04c-4a22-96cf-324e81a3afa4', '456 Elm St, Anytown, USA', true
);

-- Studies
insert into public.studies (id, name, description) values (
  1, 'VOP Studies', 'Learn about the Bible through the VOP program.'
);

insert into public.lessons (id, study_id, name, description, total_score) values (
  1, 1, 'Lesson 1', 'Introduction to the VOP program.', 12
), (
  2, 1, 'Lesson 2', 'The first lesson in the VOP program.', 20
), (
  3, 1, 'Lesson 3', 'The second lesson in the VOP program.', 18
), (
  4, 1, 'Lesson 4', 'The third lesson in the VOP program.', 15
), (
  5, 1, 'Lesson 5', 'The fourth lesson in the VOP program.', 10
);

-- Subscriptions

insert into public.subscriptions (id, student_id, study_id, assigned_worker_id, assigned_at) values (
  1, '4866c479-efac-42d9-a291-2dbe54b3e57f', 1, '59cd44cf-1d5b-44a4-b2a2-e83882acb3e9', now()
), (
  2, '1b0bd7e9-b04c-4a22-96cf-324e81a3afa4', 1, '59cd44cf-1d5b-44a4-b2a2-e83882acb3e9', now()
);

-- Progressions

insert into public.progressions (lesson_id, subscription_id, sent_at, returned_at, score) values (
  1, 1, now(), now(), 12
), (
  2, 1, now(), now(), 20
), (
  3, 1, now(), now(), 18
), (
  4, 1, now(), now(), 15
), (
  5, 1, now(), now(), 10
), (
  1, 2, now(), now(), 12
), (
  2, 2, now(), now(), 20
), (
  3, 2, now(), now(), 18
), (
  4, 2, now(), now(), 15
), (
  5, 2, now(), now(), 10
);


-- Progression Comments

insert into public.progression_comments (progression_id, worker_id, comment) values (
  1, '59cd44cf-1d5b-44a4-b2a2-e83882acb3e9', 'Good job on this lesson!'
), (
  2, '59cd44cf-1d5b-44a4-b2a2-e83882acb3e9', 'Great work on this lesson!'
), (
  3, '59cd44cf-1d5b-44a4-b2a2-e83882acb3e9', 'Keep up the good work!'
), (
  4, '59cd44cf-1d5b-44a4-b2a2-e83882acb3e9', 'You are doing well!'
), (
  5, '59cd44cf-1d5b-44a4-b2a2-e83882acb3e9', 'You are doing well!'
), (
  1, '59cd44cf-1d5b-44a4-b2a2-e83882acb3e9', 'Good job on this lesson!'
), (
  2, '59cd44cf-1d5b-44a4-b2a2-e83882acb3e9', 'Great work on this lesson!'
), (
  3, '59cd44cf-1d5b-44a4-b2a2-e83882acb3e9', 'Keep up the good work!'
), (
  4, '59cd44cf-1d5b-44a4-b2a2-e83882acb3e9', 'You are doing well!'
), (
  5, '59cd44cf-1d5b-44a4-b2a2-e83882acb3e9', 'You are doing well!'
);

