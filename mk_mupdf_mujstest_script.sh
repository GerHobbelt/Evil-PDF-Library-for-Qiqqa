#! /bin/bash
#

pushd $(dirname "$0")                                                    2> /dev/null  > /dev/null

echo "scan directory tree and collect all pdf files..."
echo > all_pdf_files.lst
##find . -iname '*.pdf' -a ! -ipath '*/__mujstest/*' -a ! -ipath '*/__unitest/*' 				>> all_pdf_files.lst
##find ../base -iname '*.pdf' -a ! -ipath '*/__mujstest/*' -a ! -ipath '*/__unitest/*' 		>> all_pdf_files.lst
#find . -iname '*.pdf' -a ! -ipath '*/__bulktest/*' -a ! -ipath '*/__mujstest/*' -a ! -ipath '*/__unitest/*' 				>> all_pdf_files.lst
# list only unique PDF files:
./DirScanner.exe -s -c -r X "*.pdf" 				>> all_pdf_files.lst
# sort the list (for git diffing improvement)
cat all_pdf_files.lst | sort -R > tmp
mv tmp all_pdf_files.lst

find Sample-PDFs-for-format-testing/Unicode* -iname '*.pdf' 								| sort > unicode_spec_pdf_files.lst

#if test -d /w/SopKonijn/ ; then
#	./DirScanner.exe -s -c -r X "W:/SopKonijn/*.pdf" | sort >> all_pdf_files_on_drive_W.lst
#fi
if test -f all_pdf_files_on_drive_W.lst ; then
	cat all_pdf_files_on_drive_W.lst | sort -R > tmp
	mv tmp all_pdf_files_on_drive_W.lst
fi	

#echo "generate mujstest script..."
node "$( basename "$0" '.sh' ).js"

popd                                                                     2> /dev/null  > /dev/null
