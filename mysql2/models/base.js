import pool from "../db/config.js";

class Flags {
  constructor(table) {
    this.command = "";
    (this.query = false),
      (this.select = false),
      (this.where = false),
      (this.limit = false);
    this.table = table;
  }
}

export class BaseModel {
  table = null;

  query() {
    this.flags = new Flags(this.table);
    this.flags.query = true;
    return this;
  }

  select(...rest) {
    if (!this.flags.query) {
      throw new Error("You must call query() first");
    }
    this.flags.command += `SELECT ${[...rest]} FROM ${this.table} `;
    this.flags.select = true;
    return this;
  }

  where(key, sign = "=", value) {
    if (!this.flags.select) {
      throw new Error("You must call select() before where()");
    }
    this.flags.command += `WHERE ${key} ${sign} ${value}`;
    this.flags.where = true;
    return this;
  }

  andWhere(key, value) {
    if (!this.flags.where) {
      throw new Error("You must call where() before andWhere()");
    }
    this.flags.command += ` AND ${key} = ${value}`;
    this.flags.andWhere = true;
    return this;
  }

  orWhere(key, value) {
    if (!this.flags.where) {
      throw new Error("You must call where() before orWhere()");
    }
    this.flags.command += ` OR ${key} = ${value}`;
    return this;
  }

  limit(...rest) {
    if (!this.flags.select) {
      throw new Error("You must call select() before limit()");
    }

    const [offset, count] = rest;
    if (count !== undefined) {
      this.flags.command += ` LIMIT ${offset}, ${count}`;
    } else if (offset !== undefined) {
      this.flags.command += ` LIMIT ${offset}`;
    }
    this.flags.limit = true;
    return this;
  }

  async get() {
    if (!this.flags.select) {
      throw new Error("You must call select() before executing the query");
    }
    const [rows] = await pool.query(this.flags.command);
    return rows;
  }
}
