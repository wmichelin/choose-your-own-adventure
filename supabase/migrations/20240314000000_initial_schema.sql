-- Create Adventure table
CREATE TABLE IF NOT EXISTS "Adventure" (
    "id" TEXT PRIMARY KEY,
    "title" TEXT NOT NULL,
    "startNodeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create AdventureNode table
CREATE TABLE IF NOT EXISTS "AdventureNode" (
    "id" TEXT PRIMARY KEY,
    "text" TEXT NOT NULL,
    "isEnd" BOOLEAN NOT NULL DEFAULT false,
    "adventureId" TEXT NOT NULL REFERENCES "Adventure"("id") ON DELETE CASCADE,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Choice table
CREATE TABLE IF NOT EXISTS "Choice" (
    "id" TEXT PRIMARY KEY,
    "text" TEXT NOT NULL,
    "nextNodeId" TEXT NOT NULL,
    "nodeId" TEXT NOT NULL REFERENCES "AdventureNode"("id") ON DELETE CASCADE,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers to all tables if they don't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'update_adventure_updated_at'
    ) THEN
        CREATE TRIGGER update_adventure_updated_at
            BEFORE UPDATE ON "Adventure"
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'update_adventure_node_updated_at'
    ) THEN
        CREATE TRIGGER update_adventure_node_updated_at
            BEFORE UPDATE ON "AdventureNode"
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'update_choice_updated_at'
    ) THEN
        CREATE TRIGGER update_choice_updated_at
            BEFORE UPDATE ON "Choice"
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

-- Enable RLS (Row Level Security) policies if not already enabled
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_tables 
        WHERE tablename = 'Adventure' 
        AND rowsecurity = true
    ) THEN
        ALTER TABLE "Adventure" ENABLE ROW LEVEL SECURITY;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_tables 
        WHERE tablename = 'AdventureNode' 
        AND rowsecurity = true
    ) THEN
        ALTER TABLE "AdventureNode" ENABLE ROW LEVEL SECURITY;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_tables 
        WHERE tablename = 'Choice' 
        AND rowsecurity = true
    ) THEN
        ALTER TABLE "Choice" ENABLE ROW LEVEL SECURITY;
    END IF;
END $$;

-- Create policies for public read access if they don't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'Adventure' 
        AND policyname = 'Allow public read access on Adventure'
    ) THEN
        CREATE POLICY "Allow public read access on Adventure"
            ON "Adventure" FOR SELECT
            USING (true);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'AdventureNode' 
        AND policyname = 'Allow public read access on AdventureNode'
    ) THEN
        CREATE POLICY "Allow public read access on AdventureNode"
            ON "AdventureNode" FOR SELECT
            USING (true);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'Choice' 
        AND policyname = 'Allow public read access on Choice'
    ) THEN
        CREATE POLICY "Allow public read access on Choice"
            ON "Choice" FOR SELECT
            USING (true);
    END IF;
END $$; 