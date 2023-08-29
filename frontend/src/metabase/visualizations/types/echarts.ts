import type { EChartsOption } from "echarts";

import { VisualizationProps } from "./visualization";

type EChartsEventHandler = {
  // TODO better types
  eventName: string;
  query?: string;
  handler: (event: any) => void;
};

type ZREventHandler = {
  // TODO better types
  eventName: string;
  handler: (event: any) => void;
};

export type EChartsConfig = {
  option: EChartsOption;
  eventHandlers: EChartsEventHandler[];
  zrEventHandlers: ZREventHandler[];
};

export type IsomorphicVizProps = Partial<VisualizationProps> & {
  settings: VisualizationProps["settings"];
  data: VisualizationProps["data"];
};

export type EChartsMixin = (params: {
  chartType: any; // TODO better type
  props: IsomorphicVizProps;
  option: EChartsOption;
}) => {
  option: EChartsOption;
  eventHandlers?: EChartsEventHandler[];
  zrEventHandlers?: ZREventHandler[];
};
