#!/bin/bash

# Check if command is provided
if [ -z "$1" ]; then
    echo "Usage: ./migrate.sh [command]"
    echo "Commands:"
    echo "  create [name]  - Create a new migration"
    echo "  up            - Apply all pending migrations"
    echo "  down          - Revert the last migration"
    echo "  status        - Show migration status"
    exit 1
fi

# Get the command
COMMAND=$1

# Create a new migration
if [ "$COMMAND" = "create" ]; then
    if [ -z "$2" ]; then
        echo "Error: Migration name is required"
        echo "Usage: ./migrate.sh create [name]"
        exit 1
    fi
    
    # Create timestamp
    TIMESTAMP=$(date +%Y%m%d%H%M%S)
    NAME=$2
    
    # Create migration file
    MIGRATION_FILE="supabase/migrations/${TIMESTAMP}_${NAME}.sql"
    touch "$MIGRATION_FILE"
    echo "Created migration: $MIGRATION_FILE"
    exit 0
fi

# Apply migrations
if [ "$COMMAND" = "up" ]; then
    echo "Applying migrations..."
    npx supabase db push
    exit 0
fi

# Revert last migration
if [ "$COMMAND" = "down" ]; then
    echo "Reverting last migration..."
    npx supabase db reset
    exit 0
fi

# Show migration status
if [ "$COMMAND" = "status" ]; then
    echo "Migration status:"
    npx supabase db diff
    exit 0
fi

echo "Unknown command: $COMMAND"
exit 1 