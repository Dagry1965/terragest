import {
  EventStreamingService,
} from "@/data-platform/streaming/EventStreamingService";

import {
  DataWarehouseService,
} from "@/data-platform/warehouse/DataWarehouseService";

export const ETLPipeline = {

  async process(
    dataset: string,
    payload: any
  ) {

    EventStreamingService.publish(
      dataset,
      payload
    );

    await DataWarehouseService.store(
      dataset,
      payload
    );

    return {

      success: true,
    };
  },
};
