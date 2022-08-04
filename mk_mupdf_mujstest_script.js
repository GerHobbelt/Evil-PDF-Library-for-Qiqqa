
const path = require('path');
const fs = require('fs');



function gen_bulktest_scripts() {

	const tsv_banner = `
# \`bulktest -T\` template script data file, generated by mk_mupdf_bulktest_script
#
# Use this data file with the template script(s) for the latest GerHobbelt/mupdf::bulktest tool
#
# ------------------------------------------------------------------------------------
#
# Every line is an argv-cli style record (row), with the following parameters:
#
#     %2 %3 %4 %5 %6
#
# where:
#
# nr.:     %datarow     -- index number of the test record
# PDF:     %1           -- full RELATIVE path to the PDF
# dir:     %2           -- basedir = path part of that
# name:    %3           -- filename = PDF filename part of that one (with .pdf extension)
# base:    %4           -- basename = PDF filename "    "  "    "   (without the .pdf extension)
# cd root: %5           -- path to root of the repo
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

	// generate the bulktest TSV script driver dataset:

	pdf_list = pdf_list.map((l, idx) => {
		let bnl = path.basename(l);
		let bnln = bnl.replace(/\.pdf$/i, '');
		let lp = path.dirname(l).replace(/\.\.\//g, '');
		// CD ${ __dirname.replace(/[\\]/g, '/') }
		let root = __dirname.replace(/[\\]/g, '/');

		//          1:pdf     2:pdfdir   3:pdfname      4:pdfbasename   5:rootdir
		let line = `"${ l}"  "${ lp}"    "${ bnl}"      "${ bnln}"      "${ root}"`;
		return line;
	});



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


	pdf_list = pdf_list.map((l, idx) => {
		let bnl = path.basename(l);
		let bnln = bnl.replace(/\.pdf$/i, '');
		let lp = path.dirname(l).replace(/\.\.\//g, '').replace(/:/g, '');
		// CD ${ __dirname.replace(/[\\]/g, '/') }
		let root = __dirname.replace(/[\\]/g, '/');

		//          2:pdf     3:pdfdir   4:pdfname    5:pdfbasename   6:rootdir
		let line = `"${ l}"  "${ lp}"    "${ bnl}"    "${ bnln}"      "${ root}"`;
		return line;
	});


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

	pdf_list = pdf_list.map((l, idx) => {
		let bnl = path.basename(l);
		let bnln = bnl.replace(/\.pdf$/i, '');
		let lp = path.dirname(l).replace(/\.\.\//g, '');
		// CD ${ __dirname.replace(/[\\]/g, '/') }
		let root = __dirname.replace(/[\\]/g, '/');

		//          2:pdf     3:pdfdir   4:pdfname    5:pdfbasename   6:rootdir
		let line = `"${ l}"  "${ lp}"    "${ bnl}"    "${ bnln}"      "${ root}"`;
		return line;
	});

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

	pdf_list = pdf_list.map((l, idx) => {
		let bnl = path.basename(l);
		let bnln = bnl.replace(/\.pdf$/i, '');
		let lp = path.dirname(l).replace(/\.\.\//g, '');
		// CD ${ __dirname.replace(/[\\]/g, '/') }
		let root = __dirname.replace(/[\\]/g, '/');

		//          2:pdf    3:pdfdir    4:pdfname    5:pdfbasename   6:rootdir
		let line = `"${ l}"  "${ lp}"    "${ bnl}"    "${ bnln}"      "${ root}"`;
		return line;
	});


	fs.writeFileSync('crashing_pdf_files.info-test.tsv', tsv_banner + '\n\n\n' + pdf_list.join('\n') + '\n', 'utf8');



























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

	pdf_list = pdf_list.map((l, idx) => {
		let bnl = path.basename(l);
		let bnln = bnl.replace(/\.pdf$/i, '');
		let lp = path.dirname(l).replace(/\.\.\//g, '');
		// CD ${ __dirname.replace(/[\\]/g, '/') }
		let root = __dirname.replace(/[\\]/g, '/');

		//          2:pdf    3:pdfdir    4:pdfname    5:pdfbasename   6:rootdir
		let line = `"${ l}"  "${ lp}"    "${ bnl}"    "${ bnln}"      "${ root}"`;
		return line;
	});

	fs.writeFileSync('unicode_spec_pdf_files.info-test.tsv', tsv_banner + '\n\n\n' + pdf_list.join('\n') + '\n', 'utf8');































	// load PDF list:
	pdf_list = fs.readFileSync('text_extract_spec_pdf_files.lst', 'utf8')
		.split('\n')
		.map((l) => {
			l = l.trim();
			l = l.replace(/^\.[\/\\]/, '');
			l = l.replace(/[\\]/g, '/');
			return l;
		})
		.filter((l) => !!l);
	//console.log(pdf_list);

	pdf_list = pdf_list.map((l, idx) => {
		let bnl = path.basename(l);
		let bnln = bnl.replace(/\.pdf$/i, '');
		let lp = path.dirname(l).replace(/\.\.\//g, '');
		// CD ${ __dirname.replace(/[\\]/g, '/') }
		let root = __dirname.replace(/[\\]/g, '/');

		//          2:pdf    3:pdfdir    4:pdfname    5:pdfbasename   6:rootdir
		let line = `"${ l}"  "${ lp}"    "${ bnl}"    "${ bnln}"      "${ root}"`;
		return line;
	});

	fs.writeFileSync('text_extract_pdf_files.info-test.tsv', tsv_banner + '\n\n\n' + pdf_list.join('\n') + '\n', 'utf8');


















	if (fs.existsSync('mupdf_test_files_in_dev_drive_Z.lst')) {

	// load PDF list:
	let pdf_list = fs.readFileSync('mupdf_test_files_in_dev_drive_Z.lst', 'utf8')
		.split('\n')
		.map((l) => {
			l = l.trim();
			l = l.replace(/^\.[\/\\]/, '');
			l = l.replace(/[\\]/g, '/');
			return l;
		})
		.filter((l) => !!l);
	//console.log(pdf_list);


	pdf_list = pdf_list.map((l, idx) => {
		let bnl = path.basename(l);
		let bnln = bnl.replace(/\.pdf$/i, '');
		let lp = path.dirname(l).replace(/\.\.\//g, '').replace(/:/g, '');
		// CD ${ __dirname.replace(/[\\]/g, '/') }
		let root = __dirname.replace(/[\\]/g, '/');

		//          2:pdf     3:pdfdir   4:pdfname    5:pdfbasename   6:rootdir
		let line = `"${ l}"  "${ lp}"    "${ bnl}"    "${ bnln}"      "${ root}"`;
		return line;
	});


	fs.writeFileSync('mupdf_test_files_in_dev_drive_Z.info-test.tsv', tsv_banner + '\n\n\n' + pdf_list.join('\n') + '\n', 'utf8');

	}

}
















// console.log(process.argv);

if (process.argv.length < 3) {
	console.error("Missing arguments. Needs MKREL or GENSCRIPTS command.");
	process.exit(1);
}

let cmd = process.argv[2];
let testfilename = process.argv[3];
let basedirname = process.argv[4];

console.log({cmd, testfilename });

if (cmd === "GENSCRIPTS") {
	gen_bulktest_scripts();
}
else if (cmd === "MKREL") {
	let content = fs.readFileSync(testfilename, 'utf8');
	let repl_re = new RegExp( 
		basedirname
		.replace(/\\/g, '[\\\\\\//]')
		.replace(/:/g, '[:]')
	, 'g');
	// console.log({ repl_re });

	let new_content = content
	.replace(repl_re, './');
	
	if (new_content !== content) {
		fs.writeFileSync(testfilename, new_content, 'utf8');
	}
}
else {
	console.error(`Unknown command ${cmd}. Needs MKREL or GENSCRIPTS command.`);
	process.exit(2);
}
