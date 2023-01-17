import { IBaseParams } from "./base-params.interface.ts";

interface IFindParams extends IBaseParams {
  sort?: boolean;
}

export { type IFindParams };
