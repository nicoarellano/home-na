// Adapted from deck.gl's maplibre example
// https://github.com/visgl/deck.gl/blob/9.3-release/examples/website/maplibre/animated-arc-layer.ts

import { ArcLayer, ArcLayerProps } from '@deck.gl/layers'
import { Accessor, DefaultProps } from '@deck.gl/core'

import type { ShaderModule } from '@luma.gl/shadertools'

const uniformBlock = `\
uniform tripsUniforms {
  vec2 timeRange;
} trips;
`

export type TripsProps = {
  timeRange: [number, number]
}

export const tripsUniforms = {
  name: 'trips',
  vs: uniformBlock,
  fs: uniformBlock,
  uniformTypes: {
    timeRange: 'vec2<f32>',
  },
} as const satisfies ShaderModule<TripsProps>

export type AnimatedArcLayerProps<DataT = unknown> = _AnimatedArcLayerProps<DataT> &
  ArcLayerProps<DataT>

type _AnimatedArcLayerProps<DataT = unknown> = {
  getSourceTimestamp?: Accessor<DataT, number>
  getTargetTimestamp?: Accessor<DataT, number>
  timeRange?: [number, number]
}

const defaultProps: DefaultProps<_AnimatedArcLayerProps> = {
  getSourceTimestamp: { type: 'accessor', value: 0 },
  getTargetTimestamp: { type: 'accessor', value: 1 },
  timeRange: { type: 'array', compare: true, value: [0, 1] },
}

export default class AnimatedArcLayer<DataT = unknown, ExtraProps = object> extends ArcLayer<
  DataT,
  ExtraProps & Required<_AnimatedArcLayerProps<DataT>>
> {
  static layerName = 'AnimatedArcLayer'
  static defaultProps = defaultProps as unknown as DefaultProps<ArcLayerProps<unknown>>

  getShaders() {
    const shaders = super.getShaders()
    shaders.inject = {
      'vs:#decl': `\
in float instanceSourceTimestamp;
in float instanceTargetTimestamp;
out float vTimestamp;
`,
      'vs:#main-end': `\
vTimestamp = mix(instanceSourceTimestamp, instanceTargetTimestamp, segmentRatio);
`,
      'fs:#decl': `\
in float vTimestamp;
`,
      'fs:#main-start': `\
if (vTimestamp < trips.timeRange.x || vTimestamp > trips.timeRange.y) {
  discard;
}
`,
      'fs:DECKGL_FILTER_COLOR': `\
color.a *= (vTimestamp - trips.timeRange.x) / (trips.timeRange.y - trips.timeRange.x);
`,
    }
    shaders.modules = [...shaders.modules, tripsUniforms]
    return shaders
  }

  initializeState() {
    super.initializeState()
    this.getAttributeManager()!.addInstanced({
      instanceSourceTimestamp: {
        size: 1,
        accessor: 'getSourceTimestamp',
      },
      instanceTargetTimestamp: {
        size: 1,
        accessor: 'getTargetTimestamp',
      },
    })
  }

  draw(params: Parameters<ArcLayer['draw']>[0]) {
    const { timeRange } = this.props
    const tripsProps: TripsProps = { timeRange }
    const model = this.state.model!
    model.shaderInputs.setProps({ trips: tripsProps })
    super.draw(params)
  }
}
