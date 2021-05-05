#! /bin/bash
#

pushd $(dirname "$0")                                                    2> /dev/null  > /dev/null

echo "scan directory tree and collect all pdf files..."
#find . -iname '*.pdf' -a ! -ipath '*/__bulktest/*' -a ! -ipath '*/__mujstest/*' -a ! -ipath '*/__unitest/*' 				> all_pdf_files.lst
# list only unique PDF files:
# sort the list SEMI-randomly (for git diffing improvement)
./DirScanner.exe -s -c -r X -o all_pdf_files.lst "*.pdf"

find Sample-PDFs-for-format-testing/Unicode* -iname '*.pdf' 								| sort > unicode_spec_pdf_files.lst

find Sample-PDFs-for-format-testing/pdfdraw-text-extract-horrors-and-low-quality-files -iname '*.pdf' | sort > text_extract_spec_pdf_files.lst

if test -d /w/SopKonijn/ ; then
	./DirScanner.exe -s -c -r X -o all_pdf_files_on_drive_W.lst "W:/SopKonijn/*.pdf"
fi

#echo "generate mujstest script..."
node "$( basename "$0" '.sh' ).js"

popd                                                                     2> /dev/null  > /dev/null
