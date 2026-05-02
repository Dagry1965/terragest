import {
  ApiError,
  ApiSuccess,
} from "@/shared/api/responses/ApiResponse";

export const ApiWrapper =
async (
  callback: any
) => {

  try {

    const result =
      await callback();

    return Response.json(
      ApiSuccess(result)
    );

  } catch (error: any) {

    return Response.json(
      ApiError(
        error.message
      ),
      {
        status: 500,
      }
    );
  }
};
