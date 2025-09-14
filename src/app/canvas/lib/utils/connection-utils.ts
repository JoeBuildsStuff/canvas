// Compatibility layer that forwards to the new centralized connection system
import { Node, Connection, MarkerShape } from '../store/canvas-store';
import {
  // Types
  ConnectionPointPosition,
  LineBoundingBoxResult,
  // Managers and utils
  connectionManager,
  CONNECTION_SNAP_THRESHOLD,
  CONNECTION_POINT_OFFSET,
  LINE_BOUNDING_BOX_PADDING,
  calculateBoundingBox,
  deepClone
} from '@/app/canvas/lib/connection';

export { CONNECTION_SNAP_THRESHOLD, CONNECTION_POINT_OFFSET, LINE_BOUNDING_BOX_PADDING, deepClone };

// Wrapper: calculate connection point position
export function calculateConnectionPointPosition(
  node: Node,
  position: ConnectionPointPosition,
  isConnected?: boolean,
  line?: Node,
  startOrEnd?: 'start' | 'end',
  startMarker?: MarkerShape,
  endMarker?: MarkerShape
): { x: number; y: number } {
  return connectionManager.calculateConnectionPoint(node, position, {
    isConnected,
    lineNode: line,
    startOrEnd,
    startMarker,
    endMarker
  });
}

// Wrapper: optimal connection point on a single shape
export function findOptimalConnectionPoint(
  shape: Node,
  targetPoint: { x: number; y: number },
  isConnected: boolean = false,
  line?: Node,
  startOrEnd?: 'start' | 'end'
): { position: ConnectionPointPosition; point: { x: number; y: number } } {
  return connectionManager.findOptimalConnectionPoint(shape, targetPoint, {
    isConnected,
    lineNode: line,
    startOrEnd
  });
}

// Wrapper: nearest connection point among nodes
export interface NearestConnectionPoint {
  node: Node;
  position: ConnectionPointPosition;
  absolutePosition: { x: number; y: number };
  distance: number;
}

export function findNearestConnectionPoint(
  nodes: Node[],
  x: number,
  y: number,
  excludeNodeId?: string,
  startOrEnd?: 'start' | 'end',
  startMarker?: MarkerShape,
  endMarker?: MarkerShape
): NearestConnectionPoint | null {
  const result = connectionManager.findNearestConnectionPoint(
    nodes,
    { x, y },
    excludeNodeId,
    { isConnected: true, startOrEnd, startMarker, endMarker }
  );
  return result;
}

// Wrapper: line bounding box (keeps old name)
export function calculateLineBoundingBox(points: Array<{ x: number; y: number }>): LineBoundingBoxResult {
  return calculateBoundingBox(points, LINE_BOUNDING_BOX_PADDING);
}

// Wrapper: update a single connected endpoint
export function updateConnectedLine(
  line: Node,
  connection: Connection,
  connectionPoint: { x: number; y: number }
): Node {
  return connectionManager.updateConnectedLine(line, connection, connectionPoint);
}

// Wrapper: update all connections for a line (handles elbow or straight)
export function updateAllLineConnections(
  line: Node,
  connections: Connection[],
  nodes: Node[]
): Node {
  return connectionManager.updateAllLineConnections(line, connections, nodes);
}
