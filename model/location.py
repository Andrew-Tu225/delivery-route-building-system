from dataclasses import dataclass

@dataclass
class Location:
    name : str
    lat : float
    lng : float
    demand : int

    def __post_init__(self):
        self.coordinates = (self.lat, self.lng)

    def __hash__(self):
        return hash(self.coordinates)
    
    def __eq__(self, other):
        return isinstance(other, Location) and self.coordinates == other.coordinates
    
    def __repr__(self):
        return f"Location(name={self.name}, demand={self.demand})"
