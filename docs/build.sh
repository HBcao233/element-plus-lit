npx rollup -c
npx terser docs.js -o docs.min.js -c -m
cat << EOF > index.html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Element Plus Lit</title>
    
    <link rel="stylesheet" href="/docs/src/main.css">
    <script defer type="module" src="/docs/docs.min.js"></script>
</head>
<body>
  <docs-app>
    <docs-route>
  </docs-app>
</body>
</html>
EOF
