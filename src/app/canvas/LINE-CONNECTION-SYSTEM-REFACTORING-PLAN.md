# Line Connection System Refactoring Plan

After analyzing the codebase, I've identified several issues with the line connection system that make it complex, fragile, and difficult to maintain. Below is a comprehensive refactoring plan to address these problems.

## 1. Centralize Connection Logic

### Phase 1: Create a Unified Connection Module ✅
- **Create a new `connection-manager.ts` module** that will serve as the single source of truth for all connection logic ✅
- **Implement a Connection API** with clear, consistent interfaces: ✅
  ```typescript
  interface Point {
    x: number;
    y: number;
  }
  
  interface ConnectionOptions {
    isConnected: boolean;
    startOrEnd?: 'start' | 'end';
    markerShape?: MarkerShape;
    lineNode?: Node;
  }
  
  interface ConnectionResult {
    nodeId: string;
    position: ConnectionPointPosition;
    absolutePosition: Point;
    distance: number;
  }
  
  interface ConnectionManager {
    // Calculate exact position of a connection point on a shape
    calculateConnectionPoint(
      node: Node, 
      position: ConnectionPointPosition, 
      options: ConnectionOptions
    ): Point;
    
    // Find the nearest connection point to a given location
    findNearestConnectionPoint(
      nodes: Node[], 
      point: Point, 
      excludeNodeId?: string,
      options?: ConnectionOptions
    ): ConnectionResult | null;
    
    // Update a line with connections at its endpoints
    updateConnectedLine(
      line: Node, 
      connections: Connection[], 
      nodes: Node[]
    ): Node;
    
    // Find optimal connection point based on target location
    findOptimalConnectionPoint(
      shape: Node,
      targetPoint: Point,
      options?: ConnectionOptions
    ): { position: ConnectionPointPosition, point: Point };
    
    // Create a new connection between a line endpoint and a shape
    createConnection(
      lineId: string,
      pointIndex: number,
      shapeId: string,
      position: ConnectionPointPosition
    ): Connection;
  }
  ```

### Phase 2: Migration of Duplicate Functions ✅
- **Identify and consolidate duplicate functions** from: ✅
  - `connection-utils.ts`: `calculateConnectionPointPosition`, `findOptimalConnectionPoint`, `findNearestConnectionPoint`, `updateConnectedLine` ✅
  - `useCanvasMouse.ts`: `findNearbyConnectionPoint`, `connectLineToPoint` ✅
  - `elbow-line-utils.ts`: `findOptimalElbowConnectionPoints`, connection-related calculations ✅

## 2. Abstract Shape-Specific Connection Logic

### Phase 1: Shape Connection Strategy Pattern ✅
- **Implement a strategy pattern** for shape-specific connection logic: ✅
  ```typescript
  interface ShapeConnectionStrategy {
    // Calculate connection point for a specific shape type
    calculateConnectionPoint(
      node: Node, 
      position: ConnectionPointPosition, 
      options: ConnectionOptions
    ): Point;
    
    // Find the optimal connection point for connecting to this shape
    findOptimalConnectionPoint(
      node: Node,
      targetPoint: Point,
      options: ConnectionOptions
    ): { position: ConnectionPointPosition, point: Point };
  }
  
  // Implementation for each shape type
  class RectangleConnectionStrategy implements ShapeConnectionStrategy {
    calculateConnectionPoint(node: Node, position: ConnectionPointPosition, options: ConnectionOptions): Point {
      // Rectangle-specific connection point logic
    }
    
    findOptimalConnectionPoint(node: Node, targetPoint: Point, options: ConnectionOptions): { position: ConnectionPointPosition, point: Point } {
      // Find best connection point on rectangle based on target point
    }
  }
  
  class CircleConnectionStrategy implements ShapeConnectionStrategy {
    // Circle-specific implementations
  }
  
  class DiamondConnectionStrategy implements ShapeConnectionStrategy {
    // Diamond-specific implementations
  }
  
  class TriangleConnectionStrategy implements ShapeConnectionStrategy {
    // Triangle-specific implementations
  }
  ```

### Phase 2: Marker Handling Refactor ✅
- **Create a dedicated MarkerManager** to handle marker positioning logic: ✅
  ```typescript
  interface MarkerInfo {
    shape: MarkerShape;
    fillStyle: FillStyle;
    isStart: boolean;
    color: string;
    fillColor: string;
  }
  
  class MarkerManager {
    // Calculate offset for connection point based on marker
    calculateMarkerOffset(
      position: ConnectionPointPosition,
      markerInfo: MarkerInfo
    ): number;
    
    // Determine angle for marker rendering
    calculateMarkerAngle(
      startPoint: Point,
      endPoint: Point,
      isElbowLine: boolean
    ): number;
    
    // Get marker style properties based on line properties
    getMarkerPropertiesFromLine(
      line: Node, 
      isStartPoint: boolean
    ): MarkerInfo;
  }
  ```

## 3. Reorganize Utility Functions

### Phase 1: Logical Grouping ✅
- **Restructure utility files** based on functional domains: ✅
  - `geometry-utils.ts`: ✅
    - `distanceToLineSegment`
    - `lineSegmentsIntersect`
    - `calculateBoundingBox`
    - `pointInsideRect`
    - Pure geometric calculations without node or shape dependencies
    
  - `shape-utils.ts`:
    - `findNodeAtPosition`
    - `isNodeInSelectionBox`
    - `calculateShapeBoundingBox`
    - Shape-specific utility functions for positioning and collision
    
  - `connection-utils.ts`:
    - Refactored to use ConnectionManager
    - Adapter functions for backward compatibility
    
  - `line-routing-utils.ts`: ✅
    - `generateStraightLine`
    - `generateElbowLine`
    - `generateRoundedElbowPathData`
    - Line drawing and path generation functions

### Phase 2: Establish Clear Interfaces ✅
- **Define clear module interfaces** with proper TypeScript exports: ✅
  ```typescript
  // geometry-utils.ts
  export { 
    distanceToLineSegment,
    lineSegmentsIntersect,
    pointInsideRect,
    getBoundingBox
  };
  
  // shape-utils.ts
  export {
    findNodeAtPosition,
    isNodeInSelectionBox,
    getShapeBounds,
    calculateShapeCenter
  };
  
  // connection-manager.ts
  export {
    ConnectionManager,
    createConnectionManager,
    ConnectionOptions,
    ConnectionResult
  };
  
  // line-routing-utils.ts
  export {
    LineRoutingType,
    generateLinePath,
    createStraightLinePoints,
    createElbowLinePoints,
    pathDataFromPoints
  };
  ```

## 4. Improve Type Safety

### Phase 1: Enhanced Type Definitions ✅
- **Create comprehensive type definitions** for all connection-related data: ✅
  ```typescript
  // connection-types.ts
  
  export type ConnectionPointPosition = 'n' | 's' | 'e' | 'w';
  
  export type MarkerShape = 'none' | 'arrow' | 'triangle' | 'circle' | 'diamond' | 'square';
  
  export type FillStyle = 'filled' | 'outlined';
  
  export type LineRoutingType = 'straight' | 'elbow' | 'curved';
  
  export interface Point {
    x: number;
    y: number;
  }
  
  export interface ConnectionPoint {
    nodeId: string;
    position: ConnectionPointPosition;
    absolutePosition: Point;
  }
  
  export interface Connection {
    lineId: string;
    pointIndex: number;
    shapeId: string;
    position: ConnectionPointPosition;
    dynamic: boolean;
  }
  
  export interface MarkerInfo {
    shape: MarkerShape;
    fillStyle: FillStyle;
    isStart: boolean;
    color: string;
    fillColor: string;
    angle?: number;
  }
  
  export interface LineProperties {
    points: Point[];
    type: 'line' | 'arrow';
    startMarker: MarkerShape;
    endMarker: MarkerShape;
    markerFillStyle: FillStyle;
    lineType: LineRoutingType;
  }
  ```

### Phase 2: Function Signatures Standardization ✅
- **Update all function signatures** to use consistent parameter ordering and naming: ✅
  - Place node/shape parameters first
  - Position/point parameters second
  - Option objects last
  - Use consistent naming conventions (`position` vs `pos`, `point` vs `pt`)
  
- **Add proper return type annotations** to all functions: ✅
  ```typescript
  // Before
  function findOptimalConnectionPoint(shape, target, isConnected, line, startOrEnd) {
    // ...
  }
  
  // After
  function findOptimalConnectionPoint(
    shape: Node,
    targetPoint: Point,
    options: ConnectionOptions
  ): { position: ConnectionPointPosition, point: Point } {
    // ...
  }
  ```

## 5. Implementation Plan

### Sprint 1: Foundations (2 weeks) ✅
- Set up new file structure and interfaces ✅
- Create the ConnectionManager skeleton ✅
- Begin migrating core geometric utilities to geometry-utils.ts ✅
- Define and implement complete type system ✅
- Set up unit testing framework for connection logic ✅

### Sprint 2: Connection Point Consolidation (2 weeks) ✅
- Implement shape connection strategies for all shape types ✅
- Migrate `calculateConnectionPointPosition` to the new system ✅
- Create the MarkerManager implementation ✅
- Add unit tests for connection point calculations ✅
- Verify positioning matches current implementation ✅

### Sprint 3: Line Routing Refactor (2 weeks) ✅
- Refactor straight line routing logic ✅
- Refactor elbow line routing logic ✅
- Create adapter functions for backward compatibility ✅
- Unit test all line routing strategies ✅
- Begin integration with ConnectionManager ✅

### Sprint 4: Integration (2 weeks)
- Connect the new modules to the Canvas and LineInProgress components
- Update useCanvasMouse.ts to use the new ConnectionManager
- Update LineShape.tsx and LineInProgress.tsx components
- Comprehensive integration testing
- Test interoperability with existing code

### Sprint 5: Cleanup and Documentation (1 week)
- Remove deprecated functions
- Complete documentation with examples for each API
- Performance testing and optimization
- Knowledge transfer sessions with development team

## 6. Testing Strategy

### Unit Tests ✅
- **Individual strategy tests**: ✅
  - Test each shape connection strategy with various positions ✅
  - Test edge cases like very small shapes ✅
  - Test marker offset calculations ✅
  
- **Geometric function tests**: ✅
  - Test line intersection calculations ✅
  - Test distance calculations ✅
  - Test bounding box calculations ✅
  
- **ConnectionManager tests**: ✅
  - Test with mock shapes and connections ✅
  - Test with various line routing types ✅
  - Test with and without markers ✅

### Integration Tests
- **Component interaction tests**:
  - Test line drawing and connection in the Canvas component
  - Test drag-and-drop connection behavior
  
- **End-to-end workflow tests**:
  - Create line → Connect to shape → Move shape → Verify connection updates
  - Test multiple connection scenarios
  
- **Compatibility tests**: ✅
  - Test with existing storage format ✅
  - Test loading existing diagrams ✅

### Visual Regression Tests
- Capture screenshots of standard connection scenarios
- Test different shapes, different connection points
- Test different marker types
- Test different line routing methods
- Compare before/after refactoring to ensure visual consistency

## 7. Migration Safety Measures

- **Create shadow implementation** that runs in parallel with existing code: ✅
  - Compare outputs of old and new implementations ✅
  - Log discrepancies for analysis ✅
  
- **Feature flags**:
  - `useNewConnectionManager`: Boolean flag to switch systems
  - `useNewLineRouting`: Boolean flag for line routing algorithms
  
- **Comprehensive logging**: ✅
  - Log connection calculations in development mode ✅
  - Create specific debug visualizations for connection points ✅
  
- **Rollback plan**: ✅
  - Maintain compatibility with existing data model ✅
  - Ensure old implementation remains functional until fully deprecated ✅
  - Document steps for emergency rollback ✅

## Notes on Implementation Progress

We've completed several major parts of the refactoring plan:

1. Created a comprehensive type system for connections in `connection-types.ts` ✅
2. Implemented the Strategy Pattern for shape-specific connection logic ✅
3. Created a dedicated MarkerManager for handling markers ✅
4. Developed a unified ConnectionManager that centralizes connection logic ✅
5. Created pure geometry utility functions in `geometry-utils.ts` ✅
6. Implemented line routing utilities in `line-routing-utils.ts` ✅
7. Set up proper TypeScript exports using an index file ✅
8. Created adapter functions for backward compatibility ✅
9. Implemented a testing framework to verify the new system ✅

Next steps include:
1. Integrating the new system with existing components
2. Updating the canvas components to use the new system
3. Adding performance optimization
4. Cleaning up deprecated code once the new system is stable

By following this structured approach, we can significantly improve the maintainability and reliability of the line connection system while maintaining backward compatibility.