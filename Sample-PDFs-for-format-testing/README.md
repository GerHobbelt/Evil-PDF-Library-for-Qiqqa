
# PDF Test Files for Qiqqa R&D

The PDF file repository stored here is for testing various PDF reader libraries and other PDF tools, such as Qiqqa.

The files include PDFs with one or more of these characteristics:

- both small and large file sizes
- documents with > 1K pages (i.e. pagecount > 1000)
- produced by many different generators (TeX, InDesign, Acrobat, Word, PowerPoint, but also many others)
- obscure/irregular page sizes and page orientations
- obscure/irregular fonts
- obscure/irregular spacing (text / word formatting)
- PDF document layers (for image and/or language hiding in multi-purpose documents)
- CAD & geographical drawings (to verify properly *sharp* rendering on screen **and in print**)
- barcodes (to verify properly *sharp* rendering on screen **and in print**)
- PDF/A compliant
- PDF forms
- signatures
- HTTP links and other types of *external links*
- internal links (e.g. from TOC to chapter)
- image-based vs. text-based
- multiple languages (e.g. Russian and English mixed in a single document)
- non-Euro languages (e.g. Chinese)
- annotations of various kinds
- attachments
- cover pages (single & multiple, both non-informational and \[partly] informational) which make *abstract* and *title* extraction hard
- multimedia content, e.g. 3D CAD content and Flash-based movie clips
- rotated text
- rotated pages
- referencing extra font packages
- watermarks
- page bleed and other printer preflight checkmarks which can show up in print-ready/preflight PDFs
- highly suspect links (i.e. PDFs obtained from extremely shady websites, which may contain hack attempts)
- password encryption
- embedded JavaScript (which should never have been allowed as it's a huge security risk -- how do the various tools cope with this?)
- hash collisions (two or more documents producing the same hash)
- ...




## Security Considerations

Note that these PDFs have been grabbed off the Internet (and some of them have been subsequently altered to suit various tests) and some are highly suspect, including Embedded JavaScript.

Make sure to DISABLE JavaScript in your Acrobat Reader and other PDF readers/viewers!

**Cave canem.**

> You have been warned...





# License Disclaimer

The following limitations apply to the usage of these PDF files:

* The copyright of the documents are owned by the original owners (include but not limited to 
  publisher, author, distributor, licensee as applicable)
* We have accessed the document from a openly accessible website at some point and our usage
  of the files are for the purpose of testing the PDF tools we are investigating and the software we have been developing. The 
  content and knowledge disseminated are not relevant to us. To that extent we feel it is
  within the realm of *fair use*.
* This repository should not be considered as a document repository. It is a dump of PDF
  binaries for testing PDF applications.
* If anyone is using these files for getting access to copyrighted content, for consuming the 
  information value of the content, must contact the copyright owner for clarfying the license
  restrictions. 
* Some of these files have been altered as part of some software tests. 
  For anyone who believes (s)he's found some valuable content in here: be aware
  that these files are only used for various software tests and any human-readable data therein 
  may very well have been altered in all sorts of ways that corrupt any potentially correct information that 
  was in the original.
* We do not claim to be author of any of the documents nor claim to any rights of the owners.
* If any owner of the copyrighted material feels the file should not be hosted here, please
  let us know by raising an issue, so that the content can be removed from the repository within 
  the best of our abilities. However, we will not be responsible for any limitations of the GitHub 
  system in maintaining document history.
 