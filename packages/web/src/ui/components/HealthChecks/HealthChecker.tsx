import * as React from "react";

import { IHealthCheckerProps as IProps } from "./_types";

import { measureTime } from "~/helpers/time";

const CHECK_INTERVAL = 1000; // ms

export class HealthChecker extends React.Component<IProps> {
  public healthCheckInterval: number;

  public state = { status: "", ping: Infinity };

  public componentDidMount() {
    this.healthCheckInterval = setInterval(this.check, CHECK_INTERVAL);
  }

  public componentWillUnmount() {
    clearInterval(this.healthCheckInterval);
  }

  public check = async () => {
    const { url } = this.props;

    const [result, time] = await measureTime<Promise<Response>>(() => fetch(url));

    const status = await result.text();

    this.setState({ status, ping: time });
  }

  public render() {
    const { component: Component, name } = this.props;

    return <Component { ...this.state } name={name}/>;
  }
}
