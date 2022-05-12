import { Fisheye, Tooltip, ElementActive } from '../../../src/interaction';

describe('interaction', () => {
  it('ElementActive() returns expected defaults', () => {
    expect(ElementActive({ color: 'red' })).toEqual({
      interactors: [{ type: 'mousePosition' }, { type: 'touchPosition' }],
      start: [
        {
          trigger: 'hover',
          action: [
            { type: 'surfacePointSelection' },
            { type: 'highlightSelection', color: 'red' },
          ],
        },
      ],
      end: [
        {
          trigger: 'leave',
          action: [
            { type: 'surfacePointSelection' },
            { type: 'highlightSelection', color: 'red' },
          ],
        },
      ],
    });
  });

  it('Fisheye() returns expected defaults', () => {
    expect(Fisheye({ distortionX: 3 })).toEqual({
      interactors: [{ type: 'mousePosition' }, { type: 'touchPosition' }],
      start: [
        {
          trigger: 'hover',
          throttle: { wait: 50, leading: true, trailing: false },
          action: [{ type: 'fisheyeFocus', distortionX: 3 }, { type: 'plot' }],
        },
      ],
      end: [
        {
          trigger: 'leave',
          action: [{ type: 'fisheyeFocus', distortionX: 3 }, { type: 'plot' }],
        },
      ],
    });
  });

  it('Tooltip() returns expected defaults', () => {
    expect(Tooltip()).toEqual({
      interactors: [{ type: 'mousePosition' }, { type: 'touchPosition' }],
      start: [
        {
          trigger: 'hover',
          action: [{ type: 'surfacePointSelection' }, { type: 'tooltip' }],
          throttle: { wait: 50, leading: true, trailing: false },
        },
        {
          trigger: 'leave',
          action: [{ type: 'surfacePointSelection' }, { type: 'tooltip' }],
        },
      ],
    });
  });
});