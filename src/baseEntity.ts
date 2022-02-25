import {  Property } from '@mikro-orm/core';


export abstract class BaseEntity {
  @Property({ type: 'string' })
  orgID: string;

  @Property({ onCreate: () => new Date() })
  createDate = new Date();

  @Property({ onUpdate: () => new Date(), onCreate: () => new Date() })
  updateDate = new Date();

  @Property({ nullable: true, type: 'string' })
  createdBy: string;
}