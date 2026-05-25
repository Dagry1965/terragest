import { ERPSchedulingPlanningView } from "@/components/erp/scheduling";
import { rendezvousModule } from "@/runtime/modules/generated/rendezvous";

export default function RendezvousPlanningPage() {
  return (
    <ERPSchedulingPlanningView
      module={rendezvousModule}
    />
  );
}
