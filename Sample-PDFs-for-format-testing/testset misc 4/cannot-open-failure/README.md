# What's wrong with these fellas?

These files have file names which cause our MuPDF toolchain (including the bulktest rig and other surroundings) grief, failing to open while being perfectly acceptable content-wise.

These therefor serve as a *filesystem access litmus test*: when the tool/code cannot OPEEN a file, it doesn't matter how good or b0rked it is inside. And we want to be able to *at least* be able to OPEN these files for further inspection -- the idea here is that a user can throw **anything** at us, downloaded from the Internet or otherwise, and we should be *robust* against such input.

## Just In Case: a Note

As an extra measure to ensure that `git` itself doesn't botch the job anywhere, we have included a ZIP file (`cannot-open-failure-collection.zip`) in this directory which contains all the files gathered here. 

When in doubt of the veracity of git's reconstruction of the files on your system, delete the PDFs and extract them from the ZIP file.

## Cave Canem

Be aware there's some very nasty Unicode in here at the filesystem level: stacked accents, non-canonical characters, anything I find that's still accepteed (*legal?*) on NTFS filesystems. Don't know what will happen with these on other file systems. YMMV.

> I haven't included files which include `:` colons and such, which are legal on Unix Ext3/4, but have special meaning on NTFS (those are *Streams*) and cannot be accessed in the usual fashion on Windows.
> 
> This is not a file system flexibility test, but a test for Qiqqa and related tooling to check those tools can all properly access any file that's otherwise accepted on the Windows platform.
> 
