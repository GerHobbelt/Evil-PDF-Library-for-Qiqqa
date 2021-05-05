#! /bin/bash
# 
# As Github LFS storage is limited to 500M for free accounts and 2GB for commercial non-enterprise, 
# this is the way to archive larger binary files in a git repo when you have some.
# 

wd="$( pwd )";

pushd $( dirname "$0" )                                                                                     2> /dev/null  > /dev/null
scriptdir="$( pwd )";

# return to intended processing root directory
cd "$wd"



if test "$#" -eq 2; then
	echo ""
	echo ""
    # execute subcommand CMD ARG
    if test "$1" == "SPLIT"; then
    	echo "split $2"
    	echo ""
    	if ! test -f "$2.7z.001" ; then
	    	echo 7z a -v40m -mx1 -- "$2.7z" "$2"
	    	7z a -v40m -mx1 -- "$2.7z" "$2"
	    else
	    	echo "7ZIP split archive already exists for '$2'"
	    fi
		node "$scriptdir/update_gitignore_for_large_files.js" "$2"
    elif test "$1" == "UNSPLIT"; then
    	echo "UNsplit $2"
    	echo ""
    	d=$( dirname -- "$2" )
    	pushd "$d" 											 > /dev/null 2>&1
    	s=$( basename -- "$2" )
    	t=$( basename -- "$2" ".7z.001" )
    	if ! test -f "$t" ; then
	    	echo 7z e -- "$s"
	    	7z e -- "$s"
	    else
	    	echo "Large target file '$t' already exists in '$d/'"
	    fi
    	popd     											 > /dev/null 2>&1
		node "$scriptdir/update_gitignore_for_large_files.js" "$d/$t"
    else
    	echo "unknown subcommand."
    fi
else
	find . -type f -size +45M -a ! -ipath '*.git/*' -a ! -ipath './__mujstest/*' -a ! -ipath './__unitest/*' -a ! -ipath './__bulktest/*' -a ! -iname '*.log' -a ! -iname '*.[tc]sv' -print0 | xargs -0 -n 1 "$0" SPLIT
fi


popd                                                                                                    2> /dev/null  > /dev/null
