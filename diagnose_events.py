
import re
import os

file_path = r'c:\SHASHI\college\subway1\spark2k25-warzone-hub\src\components\data\events.ts'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Extract check lists
def extract_list(name):
    match = re.search(rf'export const {name}: .*? = \[(.*?)\];', content, re.DOTALL)
    if match:
        return [c.strip('"\' ') for c in match.group(1).split(',') if c.strip()]
    return []

categories = extract_list("categories")
departments = extract_list("departments")
dateTags = extract_list("dateTags")

print(f"CATEGORIES: {categories}")
print(f"DEPARTMENTS: {departments}")
print(f"DATETAGS: {dateTags}")

# Check overlaps
cat_set = set(categories)
dept_set = set(departments)
date_set = set(dateTags)

print("\n--- Overlap Check ---")
print(f"Cat & Dept Overlap: {cat_set.intersection(dept_set)}")
print(f"Cat & Date Overlap: {cat_set.intersection(date_set)}")

# Extract events
events_block = re.search(r'export const events: Event\[\] = \[(.*?)\];', content, re.DOTALL).group(1)

# Regex to capture event details
# Assuming standard formatting as seen in previous cat
pattern = re.compile(r'id:\s*["\'](.*?)["\'].*?title:\s*["\'](.*?)["\'].*?categories:\s*\[(.*?)\].*?department:\s*["\'](.*?)["\']', re.DOTALL)

# We might need to split by "}," to handle the list iteration better because regex on the whole block might miss things or be greedy
event_items = events_block.split('},')

print("\n--- Event Data Dump ---")
for item in event_items:
    if not item.strip(): continue
    
    # Simple extraction
    id_m = re.search(r'id:\s*["\'](.*?)["\']', item)
    title_m = re.search(r'title:\s*["\'](.*?)["\']', item)
    cats_m = re.search(r'categories:\s*\[(.*?)\]', item, re.DOTALL)
    dept_m = re.search(r'department:\s*["\'](.*?)["\']', item)
    
    if id_m:
        eid = id_m.group(1)
        title = title_m.group(1) if title_m else "NO_TITLE"
        cats_str = cats_m.group(1) if cats_m else ""
        dept = dept_m.group(1) if dept_m else ""
        
        cats = [c.strip('"\' ') for c in cats_str.split(',') if c.strip()]
        
        # Validation
        invalid_cats = [c for c in cats if c not in categories]
        
        print(f"ID: {eid} | Title: {title}")
        print(f"  > Cats: {cats}")
        print(f"  > Dept: {dept}")
        
        if invalid_cats:
            print(f"  [ERROR] Invalid Categories: {invalid_cats}")
            
        # Check if logic would fail
        # Logic: if activeFilter in categories -> filter by cat.
        # If I filter by "Technical Events", this event matches if "Technical Events" in cats.
        
        if "Sports" in cats and "Technical Events" in cats:
            print("  [WARN] Sports AND Technical mixed!")

