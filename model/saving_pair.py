from dataclasses import dataclass
from typing import Optional
from .location import Location

@dataclass
class SavingPair:
    point1: Location
    point2: Location
    saving_value: float
    
    def contains_point(self, point: Location) -> bool:
        return point in [self.point1, self.point2]
    
    def get_other_point(self, point: Location) -> Optional[Location]:
        if point == self.point1:
            return self.point2
        elif point == self.point2:
            return self.point1
        return None