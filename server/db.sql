CREATE TABLE
    IF NOT EXISTS public.users (
        id character varying(50) NOT NULL,
        name character varying(255) COLLATE pg_catalog."default" NOT NULL,
        role character varying(255) COLLATE pg_catalog."default" NOT NULL,
        email character varying(255) COLLATE pg_catalog."default" NOT NULL,
        password character varying(255) COLLATE pg_catalog."default",
        CONSTRAINT users_pkey PRIMARY KEY (id)
    ) -- DROP TABLE IF EXISTS public.finance;
CREATE TABLE
    IF NOT EXISTS public.finance (
        id integer NOT NULL GENERATED ALWAYS AS IDENTITY (
            INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1
        ),
        title character varying(250) COLLATE pg_catalog."default" NOT NULL,
        type character varying(50) COLLATE pg_catalog."default" NOT NULL,
        amount numeric NOT NULL,
        category character varying(250) COLLATE pg_catalog."default" NOT NULL,
        created_at character varying(50) COLLATE pg_catalog."default" NOT NULL,
        id_user character varying(50) COLLATE pg_catalog."default" NOT NULL,
        CONSTRAINT finance_pkey PRIMARY KEY (id),
        CONSTRAINT finance_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE CASCADE
    ) -- public.categories definition
    -- Drop table
    -- DROP TABLE public.categories;
CREATE TABLE
    public.categories (
        id serial4 NOT NULL,
        category varchar(255) NOT NULL,
        user_id varchar(255) NULL,
        CONSTRAINT categories_pkey PRIMARY KEY (id)
    );

-- public.categories foreign keys

ALTER TABLE public.categories
ADD
    CONSTRAINT categories_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);

INSERT INTO
    users (id, name, role, email, password)
VALUES (
        '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
        'Jhon Doe',
        'user',
        'jhondoe@jhondoe.com',
        '123456'
    );

INSERT INTO
    finance (
        title,
        type,
        amount,
        category,
        created_at,
        id_user
    )
VALUES (
        'Freelancer de website',
        'deposit',
        6000,
        'Dev',
        '2021-02-12 09:00:00',
        '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
    );