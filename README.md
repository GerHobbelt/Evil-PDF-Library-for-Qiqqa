# Evil PDF Library / Corpus for Qiqqa

A Qiqqa Test Library / Test Corpus which contains various PDF document samples, etc. collected from live Qiqqa libraries and elsewhere to showcase issues and check regressions in the software.

This includes coping with PDFs in various states of disarray and broken-ness: some of these files have been corrupted during download or at the originating server.
Several other PDFs have been included which test the reach and stability of the Qiqqa Viewer, Search, Content Extraction, Metadata Extraction and OCR subsystems, due to various quirks and features in a PDF file which the toolchain has to contend with.



# TOC

- [Note for users](#note-for-users)

- [Mode A: Setup / Install for use by Qiqqa as a 'library'](#mode-a-setup--install-for-use-by-qiqqa-as-a-library)

  - [Qiqqa Folder Watch feature <br><sup>to find & import new PDFs into the library</sup>](#qiqqa-folder-watch-feature-to-find--import-new-pdfs-into-the-library)

    - [Directory 1: the 'Z' subdirectory](#directory-1-the-z-subdirectory)
    - [Directory 2: the 'Sample-PDFs-for-format-testing' subdirectory](#directory-2-the-sample-pdfs-for-format-testing-subdirectory)

- [Mode B: Setup / Install for use by Qiqqa as a 'watched folder'](#mode-b-setup--install-for-use-by-qiqqa-as-a-watched-folder)

  - [`git clone`-ing this repo to use it in this mode](#git-clone-ing-this-repo-to-use-it-in-this-mode)

- [Mode C: Setup / Install for other uses](#mode-c-setup--install-for-other-uses)

- [Security Considerations](#security-considerations)

- [License Disclaimer](#license-disclaimer)






























## Note for users

- When fully expanded, including *git submodules*, this corpus will consume somewhere between 0.5 and 1 TByte. Make sure you have that kind of disk space available before starting.

- I (Ger Hobbelt) use a dedicated 1TB SSD drive for this. Running a full test suite can hammer the drive quite prettily (mostly *read access*); when you run scripts or other means to extend the System Tests (done in C#/.NET), *write access* can become a bottleneck, hence a dedicated SSD is strongly advised.
 
- Also consider (when running on Windows or storing this on an NTFS file system, like I do) setting the "compression" attribute for the entire directory tree as many PDFs benefit from the compression. 

  See also https://superuser.com/questions/1136329/ntfs-compression-on-ssd-ups-and-downs if you need a bit of general background on this thing.
 
- **When you expect to run Unit or System Tests with these files, *NTFS compression* is a real boon as it will reduce disk space costs of the resulting output & reference JSON and LOG files _immensely_!**
 
- Personally, I'd rather NOT set "NTFS compression" at *disk level*, but rather go in and set it up for a NTFS directory (and all files and directories therein, per the suggested 'attribute inheritance').

 



## Mode A: Setup / Install for use by Qiqqa as a 'library'

> Because I expect to have more git repositories managing some Qiqqa libraries or other, I had to reckon with `git` behaviour as well: to make sure these git repositories don't bite one another, we have to set them up next to one another in separate git repository root directories as you CANNOT have multiple git repositories share a single directory (say `qiqqa/base/`) as git repo root.
> That's why I did this using [Windows Directory Junctions](https://winaero.com/blog/symbolic-link-in-windows-10/).
> 
> The bit missing that way is the Qiqqa `ocr` directory as that one's shared (by Qiqqa) among all Qiqqa libraries. Alas.
> 

1. We assume you have your Qiqqa 'data directory' located in `D:\Qiqqa\` — fill in your own setup's data path for this one.
2. Open a shell (`cmd`, `powershell` or `bash`) and `cd` to that data directory:
   
       cd /d D:\Qiqqa\

3. Clone this repo into an empty directory, preferrably one that doesn't exist yet. Like this:

       git clone git@github.com:GerHobbelt/Evil-PDF-Library-for-Qiqqa.git evil-base

   You should see something like this as the repo is installed:

        $ git clone git@github.com:GerHobbelt/Evil-PDF-Library-for-Qiqqa.git evil-base
        Cloning into 'evil-base'...
        remote: Enumerating objects: 5, done.
        remote: Counting objects: 100% (5/5), done.
        remote: Compressing objects: 100% (5/5), done.
        remote: Total 5 (delta 0), reused 0 (delta 0), pack-reused 0
        Receiving objects: 100% (5/5), 13.11 KiB | 2.19 MiB/s, done.
    
4. To make the library available to Qiqqa, you can link the data into the qiqqa base directory tree like this:

   1. [Open a `cmd` shell **in Administrator mode**](https://learn-powershell.net/2013/07/16/creating-a-symbolic-link-using-powershell/)
   2. `cd /d D:\\Qiqqa\\base\\`
   3. Set up two [Directory Junctions](https://winaero.com/blog/symbolic-link-in-windows-10/):
   
          mklink /j INTRANET-EVIL-PDF-SAMPLES-FOR-QIQQA           ..\evil-base\INTRANET-EVIL-PDF-SAMPLES-FOR-QIQQA
          mklink /j INTRANET_E57B9774-4712-430E-93E0-E67433F7DF07 ..\evil-base\INTRANET_E57B9774-4712-430E-93E0-E67433F7DF07

      **or** run this batch file which does the same: 

      - **either** from that Administrator `cmd` shell 

            ../evil-base/set-up-directory-junctions-to-qiqqa-base-dir.bat

      - **or** directly from :open_file_folder: Windows Explorer: 
      
            set-up-directory-junctions-to-qiqqa-base-dir.bat

        *click* to select
        ➜ *right mouse click*
        ➜ "Run as Administrator"
        ➜ *click* to run

        > which should result in `cmd` output like this:
        >
        > ```
        > C:\WINDOWS\system32>rem make sure the active current directory is our own:
        > C:\WINDOWS\system32>cd /d D:\Qiqqa\evil-base\
        > 
        > D:\Qiqqa\evil-base>rem go to the Qiqqa data base directory
        > D:\Qiqqa\evil-base>cd ..\base\
        > 
        > D:\Qiqqa\base>mklink /j INTRANET-EVIL-PDF-SAMPLES-FOR-QIQQA           D:\Qiqqa\evil-base\\INTRANET-EVIL-PDF-SAMPLES-FOR-QIQQA
        > Junction created for INTRANET-EVIL-PDF-SAMPLES-FOR-QIQQA <<===>> D:\Qiqqa\evil-base\\INTRANET-EVIL-PDF-SAMPLES-FOR-QIQQA
        > 
        > D:\Qiqqa\base>mklink /j INTRANET_E57B9774-4712-430E-93E0-E67433F7DF07 D:\Qiqqa\evil-base\\INTRANET_E57B9774-4712-430E-93E0-E67433F7DF07
        > Junction created for INTRANET_E57B9774-4712-430E-93E0-E67433F7DF07 <<===>> D:\Qiqqa\evil-base\\INTRANET_E57B9774-4712-430E-93E0-E67433F7DF07
        > 
        > D:\Qiqqa\base>rem when you run this for Windows Explorer by right-mouse --: Run As Administrator,
        > D:\Qiqqa\base>rem you surely would like to ascertain that this thing did what's advertisd on the can.
        > D:\Qiqqa\base>rem Hence wait for user keypress - after heshe's done reviewing the cmd output.
        > D:\Qiqqa\base>pause
        > Press any key to continue . . .
        > ```

5. Now the library should be available to Qiqqa the next time you start the application.


### Qiqqa Folder Watch feature <br><sup>to find & import new PDFs into the library</sup>

When you install this repo as a 'Qiqqa library', there's also plenty PDFs in here which can be 'discovered' using Qiqqa's "**Watch Folder**" library configuration setting:

> **Note**: When this may look a little complicated, you can consider using this repo in "Mode B" style (see below) as a "**Watch Folder**" *only*.



#### Directory 1: the 'Z' subdirectory

> **Purpose**: this directory is included in the 'Qiqqa Library' layout to help test the Qiqqa library recovery mechanisms, which SHOULD discoveer these otherwise "hidden" PDFs too!

The "source PDFs" to be found and imported by Qiqqa are located in the 

```
INTRANET_E57B9774-4712-430E-93E0-E67433F7DF07/documents/Z/
```

directory. In Qiqqa,  you'll have to point the Folder Watcher for this library to that directory to have Qiqqa spot these and import them when it hasn't already. 

> Generally the state of the library as saved in this repo is "already up-to-date". but when you wish to test the Folder Watch feature, you can trigger a hard rescan by deleting the `documents/1/` ..to.. `documents/F/` directories **and** the **INTRANET_E57B9774-4712-430E-93E0-E67433F7DF07/Qiqqa.folder_watcher** file.


#### Directory 2: the 'Sample-PDFs-for-format-testing' subdirectory

> **Purpose**: this directory serves as one of the Qiqqa "Watch Folders".
> 
> Do note that the other (git submodule'd) test corpuses each have their own main/base directory next to this one: those would then be additional "Watch Folders". This helps test Qiqqa with *multiple* Watch folders for a *single* library.


The `Sample-PDFs-for-format-testing` directory has an additional set of source PDFs to feed into Qiqqa for ability and stability testing (how well do the tools cope with the various pieces of crud in there?). 




## Mode B: Setup / Install for use by Qiqqa as a 'watched folder' 

As this test corpus is filled with a lot of crufty PDFs, you are advised NOT to mix these with any *useful* Qiqqa library.

Hence is it advised to create a fresh **new** empty Qiqqa library using the regular Qiqqa UI and then add the directory where you `git clone`d this Test Corpus as a "**Watch folder**" for that specific Qiqqa library. When you do that, Qiqqa will take a little while and then recursively scan this directory tree and add every PDF it finds to your library. Which will then become pretty *huge*.

As usual, report any (fatal) failures occurring in the Qiqqa issue tracker at https://github.com/jimmejardine/qiqqa-open-source/issues.

### `git clone`-ing this repo to use it in this mode

1. Open a shell (`cmd`, `powershell` or `bash`) and `cd` to that 1+TByte store you have:
   
       cd /d G:\

3. Clone this repo into an empty directory, preferrably one that doesn't exist yet. Like this:

       git clone git@github.com:GerHobbelt/Evil-PDF-Library-for-Qiqqa.git qiqqa-corpus

   You should see something like this as the repo is installed:

        $ git clone git@github.com:GerHobbelt/Evil-PDF-Library-for-Qiqqa.git qiqqa-corpus
        Cloning into 'qiqqa-corpus'...
        remote: Enumerating objects: 5, done.
        remote: Counting objects: 100% (5/5), done.
        remote: Compressing objects: 100% (5/5), done.
        remote: Total 5 (delta 0), reused 0 (delta 0), pack-reused 0
        Receiving objects: 100% (5/5), 13.11 KiB | 2.19 MiB/s, done.
   
7. If you wish the *entire* test corpus to be present, you must also clone the *git submodules*. That's most easily done by entering the cloneed directory and then executing `git submodule update --init --recursive` like this:

       cd qiqqa-corpus
       git submodule update --init --recursive
       
   This can take quite a while as all are downloaded...
   
9. Now your test corpus "watch folder" is `G:\qiqqa-corpus\` and ready for use.




## Mode C: Setup / Install for other uses

e.g. for testing [your MuPDF customizations](https://github.com/GerHobbelt/mupdf), etc. 

In that case, this will serve as a generic PDF test set. *MAYBE* you can also use the reference JSON metadata files, etc. in the `TestResults` directory tree, but that depends entirely on your toolchain and what you feel is better for *your* scenarios.

The `*.mujstest` files and `*.js` + `*.sh` scripts in the root directory are my own little toolbox to run this test corpus through [an augmented MuPDF toolchain](https://github.com/GerHobbelt/mupdf) as a production-level acid test: the tools MUST survive any and all contained in this repo.

Anyway, the "*installation procedure*" is eexactly the same as for "Mode B", see above. It's the usual thing when you work with git repositories: `git clone` + `git submodule update --init --recursive` to fetch it all.




## Security Considerations

Note that these PDFs have been grabbed off the Internet (and some of them have been subsequently altered to suit various tests) and some are highly suspect, including Embedded JavaScript. **Do NOT be surprised if your antivirus goes a little nuts over some of these files!**

- As we *know* we're dealing with *weapons* here, my advise is to configure your antivirus to "*ignore*" this entire directory tree to prevent some nasties from getting lost or damaged in undesirable ways. After all, we *want* some evil stuff in here.
 
- Also, DO keep your antivirus active and awake, watching the rest of your test system: after all, you are **testing** these inputs and your own software *MAY* fail to cope *properly* with some of the nasties in here.

- Make sure to DISABLE JavaScript in your Acrobat Reader and other PDF readers/viewers!

**Cave canem.**

> You have been warned...





## License Disclaimer

The following limitations apply to the usage of all the PDF files contained in this repository:

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
 
