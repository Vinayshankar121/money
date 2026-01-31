
import re

file_path = r'c:\SHASHI\college\subway1\spark2k25-warzone-hub\src\components\data\events.ts'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Extract defined categories
match = re.search(r'export const categories: EventCategory\[\] = \[(.*?)\];', content, re.DOTALL)
defined_categories = []
if match:
    # parsing simple strings
    defined_categories = [c.strip('"\' ') for c in match.group(1).split(',') if c.strip()]
    
    # Remove "All Events" from check list as it's not on individual events usually
    if "All Events" in defined_categories:
        defined_categories.remove("All Events")

print("Defined categories:", defined_categories)

# Extract event blocks
events_content = re.search(r'export const events: Event\[\] = \[(.*?)\];', content, re.DOTALL).group(1)

# Split reasonably (assuming },\n  { or similar)
# We can just regex find all occurrences of categories: [...]
found_cats = re.findall(r'title:\s*["\'](.*?)["\'].*?categories:\s*\[(.*?)\]', events_content, re.DOTALL)

for title, cats_str in found_cats:
    cats = [c.strip('"\' ') for c in cats_str.split(',') if c.strip()]
    
    # Check 1: Are all cats valid?
    for c in cats:
        if c not in defined_categories:
            print(f"INVALID CAT: Event '{title}' has category '{c}' which is not in defined list!")

    # Check 2: Unrelated combinations?
    # e.g. "Sports" and "Technical Events"
    if "Sports" in cats and len(cats) > 1:
        print(f"INFO: Event '{title}' has Sports + {cats}")
        
    if "Cultural Events" in cats and "Technical Events" in cats:
        print(f"WEIRD: Event '{title}' is both Cultural and Technical")

print("Analysis done.")
