///
/// Copyright © 2016-2025 The Thingsboard Authors
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///     http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///

import { Datasource, Widget } from '@shared/models/widget.models';
import { Dashboard } from '@shared/models/dashboard.models';
import { EntityAliases } from '@shared/models/alias.models';
import { Filters } from '@shared/models/query/query.models';
import { MapModelDefinition } from '@shared/models/widget/maps/map-model.definition';

export interface WidgetModelDefinition<T = any> {
  testWidget(widget: Widget): boolean;
  prepareExportInfo(dashboard: Dashboard, widget: Widget): T;
  updateFromExportInfo(widget: Widget, entityAliases: EntityAliases, filters: Filters, info: T): void;
  datasources(widget: Widget): Datasource[];
}

const widgetModelRegistry: WidgetModelDefinition[] = [
  MapModelDefinition
];

export const findWidgetModelDefinition = (widget: Widget): WidgetModelDefinition => {
  return widgetModelRegistry.find(def => def.testWidget(widget));
}
