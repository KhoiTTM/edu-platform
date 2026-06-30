import os
import glob
import shutil

replacements = {
    "'@/components/dashboard/": "'@/components/administration/dashboard/",
    '"@/components/dashboard/': '"@/components/administration/dashboard/',
    
    "'@/components/parent/": "'@/components/administration/parent/",
    '"@/components/parent/': '"@/components/administration/parent/',

    "'@/components/studio/": "'@/components/administration/studio/",
    '"@/components/studio/': '"@/components/administration/studio/',

    "'@/components/duolingo/": "'@/components/learning/duolingo/",
    '"@/components/duolingo/': '"@/components/learning/duolingo/',

    "'@/components/speaking/": "'@/components/learning/speaking/",
    '"@/components/speaking/': '"@/components/learning/speaking/'
}

directory = "d:/Backups/Projects/edu-platform"
types = ('**/*.ts', '**/*.tsx')

files_grabbed = []
for file_type in types:
    files_grabbed.extend(glob.glob(directory + '/' + file_type, recursive=True))

for file_path in files_grabbed:
    if 'node_modules' in file_path or '.next' in file_path:
        continue

    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    new_content = content
    for old, new in replacements.items():
        if old in new_content:
            new_content = new_content.replace(old, new)
            print(f"Fixed {old} -> {new} in {file_path}")

    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(new_content)

# Clean up .next directory
next_dir = os.path.join(directory, '.next')
if os.path.exists(next_dir):
    shutil.rmtree(next_dir)
    print("Deleted .next directory.")
