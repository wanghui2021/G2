import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';

fetch('../data/area.json')
  .then(res => res.json())
  .then(data => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
    });
    const ds = new DataSet();
    const dv = ds.createView()
      .source(data)
      .transform({
        type: 'fold',
        fields: ['Democracy', 'Colony', 'No Data', 'Open Anocracy', 'Closed Anocracy', 'Monarchy'],
        key: 'type',
        value: 'value',
        retains: ['Year']
      })
      .transform({
        type: 'percent',
        field: 'value',
        dimension: 'type',
        groupBy: ['Year'],
        as: 'percent'
      });

    chart.data(dv.rows);
    chart.scale({
      percent: {
        max: 1.0,
        min: 0.0,
        nice: false,
        formatter: function formatter(value) {
          value = value || 0;
          value = value * 100;
          return parseInt(value, 10) + '%';
        }
      }
    });

    chart.scale('Year', {
      tickCount: 10,
      nice: false
    });

    chart.axis('Year', {
      label: {
        style: {
          fill: '#aaaaaa'
        }
      }
    });
    chart.axis('percent', {
      label: {
        style: {
          fill: '#aaaaaa'
        }
      }
    });

    chart.legend({
      position: 'top'
    });

    chart
      .area()
      .adjust('stack')
      .position('Year*percent')
      .color('type');

    chart.render();
  });