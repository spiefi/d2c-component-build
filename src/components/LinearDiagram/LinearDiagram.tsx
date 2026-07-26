import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';

import { getVariableByName } from '@src/design-tokens/figma-variables-resolver.js';
import type { FigmaModes } from '@src/design-tokens/types';
import { cloneChildrenWithModes } from '@src/utils/react-utils';

import dealIcon from './assets/deal-icon.svg';
import lineGraph from './assets/line-graph.svg';
import './LinearDiagram.css';

const DEFAULT_X_LABELS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;

const DEFAULT_Y_VALUES = ['60%', '30%', '0%'] as const;

export type LinearDiagramProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  /** Accessible description for the chart. */
  chartLabel?: string;
  /** Replaces the plotted graph while inheriting `modes`. */
  graphSlot?: ReactNode;
  /** Label shown beside the legend marker. */
  legendLabel?: string;
  /** Figma modes keyed by exact variable collection name. */
  modes?: FigmaModes;
  /** Source note shown in the footer. */
  sourceText?: string;
  /** Status or timestamp shown on the right side of the footer. */
  updatedText?: string;
  /** Label for the vertical axis. */
  yAxisLabel?: string;
  /** Horizontal-axis labels rendered in order. */
  xLabels?: readonly string[];
  /** Vertical-axis values rendered from top to bottom. */
  yValues?: readonly string[];
};

type LinearDiagramStyle = CSSProperties &
  Record<`--linear-diagram-${string}`, string | number>;

function resolveLinearDiagramToken(name: string, modes: FigmaModes): string | number {
  const value = getVariableByName(name, modes);

  if (typeof value !== 'string' && typeof value !== 'number') {
    throw new Error(
      `[LinearDiagram] Figma variable "${name}" did not resolve to a CSS-compatible value.`,
    );
  }

  return value;
}

function toPixels(value: string | number): string {
  return typeof value === 'number' ? `${value}px` : value;
}

export default function LinearDiagram({
  chartLabel = 'Discount development by month',
  className,
  graphSlot,
  legendLabel = 'Discount development',
  modes = {},
  sourceText = 'Based on our internal collected data.',
  style,
  updatedText = 'Updated [timestamp]',
  xLabels = DEFAULT_X_LABELS,
  yAxisLabel = 'Discount value',
  yValues = DEFAULT_Y_VALUES,
  ...rest
}: LinearDiagramProps) {
  const diagramStyle: LinearDiagramStyle = {
    '--linear-diagram-accent': String(resolveLinearDiagramToken('linearDiagram/accent', modes)),
    '--linear-diagram-axis-font-family': String(
      resolveLinearDiagramToken('linearDiagram/axis/fontFamily', modes),
    ),
    '--linear-diagram-axis-font-size': toPixels(
      resolveLinearDiagramToken('linearDiagram/axis/fontSize', modes),
    ),
    '--linear-diagram-axis-font-weight': resolveLinearDiagramToken(
      'linearDiagram/axis/fontWeight',
      modes,
    ),
    '--linear-diagram-axis-line-height': toPixels(
      resolveLinearDiagramToken('linearDiagram/axis/lineHeight', modes),
    ),
    '--linear-diagram-body-font-family': String(
      resolveLinearDiagramToken('linearDiagram/body/fontFamily', modes),
    ),
    '--linear-diagram-body-font-size': toPixels(
      resolveLinearDiagramToken('linearDiagram/body/fontSize', modes),
    ),
    '--linear-diagram-body-font-weight': resolveLinearDiagramToken(
      'linearDiagram/body/fontWeight',
      modes,
    ),
    '--linear-diagram-body-line-height': toPixels(
      resolveLinearDiagramToken('linearDiagram/body/lineHeight', modes),
    ),
    '--linear-diagram-chart-gap': toPixels(
      resolveLinearDiagramToken('linearDiagram/chart/gap', modes),
    ),
    '--linear-diagram-content-gap': toPixels(
      resolveLinearDiagramToken('linearDiagram/content/gap', modes),
    ),
    '--linear-diagram-divider-background': String(
      resolveLinearDiagramToken('linearDiagram/divider/background', modes),
    ),
    '--linear-diagram-divider-height': toPixels(
      resolveLinearDiagramToken('linearDiagram/divider/height', modes),
    ),
    '--linear-diagram-footer-gap': toPixels(
      resolveLinearDiagramToken('linearDiagram/footer/gap', modes),
    ),
    '--linear-diagram-footer-height': toPixels(
      resolveLinearDiagramToken('linearDiagram/footer/height', modes),
    ),
    '--linear-diagram-footer-icon-background': String(
      resolveLinearDiagramToken('linearDiagram/footer/icon/background', modes),
    ),
    '--linear-diagram-footer-icon-foreground': String(
      resolveLinearDiagramToken('linearDiagram/footer/icon/foreground', modes),
    ),
    '--linear-diagram-footer-icon-radius': toPixels(
      resolveLinearDiagramToken('linearDiagram/footer/icon/radius', modes),
    ),
    '--linear-diagram-footer-icon-size': toPixels(
      resolveLinearDiagramToken('linearDiagram/footer/icon/size', modes),
    ),
    '--linear-diagram-footer-source-gap': toPixels(
      resolveLinearDiagramToken('linearDiagram/footer/source/gap', modes),
    ),
    '--linear-diagram-foreground': String(
      resolveLinearDiagramToken('linearDiagram/foreground', modes),
    ),
    '--linear-diagram-graph-border-color': String(
      resolveLinearDiagramToken('linearDiagram/graph/border/color', modes),
    ),
    '--linear-diagram-graph-gap': toPixels(
      resolveLinearDiagramToken('linearDiagram/graph/gap', modes),
    ),
    '--linear-diagram-graph-slot-gap': toPixels(
      resolveLinearDiagramToken('linearDiagram/graphSlot/gap', modes),
    ),
    '--linear-diagram-graph-slot-height': toPixels(
      resolveLinearDiagramToken('linearDiagram/graphSlot/height', modes),
    ),
    '--linear-diagram-legend-bar-height': toPixels(
      resolveLinearDiagramToken('linearDiagram/legendBar/height', modes),
    ),
    '--linear-diagram-legend-bar-radius': toPixels(
      resolveLinearDiagramToken('linearDiagram/legendBar/radius', modes),
    ),
    '--linear-diagram-legend-bar-width': toPixels(
      resolveLinearDiagramToken('linearDiagram/legendBar/width', modes),
    ),
    '--linear-diagram-legend-gap': toPixels(
      resolveLinearDiagramToken('linearDiagram/legend/gap', modes),
    ),
    '--linear-diagram-legend-item-gap': toPixels(
      resolveLinearDiagramToken('linearDiagram/legendItem/gap', modes),
    ),
    '--linear-diagram-legend-padding-left': toPixels(
      resolveLinearDiagramToken('linearDiagram/legend/padding/left', modes),
    ),
    '--linear-diagram-plot-gap': toPixels(
      resolveLinearDiagramToken('linearDiagram/plot/gap', modes),
    ),
    '--linear-diagram-x-axis-gap': toPixels(
      resolveLinearDiagramToken('linearDiagram/xAxis/gap', modes),
    ),
    '--linear-diagram-x-axis-height': toPixels(
      resolveLinearDiagramToken('linearDiagram/xAxis/height', modes),
    ),
    '--linear-diagram-x-axis-padding-left': toPixels(
      resolveLinearDiagramToken('linearDiagram/xAxis/padding/left', modes),
    ),
    '--linear-diagram-y-axis-values-gap': toPixels(
      resolveLinearDiagramToken('linearDiagram/yAxisValues/gap', modes),
    ),
    '--linear-diagram-y-axis-values-padding-vertical': toPixels(
      resolveLinearDiagramToken('linearDiagram/yAxisValues/padding/vertical', modes),
    ),
    '--linear-diagram-y-axis-values-width': toPixels(
      resolveLinearDiagramToken('linearDiagram/yAxisValues/width', modes),
    ),
    ...style,
  };

  const defaultGraph = (
    <>
      <img alt="" aria-hidden="true" className="LinearDiagram__line-graph" src={lineGraph} />
      <span aria-hidden="true" className="LinearDiagram__divider" />
    </>
  );

  return (
    <figure
      {...rest}
      aria-label={chartLabel}
      className={['LinearDiagram', className].filter(Boolean).join(' ')}
      data-name="Linear diagram"
      style={diagramStyle}
    >
      <div className="LinearDiagram__chart">
        <div className="LinearDiagram__plot">
          <div className="LinearDiagram__y-axis-label">{yAxisLabel}</div>

          <div className="LinearDiagram__graph">
            <div className="LinearDiagram__y-axis-values">
              {yValues.map((value, index) => (
                <span key={`${value}-${index}`}>{value}</span>
              ))}
            </div>

            <div className="LinearDiagram__graph-slot">
              {graphSlot === undefined
                ? defaultGraph
                : cloneChildrenWithModes(graphSlot, modes)}
            </div>
          </div>
        </div>

        <div className="LinearDiagram__x-axis">
          {xLabels.map((label, index) => (
            <span key={`${label}-${index}`}>{label}</span>
          ))}
        </div>
      </div>

      <div className="LinearDiagram__legend">
        <div className="LinearDiagram__legend-item">
          <span aria-hidden="true" className="LinearDiagram__legend-bar" />
          <span>{legendLabel}</span>
        </div>
      </div>

      <figcaption className="LinearDiagram__footer">
        <span className="LinearDiagram__source">
          <span aria-hidden="true" className="LinearDiagram__source-icon">
            <img alt="" src={dealIcon} />
          </span>
          <span>{sourceText}</span>
        </span>
        <span>{updatedText}</span>
      </figcaption>
    </figure>
  );
}
