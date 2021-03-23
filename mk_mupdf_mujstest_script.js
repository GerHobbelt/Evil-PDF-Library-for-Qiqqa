
const path = require('path');
const fs = require('fs');


const tsv_banner = `
# \`bulktest -T\` template script data file, generated by mk_mupdf_bulktest_script
#
# Use this data file with the template script(s) for the latest GerHobbelt/mupdf::bulktest tool
#
# ------------------------------------------------------------------------------------
#
# Every line is an argv-cli style record (row), with the following parameters:
#
#     %1 %2 %3 %4 %5 %6
#
# where:
#
# nr.:     %1           -- index number of the test record
# PDF:     %2           -- full RELATIVE path to the PDF
# dir:     %3           -- basedir = path part of that
# name:    %4           -- filename = PDF filename part of that one (with .pdf extension)
# base:    %5           -- basename = PDF filename "    "  "    "   (without the .pdf extension)
# cd root: %6           -- path to root of the repo
`;


// load PDF list:
let pdf_list = fs.readFileSync('all_pdf_files.lst', 'utf8')
	.split('\n')
	.map((l) => {
		l = l.trim();
		l = l.replace(/^\.[\/\\]/, '');
		l = l.replace(/[\\]/g, '/');
		return l;
	})
	.filter((l) => !!l);
//console.log(pdf_list);

// generate the bulktest script:
let out = [];
let out2 = [];
let out3 = [];
out.push(`
% bulktest script generated by mk_mupdf_bulktest_script
%
% Run this script using the latest GerHobbelt/mupdf::bulktest tool
`);

pdf_list = pdf_list.map((l, idx) => {
	let bnl = path.basename(l);
	let bnln = bnl.replace(/\.pdf$/i, '');
	let lp = path.dirname(l).replace(/\.\.\//g, '');
	// CD ${ __dirname.replace(/[\\]/g, '/') }
	let root = __dirname.replace(/[\\]/g, '/');

	//          1:idx     2:pdf   3:pdfdir    4:pdfname    5:pdfbasename   6:rootdir
	let line = `${ idx+1}  "${ l}"  "${ lp}"    "${ bnl}"      "${ bnln}"      "${ root}"`;
	return line;
});



if (0) {
	out.push(`
% ---------------------------------------------------------------------------------------------------------------
% nr.:     %1
% PDF:     %2
% dir:     %3
% name:    %4
% base:    %5
% cd root: %6

% CD %1
CD {SCRIPTDIR}
ECHO T:%1s1

MUTOOL show -o "__bulktest/%3/%5/%04d.showT.txt" -b "%2"  trailer 
MUTOOL show -o "__bulktest/%3/%5/%04d.showX.txt" -b "%2"  xref 
MUTOOL show -o "__bulktest/%3/%5/%04d.showP.txt" -b "%2"  pages

MUTOOL show -o "__bulktest/%3/%5/%04d.showA.txt" -b "%2"  trailer xref pages grep outline js form trailer/* Root/* Root/Metadata 0/* 1/* 2/* 3/* 4/* 5/* 6/* 7/* 8/* 9/* 10/* 11/* 12/* 13/* trailer/Info trailer/Info/Author

	`);

	out2.push(`
% ---------------------------------------------------------------------------------------------------------------
% nr.:     %1
% PDF:     %2
% dir:     %3
% name:    %4
% base:    %5
% cd root: %6

% CD %6
CD {SCRIPTDIR}

ECHO T:%1d1

MUTOOL mudraw -o "__bulktest/%3/%5/%04d.ocr.html" -s mtf5 -r 150 -x preserve-ligatures,preserve-whitespace,dehyphenate -y l -T 3 -P -B 50 "%2"

ECHO T:%1d2

MUTOOL mudraw -o "__bulktest/%3/%5/%04d.txt" -s mtf5 -r 150 -x preserve-ligatures,preserve-whitespace -y l -T 3 -P -B 50 "%2"

ECHO T:%1d3

MUTOOL mudraw -o "__bulktest/%3/%5/%04d.trace" -s mtf5 -r 150 -x preserve-ligatures,preserve-whitespace -y l -T 3 -P -B 50 "%2"

ECHO T:%1d4

MUTOOL mudraw -o "__bulktest/%3/%5/%04d.bbox" -s mtf5 -r 150 -x preserve-ligatures,preserve-whitespace -y l -T 3 -P -B 50 "%2"

ECHO T:%1d5

MUTOOL mudraw -o "__bulktest/%3/%5/%04d.xmltext" -s mtf5 -r 150 -x preserve-ligatures,preserve-whitespace -y l -T 3 -P -B 50 "%2"

ECHO T:%1d6

MUTOOL mudraw -o "__bulktest/%3/%5/%04d.stext" -s mtf5 -r 150 -x preserve-ligatures,preserve-whitespace -y l -T 3 -P -B 50 "%2"

ECHO T:%1d7

MUTOOL mudraw -o "__bulktest/%3/%5/%04d.html" -s mtf5 -r 150 -x preserve-ligatures,preserve-whitespace -y l -T 3 -P -B 50 "%2"

ECHO T:%1d8

MUTOOL mudraw -o "__bulktest/%3/%5/%04d.img.png" -s mtf5 -r 150 -x preserve-ligatures,preserve-whitespace -y l -T 3 -P -B 50 "%2"

ECHO T:%1d9

% MUTOOL mudraw -o "__bulktest/%3/%5/%04d.img.psd" -s mtf5 -r 150 -x preserve-ligatures,preserve-whitespace -y l -T 3 -P -B 50 "%2"

ECHO T:%1c1

MUTOOL muconvert -o "__bulktest/%3/%5.convert.pdf" -W 1200 -H 1800 "%2"

ECHO T:%1r1

MUTOOL muraster -o "__bulktest/%3/%5/%04d.raster.png" -s mt -r 150 -P "%2"

ECHO T:%1t1

MUTOOL trace -o "__bulktest/%3/%5/%04d.trace.txt" -W 1200 -H 1800 "%2"

ECHO T:%1c1

MUTOOL clean -gggg -D -c -s -AA "%2" "__bulktest/%3/%5.clean.pdf"

% ECHO T:%1e1

% MUTOOL extract -o "__bulktest/%3/%5/%04d.extract." -r "%2"

ECHO T:%1h1

MUTOOL info -o "__bulktest/%3/%5/%04d.info.txt" -F -I -M -P -S -X -A -U "%2"

ECHO T:%1p1

MUTOOL pages -o "__bulktest/%3/%5/%04d.pages.txt" "%2"

ECHO T:%1s1

MUTOOL show -o "__bulktest/%3/%5/%04d.show.txt" -b "%2"  trailer xref pages grep outline js form trailer/* Root/* Root/Metadata 0/* 1/* 2/* 3/* 4/* 5/* 6/* 7/* 8/* 9/* 10/* 11/* 12/* 13/* trailer/Info trailer/Info/Author

% ECHO T:%1s2

MUTOOL show -o "__bulktest/%3/%5/%04d.xml-meta.txt" -b "%2"  Root/Metadata 

	`);

	out3.push(`
% ---------------------------------------------------------------------------------------------------------------
% nr.:     %1
% PDF:     %2
% dir:     %3
% name:    %4
% base:    %5
% cd root: %6

% CD %6
CD {SCRIPTDIR}

ECHO T:%1c2

MUTOOL muconvert -o "__bulktest/%3/%5/%04d.convert.text" -W 1200 -H 1800 "%2"
MUTOOL muconvert -o "__bulktest/%3/%5/%04d.convert.html" -W 1200 -H 1800 "%2"
MUTOOL muconvert -o "__bulktest/%3/%5/%04d.convert.stext" -W 1200 -H 1800 "%2"
MUTOOL muconvert -o "__bulktest/%3/%5/%04d.convert.png" -W 1200 -H 1800 "%2"

ECHO T:%1r2

MUTOOL muraster -o "__bulktest/%3/%5/%04d.raster.pkm" -s mt -r 150 -P "%2"

%ECHO T:%1d10

%MUTOOL mudraw -o "__bulktest/%3/%5/%04d.trace" -s mtf5 -r 150 "%2"
%MUTOOL mudraw -o "__bulktest/%3/%5/%04d.txt" -s mtf5 -r 150 "%2"
%MUTOOL mudraw -o "__bulktest/%3/%5/%04d.stext" -s mtf5 -r 150 "%2"
%MUTOOL mudraw -o "__bulktest/%3/%5/%04d.html" -s mtf5 -r 150 "%2"
%MUTOOL mudraw -o "__bulktest/%3/%5/%04d.png" -s mtf5 -r 150 "%2"

ECHO T:%1s3

MUTOOL show -o "__bulktest/%3/%5/%04d.showT.txt" -b "%2"  trailer 
MUTOOL show -o "__bulktest/%3/%5/%04d.showX.txt" -b "%2"  xref 
MUTOOL show -o "__bulktest/%3/%5/%04d.showP.txt" -b "%2"  pages
MUTOOL show -o "__bulktest/%3/%5/%04d.showG.txt" -b "%2"  grep
MUTOOL show -o "__bulktest/%3/%5/%04d.showO.txt" -b "%2"  outline
MUTOOL show -o "__bulktest/%3/%5/%04d.showJ.txt" -b "%2"  js
MUTOOL show -o "__bulktest/%3/%5/%04d.showA.txt" -b "%2"  trailer/Info
MUTOOL show -o "__bulktest/%3/%5/%04d.showL.txt" -b "%2"  Root/Pages/*

	`);
}	

	out2.push(`
% ---------------------------------------------------------------------------------------------------------------
% nr.:     %1
% PDF:     %2
% dir:     %3
% name:    %4
% base:    %5
% cd root: %6

% CD %6
CD {SCRIPTDIR}

ECHO T:%1h1

MUTOOL metadump -o "__bulktest/%3/%5.info.json" "%2"

MUTOOL qiqqa_fingerprint0 -o "__bulktest/%3/%5.qhash1.txt" "%2"

MUTOOL qiqqa_fingerprint1 -o "__bulktest/%3/%5.qhash2.txt" "%2"

MUTOOL muconvert -o "__bulktest/%3/%5.W1200H1800.convert.html" -W 1200 -H 1800 -O preserve-ligatures,preserve-whitespace,preserve-spans "%2"

MUTOOL muconvert -o "__bulktest/%3/%5.R300.convert.html" -r 300 -O preserve-ligatures,preserve-whitespace,preserve-spans "%2"

MUTOOL muconvert -o "__bulktest/%3/%5.DFLT.convert.html" -O preserve-ligatures,preserve-whitespace,preserve-spans "%2"

MUTOOL muraster -o "__bulktest/%3/%5.raster.R300.####.png" -s mt -r 300 -P "%2"

MUTOOL muraster -o "__bulktest/%3/%5.raster.DFLT.####.png" -s mt -P "%2"

MUTOOL mudraw -o "__bulktest/%3/%5.draw.R300.####.png" -s mtf5 -r 300 -y l -P -B 50 "%2"

MUTOOL mudraw -o "__bulktest/%3/%5.draw.DFLT.####.png" -s mtf5 -y l -P -B 50 "%2"

MUTOOL mudraw -o "__bulktest/%3/%5.draw.R300.ocr.html" -s mtf5 -r 300 -x preserve-ligatures,preserve-whitespace,preserve-spans -y l -P -B 50 "%2"

MUTOOL mudraw -o "__bulktest/%3/%5.draw.DFLT.ocr.html" -s mtf5 -x preserve-ligatures,preserve-whitespace,preserve-spans -y l -P -B 50 "%2"

	`);



fs.writeFileSync('all_pdf_files.info-test.bulktest', out.join('\n') + '\n\n\n' + out2.join('\n') + '\n\n\n' + out3.join('\n'), 'utf8');
fs.writeFileSync('all_pdf_files.info-test.tsv', tsv_banner + '\n\n\n' + pdf_list.join('\n') + '\n', 'utf8');
































if (fs.existsSync('all_pdf_files_on_drive_W.lst')) {

// load PDF list:
let pdf_list = fs.readFileSync('all_pdf_files_on_drive_W.lst', 'utf8')
	.split('\n')
	.map((l) => {
		l = l.trim();
		l = l.replace(/^\.[\/\\]/, '');
		l = l.replace(/[\\]/g, '/');
		return l;
	})
	.filter((l) => !!l);
//console.log(pdf_list);

// generate the bulktest script:
let out = [];
let out2 = [];
let out3 = [];
out.push(`
% bulktest script generated by mk_mupdf_bulktest_script
%
% Run this script using the latest GerHobbelt/mupdf::bulktest tool
`);

pdf_list = pdf_list.map((l, idx) => {
	let bnl = path.basename(l);
	let bnln = bnl.replace(/\.pdf$/i, '');
	let lp = path.dirname(l).replace(/\.\.\//g, '').replace(/:/g, '');
	// CD ${ __dirname.replace(/[\\]/g, '/') }
	let root = __dirname.replace(/[\\]/g, '/');

	//          1:idx     2:pdf   3:pdfdir    4:pdfname    5:pdfbasename   6:rootdir
	let line = `${ idx+1}  "${ l}"  "${ lp}"    "${ bnl}"      "${ bnln}"      "${ root}"`;
	return line;
});



	out2.push(`
% ---------------------------------------------------------------------------------------------------------------
% nr.:     %1
% PDF:     %2
% dir:     %3
% name:    %4
% base:    %5
% cd root: %6

% CD %6
CD {SCRIPTDIR}

ECHO T:%1h1

MUTOOL metadump -o "__bulktest/%3/%5.info.json" "%2"

MUTOOL qiqqa_fingerprint0 -o "__bulktest/%3/%5.qhash1.txt" "%2"

MUTOOL qiqqa_fingerprint1 -o "__bulktest/%3/%5.qhash2.txt" "%2"

MUTOOL muconvert -o "__bulktest/%3/%5.W1200H1800.convert.html" -W 1200 -H 1800 -O preserve-ligatures,preserve-whitespace,preserve-spans "%2"

MUTOOL muconvert -o "__bulktest/%3/%5.R300.convert.html" -r 300 -O preserve-ligatures,preserve-whitespace,preserve-spans "%2"

MUTOOL muconvert -o "__bulktest/%3/%5.DFLT.convert.html" -O preserve-ligatures,preserve-whitespace,preserve-spans "%2"

MUTOOL muraster -o "__bulktest/%3/%5.raster.R300.####.png" -s mt -r 300 -P "%2"

MUTOOL muraster -o "__bulktest/%3/%5.raster.DFLT.####.png" -s mt -P "%2"

MUTOOL mudraw -o "__bulktest/%3/%5.draw.R300.####.png" -s mtf5 -r 300 -y l -P -B 50 "%2"

MUTOOL mudraw -o "__bulktest/%3/%5.draw.DFLT.####.png" -s mtf5 -y l -P -B 50 "%2"

MUTOOL mudraw -o "__bulktest/%3/%5.draw.R300.ocr.html" -s mtf5 -r 300 -x preserve-ligatures,preserve-whitespace,preserve-spans -y l -P -B 50 "%2"

MUTOOL mudraw -o "__bulktest/%3/%5.draw.DFLT.ocr.html" -s mtf5 -x preserve-ligatures,preserve-whitespace,preserve-spans -y l -P -B 50 "%2"

	`);



fs.writeFileSync('all_pdf_files_on_drive_W.info-test.bulktest', out.join('\n') + '\n\n\n' + out2.join('\n') + '\n\n\n' + out3.join('\n'), 'utf8');
fs.writeFileSync('all_pdf_files_on_drive_W.info-test.tsv', tsv_banner + '\n\n\n' + pdf_list.join('\n') + '\n', 'utf8');

}





























// load PDF list:
pdf_list = fs.readFileSync('unicode_spec_pdf_files.lst', 'utf8')
	.split('\n')
	.map((l) => {
		l = l.trim();
		l = l.replace(/^\.[\/\\]/, '');
		l = l.replace(/[\\]/g, '/');
		return l;
	})
	.filter((l) => !!l);
//console.log(pdf_list);

// generate the bulktest script:
out = [];
out2 = [];
out3 = [];
out.push(`
% bulktest script generated by mk_mupdf_bulktest_script
%
% Run this script using the latest GerHobbelt/mupdf::bulktest tool
`);

pdf_list = pdf_list.map((l, idx) => {
	let bnl = path.basename(l);
	let bnln = bnl.replace(/\.pdf$/i, '');
	let lp = path.dirname(l).replace(/\.\.\//g, '');
	// CD ${ __dirname.replace(/[\\]/g, '/') }
	let root = __dirname.replace(/[\\]/g, '/');

	//          1:idx     2:pdf   3:pdfdir    4:pdfname    5:pdfbasename   6:rootdir
	let line = `${ idx+1}  "${ l}"  "${ lp}"    "${ bnl}"      "${ bnln}"      "${ root}"`;
	return line;
});

	out2.push(`
% ---------------------------------------------------------------------------------------------------------------
% nr.:     %1
% PDF:     %2
% dir:     %3
% name:    %4
% base:    %5
% cd root: %6

% CD %6
CD {SCRIPTDIR}

MUTOOL mudraw -o "__unitest/%3/%5/%04d.ocr.html" -s mtf5 -r 150 -x preserve-ligatures,preserve-whitespace,dehyphenate -y l -T 3 -P -B 50 "%2"

MUTOOL mudraw -o "__unitest/%3/%5/%04d.txt" -s mtf5 -r 150 -x preserve-ligatures,preserve-whitespace -y l -T 3 -P -B 50 "%2"

MUTOOL mudraw -o "__unitest/%3/%5/%04d.stext" -s mtf5 -r 150 -x preserve-ligatures,preserve-whitespace -y l -T 3 -P -B 50 "%2"

MUTOOL mudraw -o "__unitest/%3/%5/%04d.png" -s mtf5 -r 150 -x preserve-ligatures,preserve-whitespace -y l -T 3 -P -B 50 "%2"

% MUTOOL muconvert -o "__unitest/%3/%5.convert.pdf" -W 1200 -H 1800 "%2"

MUTOOL muraster -F ppm -o "__unitest/%3/%5/%04d.raster.png" -s mt -r 150 -P "%2"

% MUTOOL trace -o "__unitest/%3/%5/%04d.trace.txt" -W 1200 -H 1800 "%2"

% MUTOOL clean -gggg -D -c -s -AA "%2" "__unitest/%3/%5.clean.pdf"

% MUTOOL extract -o "__unitest/%3/%5.extract." -r "%2"

MUTOOL info -o "__unitest/%3/%5/%04d.info.txt" -F -I -M -P -S -X -A -U "%2"

MUTOOL pages -o "__unitest/%3/%5/%04d.pages.txt" "%2"

MUTOOL show -o "__unitest/%3/%5/%04d.show.txt" -b "%2"  trailer xref pages grep outline js form trailer/* Root/* Root/Metadata 0/* 1/* 2/* 3/* 4/* 5/* 6/* 7/* 8/* 9/* 10/* 11/* 12/* 13/* trailer/Info trailer/Info/Author

	`);


fs.writeFileSync('unicode_spec_pdf_files.bulktest', out.join('\n') + '\n\n\n' + out2.join('\n') + '\n\n\n' + out3.join('\n'), 'utf8');
fs.writeFileSync('unicode_spec_pdf_files.info-test.tsv', tsv_banner + '\n\n\n' + pdf_list.join('\n') + '\n', 'utf8');































// load PDF list:
pdf_list = fs.readFileSync('crashing_pdf_files.lst', 'utf8')
	.split('\n')
	.map((l) => {
		l = l.trim();
		l = l.replace(/^\.[\/\\]/, '');
		l = l.replace(/[\\]/g, '/');
		return l;
	})
	.filter((l) => !!l);
//console.log(pdf_list);

// generate the bulktest script:
out = [];
out2 = [];
out3 = [];
out.push(`
% bulktest script generated by mk_mupdf_bulktest_script
%
% Run this script using the latest GerHobbelt/mupdf::bulktest tool
`);

pdf_list = pdf_list.map((l, idx) => {
	let bnl = path.basename(l);
	let bnln = bnl.replace(/\.pdf$/i, '');
	let lp = path.dirname(l).replace(/\.\.\//g, '');
	// CD ${ __dirname.replace(/[\\]/g, '/') }
	let root = __dirname.replace(/[\\]/g, '/');

	//          1:idx     2:pdf   3:pdfdir    4:pdfname    5:pdfbasename   6:rootdir
	let line = `${ idx+1}  "${ l}"  "${ lp}"    "${ bnl}"      "${ bnln}"      "${ root}"`;
	return line;
});


	out2.push(`
% ---------------------------------------------------------------------------------------------------------------
% nr.:     %1
% PDF:     %2
% dir:     %3
% name:    %4
% base:    %5
% cd root: %6

% CD %6
CD {SCRIPTDIR}

MUTOOL mudraw -o "__bulktest/CrashingFiles-T1/%3/%5/%04d-x150.ocr.html" -s mtf5 -r 150 -x preserve-ligatures,preserve-whitespace,dehyphenate -y l -T 3 -P -B 50 "%2"

MUTOOL mudraw -o "__bulktest/CrashingFiles-T1/%3/%5/%04d-x72.ocr.html" -s mtf5 -x preserve-ligatures,preserve-whitespace,dehyphenate -y l "%2"

MUTOOL mudraw -o "__bulktest/CrashingFiles-T1/%3/%5/%04d.txt" -s mtf5 -r 150 -x preserve-ligatures,preserve-whitespace -y l -T 3 -P -B 50 "%2"

MUTOOL mudraw -o "__bulktest/CrashingFiles-T1/%3/%5/%04d.stext" -s mtf5 -r 150 -x preserve-ligatures,preserve-whitespace -y l -T 3 -P -B 50 "%2"

MUTOOL mudraw -o "__bulktest/CrashingFiles-T1/%3/%5/%04d.png" -s mtf5 -r 150 -x preserve-ligatures,preserve-whitespace -y l -T 3 -P -B 50 "%2"

% MUTOOL muconvert -o "__bulktest/CrashingFiles-T1/%3/%5.convert.pdf" -W 1200 -H 1800 "%2"

MUTOOL muraster -F ppm -o "__bulktest/CrashingFiles-T1/%3/%5/%04d.raster.png" -s mt -r 150 -P "%2"

% MUTOOL trace -o "__bulktest/CrashingFiles-T1/%3/%5/%04d.trace.txt" -W 1200 -H 1800 "%2"

MUTOOL clean -gggg -D -c -s -AA "%2" "__bulktest/CrashingFiles-T1/%3/%5.clean.pdf"

% MUTOOL extract -o "__bulktest/CrashingFiles-T1/%3/%5.extract." -r "%2"

MUTOOL info -o "__bulktest/CrashingFiles-T1/%3/%5/%04d.info.txt" -F -I -M -P -S -X -A -U "%2"

MUTOOL pages -o "__bulktest/CrashingFiles-T1/%3/%5/%04d.pages.txt" "%2"

MUTOOL show -o "__bulktest/CrashingFiles-T1/%3/%5/%04d.show.txt" -b "%2"  trailer xref pages grep outline js form trailer/* Root/* Root/Metadata 0/* 1/* 2/* 3/* 4/* 5/* 6/* 7/* 8/* 9/* 10/* 11/* 12/* 13/* trailer/Info trailer/Info/Author

MUTOOL mudraw -o "__bulktest/CrashingFiles-T1/%3/%5/%04d-x300.ocr.html" -s mtf5 -r 300 -y l -T 3 -P -B 50 "%2"

MUTOOL mudraw -o "__bulktest/CrashingFiles-T1/%3/%5/%04d-x300.txt" -s mtf5 -r 300 -y l -T 3 -P -B 50 "%2"

MUTOOL mudraw -o "__bulktest/CrashingFiles-T1/%3/%5/%04d-x300.trace" -s mtf5 -r 300 -y l -T 3 -P -B 50 "%2"

MUTOOL mudraw -o "__bulktest/CrashingFiles-T1/%3/%5/%04d-x300.bbox" -s mtf5 -r 300 -y l -T 3 -P -B 50 "%2"

MUTOOL mudraw -o "__bulktest/CrashingFiles-T1/%3/%5/%04d-x300.xmltext" -s mtf5 -r 300 -y l -T 3 -P -B 50 "%2"

MUTOOL mudraw -o "__bulktest/CrashingFiles-T1/%3/%5/%04d-x300.stext" -s mtf5 -r 300 -y l -T 3 -P -B 50 "%2"

MUTOOL mudraw -o "__bulktest/CrashingFiles-T1/%3/%5/%04d-x300.html" -s mtf5 -r 300 -y l -T 3 -P -B 50 "%2"

MUTOOL mudraw -o "__bulktest/CrashingFiles-T1/%3/%5/%04d-x300.img.png" -s mtf5 -r 300 -y l -T 3 -P -B 50 "%2"

% MUTOOL mudraw -o "__bulktest/CrashingFiles-T1/%3/%5/%04d-x300.img.psd" -s mtf5 -r 300 -x preserve-ligatures,preserve-whitespace -y l -T 3 -P -B 50 "%2"

MUTOOL show -o "__bulktest/CrashingFiles-T1/%3/%5/%04d.xml-meta.txt" -b "%2"  Root/Metadata 

	`);


fs.writeFileSync('crashing_pdf_files.bulktest', out.join('\n') + '\n\n\n' + out2.join('\n') + '\n\n\n' + out3.join('\n'), 'utf8');
fs.writeFileSync('crashing_pdf_files.info-test.tsv', tsv_banner + '\n\n\n' + pdf_list.join('\n') + '\n', 'utf8');

