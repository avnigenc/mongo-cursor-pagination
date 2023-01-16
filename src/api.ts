import { FindParams } from "./interfaces/find-params.interface.ts";
import { Response } from "./interfaces/response.interface.ts";
import { Find } from "./lib/find.ts";

async function find<T>(collection: T, params: FindParams): Promise<Response> {
  return await new Find().run<T>(collection, params);
}

export { find };
