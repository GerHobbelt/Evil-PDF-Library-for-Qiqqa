# Evil-PDF-Library-for-Qiqqa

A Qiqqa Test Library which contains various PDF document samples, etc. collected from live Qiqqa libraries to showcase issues and check regressions in the software.



## Setup / Install

> Because I expect to have more git repositories managing some Qiqqa libraries or other, I had to reckon with `git` behaviour as well: to make sure these git repositories don't bite one another, we have to set them up next to one another in separate git repository root directories as you CANNOT have multiple git repositories share a single directory (say `qiqqa/base/`) as git repo root.
> That's why I did this using [Windows Directory Junctions](https://winaero.com/blog/symbolic-link-in-windows-10/).
> 
> The bit missing that way is the Qiqqa `ocr` directory as that one's shared (by Qiqqa) among all Qiqqa libraries. Alas.
> 

1. We assume you have your Qiqqa 'data directory' located in `D:\Qiqqa\` — fill in your own setup's data path for this one.
2. Open a shell (`cmd`, `powershell` or `bash`) and `cd` to that data directory:
   
       cd D:\Qiqqa\

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

   1. [Open a `cmd` shell in Administrator mode](https://learn-powershell.net/2013/07/16/creating-a-symbolic-link-using-powershell/)
   2. `cd D:\\Qiqqa\\base\\`
   3. Set up two [Directory Junctions](https://winaero.com/blog/symbolic-link-in-windows-10/):
   
          mklink /j INTRANET-EVIL-PDF-SAMPLES-FOR-QIQQA           ..\evil-base\INTRANET-EVIL-PDF-SAMPLES-FOR-QIQQA
          mklink /j INTRANET_E57B9774-4712-430E-93E0-E67433F7DF07 ..\evil-base\INTRANET_E57B9774-4712-430E-93E0-E67433F7DF07

5. Now the library should be available to Qiqqa the next time you start the application.


