import React from 'react';
import { create } from 'react-test-renderer';
import ProfileStatus from './ProfileStatus';

describe('ProfileStatus component', () => {
  test('status from props should be in state', () => {
    const component = create(<ProfileStatus status="Life is good" />);
    const instance = component.getInstance();
    expect(instance.state.status).toBe('Life is good');
  });

  test('after creation <span> should be displayed', () => {
    const component = create(<ProfileStatus status="Life is good" />);

    const root = component.root;

    let span = root.findByType('span');
    expect(span.children.length).not.toBeNull();
  });

  test('after creation <input> should not be displayed', () => {
    const component = create(<ProfileStatus status="Life is good" />);
    const root = component.root;

    expect(() => {
      let input = root.findByType('input');
    }).toThrow();
  });

  test('after creation <span> should contain correct status', () => {
    const component = create(<ProfileStatus status="Life is good" />);
    const root = component.root;
    let span = root.findByType('span');
    expect(span.children[0]).toBe('Life is good');
  });
  test('input should be displayed in Edit Mode instead of span', () => {
    const component = create(<ProfileStatus status="Life is good" />);
    const root = component.root;
    let span = root.findByType('span');
    span.props.onDoubleClick();

    let input = root.findByType('input');
    expect(input.props.value).toBe('Life is good');
    // expect(() => {
    //   let span = root.findByType('span');
    // }).toThrow();
  });

  test('callback should be called', () => {
    const mockCallback = jest.fn();
    const component = create(
      <ProfileStatus status="Life is good" updateUserStatus={mockCallback} />
    );
    const instance = component.getInstance();
    instance.deactivateEditMode();
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
