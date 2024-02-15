#!/usr/bin/env sh

script_directory=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
proto_folder="$script_directory/proto"
protoc_plugin="$script_directory/protobuf-ts"
out_folder="$script_directory/assembly/proto"

for full_path in "$proto_folder"/*.proto; do
    protoFile=$(basename "$full_path")
    filename="${protoFile%.*}"
    outFile="${filename}.ts"
    echo "Processing $filename..."
    protoc \
        --plugin=protoc-gen-as=$protoc_plugin \
        --proto_path=$proto_folder \
        --as_out=$out_folder \
        --as_opt targetFileName=$outFile \
        $protoFile
done
