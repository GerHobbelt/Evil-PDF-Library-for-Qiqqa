## Problem description

Open any one of these and SumatraPDF takes a long time (almost a minute) to report that any of these is not a valid PDF.

Tested with v3.4.6 (64-bit).

SumatraPDF UI is non-responsive immediately after opening these (by double-click in Windows Explorer and SumatraPDF associated as the default PDF viewer); the UI is reported by Windows (Win10/64) as "Not Responding".
This takes a long time and instead of merely reporting the format error, SumatraPDF then auto-opens the previously viewed (valid) PDF file, which is *undesirable*.

-----------

Context: these PDFs are known broken, containing large swaths of NUL bytes. 

These come off a 16TB disk that's still being recovered by software after a long-and-weird data corruption process occurring as it turns out I was running a *subtly* corrupted Windows 10 install, which was transported over from a flamed-out hardware fatality onto new hardware -- and action of mine I thought I could pull off as I was in a hurry to get a live dev system again -- and which has cost me *dearly* in both time & money as the hardware failure (a once-high-end i7 giving up the ghost in a very odd way, only throwing a tantrum when *booting* the machine and then *apparently* acting normal until you shut down the dev machine. As this is over 8TB test data on a *budget* you can guess what happened: the new hardware was flaky in a different way (Gigabyte board, firmware(?) issue which made it persistently instable and is now promoted to landfill and f\*\*\* the RMA), all of which ultimately uncovered the other issue hiding in the woodwork: a b0rked Windows rig which decided one day to corrupt the 16TB disk NTFS structures *for funzies*. 
One guess which disk was *not* backed up and had been used to gather my PDF test corpus copies with the intent of finally cleaning up those mutated buggers ....
(The moral there: it doesn't always *save* to be *frugal* with your budget.)

The good news there is most non-test-corpus PDFs have made it off unscathed, but this couple are part of a clearly-faulty test corpus part-of-that-disk recovery. Alas. I wanted bad PDFs to sanity-test the software I'm working on; now I've got *loads* of those. *Oodles.* 😇

 


