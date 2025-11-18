import re 
import os 
import rcssmin 


def compress_css(match):
  return match.group(1) + rcssmin.cssmin(match.group(2)) + match.group(3)


def remove_eof():
  with open(f'build/element-plus-lit.js', 'r') as f:
    content = f.read()
  content = re.sub(
    r'((?:static|const) styles ?= ?[\w$]*`)([^`]*?)(`;)', 
    compress_css,
    content,
  )
  content = re.sub(
    r'(render\(\) ?\{\s*return ?[\w$]*`)([^`]*?)(`;)', 
    lambda match: match.group(0).replace('\n', ''),
    content,
  )
  content = re.sub(r'/\*[\s\S]*?\*/', '', content)
  with open(f'build/element-plus-lit.js', 'w') as f:
    f.write(content)


if __name__ == '__main__':
  os.system('rollup -c')
  
  print('\nremove \\n in build/element-plus-lit.js')
  remove_eof()

  print('\ngenerate dist/element-plus-lit.min.js...')
  os.system('terser build/element-plus-lit.js -o dist/element-plus-lit.min.js -c -m -b')
