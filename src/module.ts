import { FieldType, PanelPlugin } from '@grafana/data';
import { GanttOptions } from './types';
import { GanttPanel } from './GanttPanel';
import { FieldSelectEditor, getPanelPluginOrFallback } from 'grafana-plugin-support';

export const plugin = getPanelPluginOrFallback(
  'marcusolsson-gantt-panel',
  new PanelPlugin<GanttOptions>(GanttPanel).useFieldConfig().setPanelOptions((builder) => {
    return builder
      .addCustomEditor({
        id: 'textField',
        path: 'textField',
        name: 'Text',
        description: 'Field to use for the text. Must be unique. Defaults to the first textual field.',
        editor: FieldSelectEditor,
        category: ['Dimensions'],
        settings: {
          filterByType: [FieldType.string],
        },
      })
      .addCustomEditor({
        id: 'startField',
        path: 'startField',
        name: 'Start time',
        description: 'Field to use for the start time. Defaults to the first time field.',
        editor: FieldSelectEditor,
        category: ['Dimensions'],
        settings: {
          filterByType: [FieldType.time, FieldType.string, FieldType.number],
        },
      })
      .addCustomEditor({
        id: 'endField',
        path: 'endField',
        name: 'End time',
        description: 'Field to use for the end time. Defaults to the second time field.',
        editor: FieldSelectEditor,
        category: ['Dimensions'],
        settings: {
          filterByType: [FieldType.time, FieldType.string, FieldType.number],
        },
      })
      .addCustomEditor({
        id: 'groupByField',
        path: 'groupByField',
        name: 'Group by',
        description: 'Field to use for grouping.',
        editor: FieldSelectEditor,
        category: ['Dimensions'],
        settings: {
          filterByType: [FieldType.string],
        },
      })
      .addCustomEditor({
        id: 'labelFields',
        path: 'labelFields',
        name: 'Labels',
        description: 'Fields to use as labels in the tooltip.',
        category: ['Dimensions'],
        editor: FieldSelectEditor,
        settings: {
          multi: true,
        },
      })
      .addSelect({
        path: 'sortBy',
        name: 'Sort by',
        defaultValue: 'startTime',
        settings: {
          options: [
            {
              label: 'Text',
              value: 'text',
              description: 'Sort tasks alphabetically by their text',
            },
            {
              label: 'Start time',
              value: 'startTime',
              description: 'Sort tasks chronologically by their start time',
            },
          ],
        },
      })
      .addSelect({
        path: 'sortOrder',
        name: 'Sort order',
        defaultValue: 'asc',
        settings: {
          options: [
            {
              label: 'Ascending',
              value: 'asc',
              description: 'A-Z if sorting by text, or oldest to most recent if sorting by time',
            },
            {
              label: 'Descending',
              value: 'desc',
              description: 'Z-A if sorting by text, or most recent to oldest if sorting by time',
            },
          ],
        },
      });
  })
);
