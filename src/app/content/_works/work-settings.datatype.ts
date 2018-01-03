import {
  EmptySettings,
  GradientRSettings
} from './work.datatypes';
import {
  CanvasWorkSettings
} from './canvas-work-settings.datatype';
export type WorkSettings
= CanvasWorkSettings
| GradientRSettings
| EmptySettings;
