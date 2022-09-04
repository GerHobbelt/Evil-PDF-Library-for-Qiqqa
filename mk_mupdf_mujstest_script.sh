#! /bin/bash
#

pushd $(dirname "$0")                                                    2> /dev/null  > /dev/null

echo "scan directory tree and collect all pdf files..."

#find . -iname '*.pdf' -a ! -ipath '*/__bulktest/*' -a ! -ipath '*/__mujstest/*' -a ! -ipath '*/__unitest/*' 				> all_pdf_files.lst
# list only unique PDF files:
# sort the list SEMI-randomly (for git diffing improvement)
./DirScanner.exe -s -c -r X -o all_pdf_files.lst "*.pdf"

./DirScanner.exe -s -c -o all_pdf_files.RAW.lst "*.pdf"

find Sample-PDFs-for-format-testing/Unicode* -iname '*.pdf' 								| sort > unicode_spec_pdf_files.lst

find Sample-PDFs-for-format-testing/pdfdraw-text-extract-horrors-and-low-quality-files -iname '*.pdf' | sort > text_extract_spec_pdf_files.lst

if test -d /w/SopKonijn/ ; then
	./DirScanner.exe -s -c -r X -o all_pdf_files_on_drive_W.lst "W:/SopKonijn/*.pdf"
fi

if test -d /z/lib/tooling/qiqqa/MuPDF/tests/ ; then
	./DirScanner.exe -s -c -r X -o mupdf_test_files_in_dev_drive_Z.lst "Z:/lib/tooling/qiqqa/MuPDF/tests/*.pdf"
fi

if test -d /y/ ; then
	./DirScanner.exe -s -c -o all_pdf_files_on_test_drive.RAW.lst "Y:/*.pdf"

	./DirScanner.exe -s -c -o -r X all_pdf_files_on_test_drive.lst "Y:/*.pdf"
fi


# determine current base directory, so we can make all these tests relative against the evil-base repo whenever we can:
# this prevents changes showing up in the generated test files ONLY BECAUSE we mounted the test drive on a different drive letter
# (it happens...)

# as we are running bash, which doesn't do native Windows paths, we 'abuse' DirScanner to deliver us the basepath as-is:
BD=$( dirname $( ./DirScanner.exe  -c  "*.sh" | head -1 ) )
echo BD=${BD}

#echo "generate mujstest script..."
node "$( basename "$0" '.sh' ).js" GENSCRIPTS

# now process all test files: remove the abs.path for every file that's situated in the evil-base repo:
for f in *.lst *.tsv ; do
  node "$( basename "$0" '.sh' ).js" MKREL "$f" "${BD}"
done

popd                                                                     2> /dev/null  > /dev/null
