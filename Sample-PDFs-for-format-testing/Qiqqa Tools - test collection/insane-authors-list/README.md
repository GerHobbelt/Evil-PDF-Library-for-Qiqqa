# Remarks / Notes

These are all the same publication (PLUS a tiny 'Errata' publication!)

Extra: The `BAD-*.pdf` file exhibits several PDF malformed datums.

The various PDFs aree the 'pre-publication version', the published version and the corrected 'online version' of the same document.

All of these have the "insane author list" which is huge enough to span **multiple pages**, resulting in the Abstract/Introduction only showing up at page 30(!yes! page *thirty*!), which will cause its own bit of havoc with Qiqqa "abstract" extraction heuristics, which, at least up to v83, *assumed* the abstract would be located somewhere in the first 3 pages of a paper. 

> Of course, there's papers with some, ah, expansive "cover sheets" out there, pushing the Abstract/Introduction section to page 4 or a little further (in case of several theses), but this PDF does NOT come with a cover sheet and still takes the cake when it comes to *distance* before we get at the Abstract/Introduction.

This paper also is quite offensively testing text buffers, etc. for citation extraction tools as the author list is so huge. If there's a buffer overflow waiting in there, this one will surely tickle it! :-)

This set also showcases the trouble with ResearchGate PDFs, which are hot-patched by that website to update the number of reads and the 'Downloaded by' watermark, among others, thus killing the SHA1-based uniqueness/de-duplication checks and tests in Qiqqa:
`BAD-*.pdf` and `Autophagy paper.pdf` are the two copies from ResearchGate (both with severe PDF internal trauma BTW re the PDF Outlines, which attempt to cause a stack overflow via a high number of recursive calls in MuPDF when the (erroneous) outline is decoded.

