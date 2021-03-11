#! /bin/bash
#

pushd $(dirname "$0")                                                    2> /dev/null  > /dev/null

echo "scan directory tree and collect all pdf files..."
echo > all_pdf_files.lst
##find . -iname '*.pdf' -a ! -ipath '*/__mujstest/*' -a ! -ipath '*/__unitest/*' 				>> all_pdf_files.lst
##find ../base -iname '*.pdf' -a ! -ipath '*/__mujstest/*' -a ! -ipath '*/__unitest/*' 		>> all_pdf_files.lst
find . -iname '*.pdf' -a ! -ipath '*/__bulktest/*' -a ! -ipath '*/__mujstest/*' -a ! -ipath '*/__unitest/*' 				>> all_pdf_files.lst
# sort the list (for git diffing improvement)
cat all_pdf_files.lst | sort | uniq > tmp
mv tmp all_pdf_files.lst

find Sample-PDFs-for-format-testing/Unicode* -iname '*.pdf' 								| sort > unicode_spec_pdf_files.lst

echo "generate mujstest script..."
node "$( basename "$0" '.sh' ).js"

popd                                                                     2> /dev/null  > /dev/null
