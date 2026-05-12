import {
  Package,
  Car,
  Truck,
  Tractor,
  Users,
  Warehouse,
  Wrench,
  CreditCard,
  Building2,
  Map,
  ClipboardList,
  Shield,
  Cpu,
} from "lucide-react";

const ERP_ICONS: Record<string, any> = {
  package: Package,
  car: Car,
  truck: Truck,
  tractor: Tractor,
  users: Users,
  warehouse: Warehouse,
  wrench: Wrench,
  "credit-card": CreditCard,
  building: Building2,
  map: Map,
  clipboard: ClipboardList,
  shield: Shield,
  cpu: Cpu,
};

interface ERPModuleIconProps {
  icon?: string;
  className?: string;
}

export function ERPModuleIcon({
  icon,
  className,
}: ERPModuleIconProps) {

  const Icon =
    ERP_ICONS[icon ?? "package"] ?? Package;

  return (
    <Icon
      className={
        className ??
        "h-5 w-5"
      }
    />
  );
}