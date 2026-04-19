create table users(
 id bigint generated always as identity primary key,
 name text,
 income numeric,
 credit_score int
);

create table loan_applications(
 id bigint generated always as identity primary key,
 user_name text,
 amount numeric,
 status text,
 reason text
);
