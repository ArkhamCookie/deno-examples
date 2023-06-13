#!/bin/sh

if [ ! -e "$1" ]; then
	case "$1" in
		*.js|*.ts) printf "#%s/usr/bin/env -S deno run\n\n" "!" > "$1" ;;
		*) printf "#%s/usr/bin/env -S deno run --ext=js\n\n" "!" > "$1" ;;
	esac
	chmod +x "$1"
	exit 0
fi

case "$1" in
	*.js|*.ts)
		shebang="#!/usr/bin/env -S deno run"
	;;

	*)
		shebang='#!/usr/bin/env -S deno run --ext=js'
	;;
esac

printf "%s\n" 1i "" . w | ed -s "$1"
printf "%s\n" 1i "$shebang" . w | ed -s "$1"
chmod +x "$1" || exit 1
exit 0
