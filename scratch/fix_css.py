with open('src/index.css', 'r', encoding='utf-8') as f:
    lines = f.readlines()
with open('src/index.css', 'w', encoding='utf-8') as f:
    f.writelines(lines[:695])
