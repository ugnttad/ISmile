#!/usr/bin/env python3
import sys

file_path = r'FE\src\context\UiPreferencesContext.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace fancy quotes with regular ones
content = content.replace(''', "'")  # Right single quotation mark
content = content.replace(''', "'")  # Left single quotation mark
content = content.replace('"', '"')  # Left double quotation mark
content = content.replace('"', '"')  # Right double quotation mark

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Fixed apostrophes and quotes properly")
