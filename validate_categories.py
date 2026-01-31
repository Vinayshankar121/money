
import re

file_path = r'c:\SHASHI\college\subway1\spark2k25-warzone-hub\src\components\data\events.ts'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Extract categories list
cat_match = re.search(r'export const categories: EventCategory\[\] = \[(.*?)\];', content, re.DOTALL)
categories = []
if cat_match:
    raw_cats = cat_match.group(1)
    categories = [c.strip().strip('"').strip("'") for c in raw_cats.split(',')]
    categories = [c for c in categories if c]

print(f"Categories defined: {categories}")

# Extract events
events_block_match = re.search(r'export const events: Event\[\] = \[(.*?)\];', content, re.DOTALL)
if not events_block_match:
    print("Could not find events block")
    exit()

events_block = events_block_match.group(1)

# specific check for 'categories' in events
# This is a bit rough regex parsing
event_entries = events_block.split('},')
for i, entry in enumerate(event_entries):
    id_match = re.search(r'id:\s*["\'](.*?)["\']', entry)
    title_match = re.search(r'title:\s*["\'](.*?)["\']', entry)
    cats_match = re.search(r'categories:\s*\[(.*?)\]', entry, re.DOTALL)
    
    if id_match and cats_match:
        id_val = id_match.group(1)
        title_val = title_match.group(1) if title_match else "Unknown"
        cats_str = cats_match.group(1)
        # Parse list elements
        cats = [c.strip().strip('"').strip("'") for c in cats_str.split(',')]
        cats = [c for c in cats if c]
        
        # Check consistency
        for c in cats:
            if c not in categories:
                print(f"WARNING: Event {id_val} '{title_val}' has category '{c}' NOT in defined categories list!")
                
        # Check for weirdness
        if "Sports" in cats and "Technical Events" in cats:
             print(f"WARNING: Event {id_val} '{title_val}' has both Sports and Technical Events!")

print("Check complete.")
