import { assert } from "https://deno.land/std@0.173.0/testing/asserts.ts";

import { find } from "../src/api.ts";

import { MongoClient } from "https://deno.land/x/mongo@v0.31.1/mod.ts";

// deno-lint-ignore no-empty-interface
interface IEvent {}

Deno.test("find", async () => {
  const client = new MongoClient();

  await client.connect("mongodb://localhost:27017/");

  const eventCollection = client
    .database("mongo-big-data")
    .collection<IEvent>("events");

  const params = {
    limit: 10,
    // next: "NjNiNDllNzk4ZmI3YjNhNDVhYWEyOTFk",
    // previous: "NjNiNDllNzk4ZmI3YjNhNDVhYWEyOTFl",
  };

  const response = await find(eventCollection, params);

  assert(Array.isArray(response.results) === true);

  client.close();
});
