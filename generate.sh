#!/bin/bash
protoc --plugin="protoc-gen-ts=C:\Users\welat\Desktop\Project\gignox-webui-beta-001\node_modules\.bin\protoc-gen-ts.cmd" --ts_out="service=true:./src" --js_out="import_style=commonjs,binary:./src"  proto/gigxRR.proto

