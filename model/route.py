from dataclasses import dataclass
from typing import List, Optional
from .location import Location


@dataclass
class Route:
    path : List[Location]
    capacity_used : int = 0

    def __post_init__(self):
        if not self.path:
            self.path = []
    
    @property
    def is_empty(self) -> bool:
        return len(self.path) == 0
    
    @property
    def size(self) -> int:
        return len(self.path)
    
    @property
    def start_point(self) -> Optional[Location]:
        return self.path[0] if self.path else None
    
    @property
    def end_point(self) -> Optional[Location]:
        return self.path[-1] if self.path else None
    
    @property
    def edge_points(self) -> List[Location]:
        if self.size <= 1:
            return self.path.copy()
        return [self.start_point, self.end_point]
    
    @property
    def interior_points(self) -> List[Location]:
        if self.size <= 2:
            return []
        return self.path[1:-1]
    
    def can_accommodate(self, additional_demand: int, max_capacity: int) -> bool:
        return self.capacity_used + additional_demand <= max_capacity
    
    def add_point_at_start(self, point: Location):
        self.path.insert(0, point)
        self.capacity_used += point.demand
    
    def add_point_at_end(self, point: Location):
        self.path.append(point)
        self.capacity_used += point.demand