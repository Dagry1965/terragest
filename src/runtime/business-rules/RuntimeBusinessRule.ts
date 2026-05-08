export interface RuntimeBusinessRule {

  id: string;

  module: string;

  event: string;

  condition:
    (payload: any) => boolean;

  action:
    (payload: any) => Promise<void>;
}
