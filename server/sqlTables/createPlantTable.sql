CREATE TABLE IF NOT EXISTS Plant (
  plaint_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  temperature_min REAL NOT NULL, 
  temperature_max REAL NOT NULL,
  moisture_min REAL NOT NULL,
  moisture_max REAL NOT NULL,
  fertility_min REAL NOT NULL,
  fertility_max REAL NOT NULL, 
  light_min REAL NOT NULL,
  light_max REAL NOT NULL
)