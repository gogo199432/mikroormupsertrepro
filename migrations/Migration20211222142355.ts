import { Migration } from '@mikro-orm/migrations';

export class Migration20211222142355 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "room" ("id" serial primary key, "org_id" varchar(255) not null, "create_date" timestamptz(0) not null, "update_date" timestamptz(0) not null, "created_by" varchar(255) null, "name" varchar(255) not null default \'\', "color" varchar(255) not null default \'primary\', "description" varchar(2000) null);');

    this.addSql('create table "guest" ("id" serial primary key, "org_id" varchar(255) not null, "create_date" timestamptz(0) not null, "update_date" timestamptz(0) not null, "created_by" varchar(255) null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "phone" varchar(255) null, "email" varchar(255) null, "description" varchar(2000) null, "current_address" varchar(255) null, "place_of_birth" varchar(255) null, "time_of_birth" varchar(255) null, "personal_id" varchar(255) null, "bank_number" varchar(255) null, "main_language" varchar(255) null);');

    this.addSql('create table "file_tracking" ("minio_name" varchar(255) not null, "org_id" varchar(255) not null, "create_date" timestamptz(0) not null, "update_date" timestamptz(0) not null, "created_by" varchar(255) null, "friendly_name" varchar(255) null);');
    this.addSql('alter table "file_tracking" add constraint "file_tracking_pkey" primary key ("org_id", "minio_name");');

    this.addSql('create table "guest_files" ("guest_id" int4 not null, "file_tracking_org_id" varchar(255) not null, "file_tracking_minio_name" varchar(255) not null);');
    this.addSql('alter table "guest_files" add constraint "guest_files_pkey" primary key ("guest_id", "file_tracking_org_id", "file_tracking_minio_name");');

    this.addSql('create table "room_files" ("room_id" int4 not null, "file_tracking_org_id" varchar(255) not null, "file_tracking_minio_name" varchar(255) not null);');
    this.addSql('alter table "room_files" add constraint "room_files_pkey" primary key ("room_id", "file_tracking_org_id", "file_tracking_minio_name");');

    this.addSql('create table "booking" ("id" serial primary key, "org_id" varchar(255) not null, "create_date" timestamptz(0) not null, "update_date" timestamptz(0) not null, "created_by" varchar(255) null, "guest_id" int4 null, "room_id" int4 null, "start" timestamptz(0) not null, "end" timestamptz(0) not null, "booking_date" timestamptz(0) null, "person_amount" int4 not null default 1, "children" int4 null, "description" varchar(2000) null, "price_total" decimal(18,8) null, "money_paid_to_date" decimal(18,8) null, "currency" varchar(10) not null default \'HUF\', "source" varchar(255) not null default \'manual\', "uid" varchar(255) not null);');

    this.addSql('create table "booking_files" ("booking_id" int4 not null, "file_tracking_org_id" varchar(255) not null, "file_tracking_minio_name" varchar(255) not null);');
    this.addSql('alter table "booking_files" add constraint "booking_files_pkey" primary key ("booking_id", "file_tracking_org_id", "file_tracking_minio_name");');

    this.addSql('alter table "guest_files" add constraint "guest_files_guest_id_foreign" foreign key ("guest_id") references "guest" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "guest_files" add constraint "guest_files_file_tracking_org_id_file_tracking_minio_name_foreign" foreign key ("file_tracking_org_id", "file_tracking_minio_name") references "file_tracking" ("org_id", "minio_name") on update cascade on delete cascade;');

    this.addSql('alter table "room_files" add constraint "room_files_room_id_foreign" foreign key ("room_id") references "room" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "room_files" add constraint "room_files_file_tracking_org_id_file_tracking_minio_name_foreign" foreign key ("file_tracking_org_id", "file_tracking_minio_name") references "file_tracking" ("org_id", "minio_name") on update cascade on delete cascade;');

    this.addSql('alter table "booking" add constraint "booking_guest_id_foreign" foreign key ("guest_id") references "guest" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "booking" add constraint "booking_room_id_foreign" foreign key ("room_id") references "room" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "booking_files" add constraint "booking_files_booking_id_foreign" foreign key ("booking_id") references "booking" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "booking_files" add constraint "booking_files_file_tracking_org_id_file_tracking_minio_name_foreign" foreign key ("file_tracking_org_id", "file_tracking_minio_name") references "file_tracking" ("org_id", "minio_name") on update cascade on delete cascade;');

    this.addSql('create index "guest_files_file_tracking_org_id_file_tracking_minio_name_index" on "guest_files" ("file_tracking_org_id", "file_tracking_minio_name");');

    this.addSql('create index "room_files_file_tracking_org_id_file_tracking_minio_name_index" on "room_files" ("file_tracking_org_id", "file_tracking_minio_name");');

    this.addSql('create index "booking_files_file_tracking_org_id_file_tracking_minio_name_index" on "booking_files" ("file_tracking_org_id", "file_tracking_minio_name");');
  }

}
