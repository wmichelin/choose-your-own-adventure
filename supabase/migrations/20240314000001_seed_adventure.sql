-- Insert a new adventure
INSERT INTO "Adventure" ("id", "title", "startNodeId", "createdAt", "updatedAt")
VALUES (
    'adventure-2',
    'The Lost Treasure of Atlantis',
    'node-2-1',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
)
ON CONFLICT ("id") DO NOTHING;

-- Insert adventure nodes
INSERT INTO "AdventureNode" ("id", "text", "isEnd", "adventureId", "createdAt", "updatedAt")
VALUES
    ('node-2-1', 'You stand at the edge of a mysterious underwater cave, your diving equipment ready. The entrance glows with an eerie blue light. Do you enter the cave or explore the surrounding coral reef first?', false, 'adventure-2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('node-2-2', 'Inside the cave, you discover ancient Atlantean writing on the walls. The symbols seem to form a map. As you study it, you notice a hidden passage to your left and a staircase leading down to your right.', false, 'adventure-2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('node-2-3', 'The coral reef is teeming with life. Among the colorful fish, you spot a golden trident partially buried in the sand. Nearby, a school of dolphins seems to be trying to get your attention.', false, 'adventure-2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('node-2-4', 'The hidden passage leads to a chamber filled with ancient artifacts. In the center stands a pedestal with a glowing crystal. As you approach, the crystal begins to pulse with energy.', false, 'adventure-2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('node-2-5', 'The staircase descends into darkness. Your flashlight reveals intricate carvings of sea creatures on the walls. The air grows colder as you descend, and you hear the distant sound of rushing water.', false, 'adventure-2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('node-2-6', 'The dolphins lead you to a sunken temple. Its entrance is guarded by two massive stone seahorses. The trident in your hand begins to glow, and the seahorses slowly move aside.', false, 'adventure-2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('node-2-7', 'The crystal''s energy surrounds you, revealing visions of Atlantis in its prime. You see the city''s great library and the location of its most precious treasure - the Heart of the Ocean.', false, 'adventure-2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('node-2-8', 'At the bottom of the staircase, you find yourself in a vast underground chamber. The walls are covered in bioluminescent algae, creating a beautiful display of light. In the center of the chamber lies a massive golden door.', false, 'adventure-2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('node-2-9', 'Inside the temple, you discover the Heart of the Ocean - a massive blue diamond that seems to contain the power of the sea itself. As you reach for it, the room begins to fill with water.', false, 'adventure-2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('node-2-10', 'The golden door opens to reveal the lost treasury of Atlantis. Gold, jewels, and ancient artifacts beyond imagination fill the chamber. But something feels wrong - the air is too still, too quiet.', false, 'adventure-2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('node-2-11', 'You successfully retrieve the Heart of the Ocean and escape the temple. The dolphins help you return to the surface, where you''re hailed as a hero for discovering the lost treasure of Atlantis.', true, 'adventure-2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('node-2-12', 'The treasury was a trap! The door slams shut behind you, and the chamber begins to fill with water. You''ve discovered the treasure, but at what cost?', true, 'adventure-2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('node-2-13', 'The crystal''s energy proves too powerful. You''re transported back in time to ancient Atlantis, where you must find your way back to the present.', true, 'adventure-2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

-- Insert choices
INSERT INTO "Choice" ("id", "text", "nextNodeId", "nodeId", "createdAt", "updatedAt")
VALUES
    ('choice-2-1', 'Enter the cave', 'node-2-2', 'node-2-1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('choice-2-2', 'Explore the coral reef', 'node-2-3', 'node-2-1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('choice-2-3', 'Follow the hidden passage', 'node-2-4', 'node-2-2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('choice-2-4', 'Take the staircase', 'node-2-5', 'node-2-2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('choice-2-5', 'Follow the dolphins', 'node-2-6', 'node-2-3', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('choice-2-6', 'Examine the crystal', 'node-2-7', 'node-2-4', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('choice-2-7', 'Continue descending', 'node-2-8', 'node-2-5', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('choice-2-8', 'Take the Heart of the Ocean', 'node-2-9', 'node-2-6', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('choice-2-9', 'Enter the treasury', 'node-2-10', 'node-2-8', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('choice-2-10', 'Escape with the Heart', 'node-2-11', 'node-2-9', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('choice-2-11', 'Enter the treasury', 'node-2-12', 'node-2-8', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('choice-2-12', 'Touch the crystal', 'node-2-13', 'node-2-7', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING; 