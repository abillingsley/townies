export interface IServerStatus {
  status: string;
  ping: number;
}

export interface IWithName { name: string; }

export type IStatusPresentationProps = (
  IServerStatus
  & IWithName
);

interface IHealthChecker {
  url: string;
  component: (props: IStatusPresentationProps) => Element;
}

export type IHealthCheckerProps = (
  IHealthChecker
  & IWithName
);
