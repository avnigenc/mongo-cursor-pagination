import { Collection } from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import { IFindParams } from "./interfaces/find-params.interface.ts";
import { IResponse } from "./interfaces/response.interface.ts";
import { Find } from "./lib/find.ts";

async function find<T>(
  collection: Collection<T>,
  params: IFindParams
): Promise<IResponse<T>> {
  return await new Find().run<T>(collection, params);
}

export { find };
