/*
  # Rename name to team_name and remove registration_number

  ## Changes
  - Rename `name` column to `team_name`
  - Drop `registration_number` column if it exists
  - Update indexes
*/

-- Drop the old index on name
DROP INDEX IF EXISTS idx_participants_name;

-- Rename name column to team_name
ALTER TABLE participants 
RENAME COLUMN name TO team_name;

-- Drop registration_number column if it exists
ALTER TABLE participants 
DROP COLUMN IF EXISTS registration_number;

-- Create new index on team_name
CREATE INDEX IF NOT EXISTS idx_participants_team_name ON participants(team_name);

-- Update sample data (optional - for existing data)
-- No action needed as the column rename handles this automatically
