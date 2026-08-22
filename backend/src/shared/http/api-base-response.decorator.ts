import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { BaseResponse } from './base-response';

/**
 * Documents an endpoint as returning `BaseResponse<TModel>`. Composes the
 * shared envelope schema with the inner model via `allOf` (single source of
 * truth — envelope fields never drift from the actual class), and titles the
 * combined schema so it lists cleanly as `Wrapped<Model>` in the docs.
 */
export function ApiBaseResponse<TModel extends Type<unknown>>(
  model: TModel,
  options?: { status?: 200 | 201; description?: string },
) {
  const ApiResponse =
    options?.status === 201 ? ApiCreatedResponse : ApiOkResponse;

  return applyDecorators(
    ApiExtraModels(BaseResponse, model),
    ApiResponse({
      description: options?.description,
      schema: {
        title: `Wrapped${model.name}`,
        allOf: [
          { $ref: getSchemaPath(BaseResponse) },
          { properties: { data: { $ref: getSchemaPath(model) } } },
        ],
      },
    }),
  );
}
