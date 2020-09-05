
const path = require('path');
const fs = require('fs');

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

// generate the mujstest script:
let out = [];
let out2 = [];
let out3 = [];
out.push(`
% mujstest script generated by mk_mupdf_mujstest_script
%
% Run this script using the latest GerHobbelt/mupdf::mujstest tool
`);

pdf_list.forEach((l) => {
	let bnl = path.basename(l);
	let bnln = bnl.replace(/\.pdf$/i, '');
	let lp = path.dirname(l);
if (0)
	out.push(`
% ---------------------------------------------------------------------------------------------------------------
% PDF: ${l}
% dir: ${lp}
% name: ${bnl}
% base: ${bnln}

CD ${ __dirname.replace(/[\\]/g, '/') }

MUTOOL show -o "__mujstest/${lp}/%04d-${bnln}.showT.txt" -b "${l}"  trailer 
MUTOOL show -o "__mujstest/${lp}/%04d-${bnln}.showX.txt" -b "${l}"  xref 
MUTOOL show -o "__mujstest/${lp}/%04d-${bnln}.showP.txt" -b "${l}"  pages

MUTOOL show -o "__mujstest/${lp}/%04d-${bnln}.showA.txt" -b "${l}"  trailer xref pages grep outline js form trailer/pages/*

	`);
	out2.push(`
% ---------------------------------------------------------------------------------------------------------------
% PDF: ${l}
% dir: ${lp}
% name: ${bnl}
% base: ${bnln}

CD ${ __dirname.replace(/[\\]/g, '/') }
% MUTOOL mudraw -o "__mujstest/${lp}/%04d-${bnln}.ocr.html" -s mtf5 -r 150 -x preserve-ligatures,preserve-whitespace,dehyphenate -y l "${l}"

% MUTOOL muconvert -o "__mujstest/${lp}/%04d-${bnln}.convert.pdf" -W 1200 -H 1800 "${l}"

MUTOOL muraster -o "__mujstest/${lp}/%04d-${bnln}.raster.ppm" -s mt -r 150 -P "${l}"

% MUTOOL trace -o "__mujstest/${lp}/%04d-${bnln}.trace.txt" -W 1200 -H 1800 "${l}"

% MUTOOL clean -gggg -D -c -s -AA "${l}" "__mujstest/${lp}/%04d-${bnln}.clean.pdf"

% MUTOOL extract -o "__mujstest/${lp}/%04d-${bnln}.extract." -r "${l}"

% MUTOOL info -o "__mujstest/${lp}/%04d-${bnln}.info.txt" -F -I -M -P -S -X "${l}"

% MUTOOL pages -o "__mujstest/${lp}/%04d-${bnln}.pages.txt" "${l}"

% MUTOOL show -o "__mujstest/${lp}/%04d-${bnln}.show.txt" -b "${l}"  trailer xref pages grep outline js form trailer/pages/*

	`);
	out3.push(`
% ---------------------------------------------------------------------------------------------------------------
% PDF: ${l}
% dir: ${lp}
% name: ${bnl}
% base: ${bnln}

CD ${ __dirname.replace(/[\\]/g, '/') }

MUTOOL muconvert -o "__mujstest/${lp}/%04d-${bnln}.convert.text" -W 1200 -H 1800 "${l}"
MUTOOL muconvert -o "__mujstest/${lp}/%04d-${bnln}.convert.html" -W 1200 -H 1800 "${l}"
MUTOOL muconvert -o "__mujstest/${lp}/%04d-${bnln}.convert.stext" -W 1200 -H 1800 "${l}"
MUTOOL muconvert -o "__mujstest/${lp}/%04d-${bnln}.convert.png" -W 1200 -H 1800 "${l}"

MUTOOL muraster -o "__mujstest/${lp}/%04d-${bnln}.raster.pkm" -s mt -r 150 -P "${l}"

MUTOOL mudraw -o "__mujstest/${lp}/%04d-${bnln}.trace" -s mtf5 -r 150 "${l}"
MUTOOL mudraw -o "__mujstest/${lp}/%04d-${bnln}.txt" -s mtf5 -r 150 "${l}"
MUTOOL mudraw -o "__mujstest/${lp}/%04d-${bnln}.stext" -s mtf5 -r 150 "${l}"
MUTOOL mudraw -o "__mujstest/${lp}/%04d-${bnln}.html" -s mtf5 -r 150 "${l}"
MUTOOL mudraw -o "__mujstest/${lp}/%04d-${bnln}.png" -s mtf5 -r 150 "${l}"

MUTOOL show -o "__mujstest/${lp}/%04d-${bnln}.showT.txt" -b "${l}"  trailer 
MUTOOL show -o "__mujstest/${lp}/%04d-${bnln}.showX.txt" -b "${l}"  xref 
MUTOOL show -o "__mujstest/${lp}/%04d-${bnln}.showP.txt" -b "${l}"  pages
MUTOOL show -o "__mujstest/${lp}/%04d-${bnln}.showG.txt" -b "${l}"  grep
MUTOOL show -o "__mujstest/${lp}/%04d-${bnln}.showO.txt" -b "${l}"  outline
MUTOOL show -o "__mujstest/${lp}/%04d-${bnln}.showJ.txt" -b "${l}"  js
MUTOOL show -o "__mujstest/${lp}/%04d-${bnln}.showF.txt" -b "${l}"  form
MUTOOL show -o "__mujstest/${lp}/%04d-${bnln}.showV.txt" -b "${l}"  trailer/pages/*

	`);
})

fs.writeFileSync('all_pdf_files.mujstest', out.join('\n') + '\n\n\n' + out2.join('\n') + '\n\n\n' + out3.join('\n'), 'utf8');

