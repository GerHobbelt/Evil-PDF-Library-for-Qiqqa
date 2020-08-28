#! /bin/bash
#

pushd $(dirname "$0")                                                    2> /dev/null  > /dev/null

echo "scan directory tree and collect all pdf files..."
find . -iname '*.pdf' > all_pdf_files.lst

echo "generate mujstest script..."
node "$( basename "$0" '.sh' ).js"

popd                                                                     2> /dev/null  > /dev/null
