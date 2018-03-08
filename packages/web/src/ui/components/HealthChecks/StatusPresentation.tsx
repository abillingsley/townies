import * as React from "react";

import { IStatusPresentationProps as IProps } from "./_types";

export function StatusPresentation(props: IProps) {
  const { name, status, ping } = props;

  return (
    <div>
      {name}: {status} - {ping} ms ping
    </div>
  );
}
