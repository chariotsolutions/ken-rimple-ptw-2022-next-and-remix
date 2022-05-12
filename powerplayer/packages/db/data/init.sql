create extension
if not exists "uuid-ossp";

drop table if exists feed_item;

drop table if exists rss_feed;

create table rss_feed(
    id serial primary key,
    name varchar not null,
    image_url varchar null,
    description varchar null,
    slug varchar not null,
    feed_uri varchar not null,
    last_pub_date date null
);

create table feed_item(
    guid varchar not null default uuid_generate_v4(),
    feed_id integer not null,
    title varchar not null,
    description varchar not null,
    enclosure_url varchar not null,
    pub_date date not null,
    primary key(guid),
    constraint fk_feed_item_feed_id foreign key (feed_id) references rss_feed(id)
);
