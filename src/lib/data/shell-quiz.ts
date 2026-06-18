/**
 * Shell-quiz question bank.
 *
 * Each question shows a real shell command and asks what it does. Wrong
 * answers are plausible (different but related commands) so the test is
 * actually a knowledge check, not a typo game.
 *
 * Difficulty tiers are roughly:
 *   - 1-7: basics every dev meets in a year
 *   - 8-14: ops / debugging staples
 *   - 15-20: less common but high-leverage
 */
export interface ShellQuestion {
	cmd: string;
	/** Brief context the player sees above the answers. */
	prompt: string;
	options: string[];
	/** Index into `options` for the correct answer. */
	correct: number;
	/** Short note shown after answering — the "ah, that's why" part. */
	explain: string;
}

export const questions: ShellQuestion[] = [
	{
		cmd: 'find . -name "*.log" -delete',
		prompt: 'What does this do?',
		options: [
			'Lists all .log files in the current directory',
			'Deletes every .log file under the current directory, recursively',
			'Moves .log files to a trash folder',
			'Renames .log files with a date suffix'
		],
		correct: 1,
		explain: '`-delete` is a find action — it removes each matching file. No backup, no confirm.'
	},
	{
		cmd: 'grep -rIn "TODO" src/',
		prompt: 'What does this command print?',
		options: [
			'Just file names that contain "TODO"',
			'Each line with "TODO" — file:line:content — across src/, skipping binary files',
			'Only the count of TODOs per file',
			'TODOs in the current directory but not subdirectories'
		],
		correct: 1,
		explain: '`-r` recurses, `-I` skips binaries, `-n` adds line numbers. The default grep output is file:line:content when -n is on.'
	},
	{
		cmd: 'chmod +x deploy.sh',
		prompt: 'What changes about deploy.sh after this?',
		options: [
			'It becomes hidden',
			'It becomes executable for the user, group, and others',
			'It gets ownership transferred to root',
			'It becomes read-only'
		],
		correct: 1,
		explain: '`+x` sets the execute bit for all three classes (u, g, o). If you want only the user, write `chmod u+x`.'
	},
	{
		cmd: 'ps aux | grep node',
		prompt: 'What is the classic gotcha with this command?',
		options: [
			'It silently kills all node processes',
			'The `grep node` process itself shows up in the results',
			'It only works on macOS, not Linux',
			'It needs sudo to see your own processes'
		],
		correct: 1,
		explain: 'The grep matches its own command line in `ps`. Use `pgrep node` or `ps aux | grep "[n]ode"` to dodge it.'
	},
	{
		cmd: 'kill -9 1234',
		prompt: 'What signal is sent and what makes it different?',
		options: [
			'SIGTERM — asks the process to clean up and exit',
			'SIGKILL — the process cannot trap or ignore it; the kernel kills it directly',
			'SIGHUP — used when a terminal disconnects',
			'SIGINT — the same as pressing Ctrl+C'
		],
		correct: 1,
		explain: 'SIGKILL (9) bypasses the process. No cleanup handlers run. Reach for `kill 1234` (SIGTERM) first, -9 as a last resort.'
	},
	{
		cmd: 'df -h',
		prompt: 'What does this report?',
		options: [
			'Each running process and its memory usage',
			'Filesystem disk space — total, used, available — in human units (G, M, K)',
			'Directory sizes for the current path',
			'Just the largest files on disk'
		],
		correct: 1,
		explain: '`df` is filesystems. `du` is directories. `-h` flips both to human-readable units.'
	},
	{
		cmd: 'du -sh ./*',
		prompt: 'What does this show?',
		options: [
			'A summary line per filesystem',
			'The total size of each direct child of the current directory, human-readable',
			'Every file size recursively, one per line',
			'Free disk space in the current directory'
		],
		correct: 1,
		explain: '`-s` is summary (one line per arg), `-h` is human units. Drop `-s` and du recurses into every subdirectory.'
	},
	{
		cmd: 'ln -s /opt/foo ~/bin/foo',
		prompt: 'What does the symlink point to and how?',
		options: [
			'A hard link — both names share the same inode and disk blocks',
			'A symbolic link at ~/bin/foo pointing to /opt/foo; deleting /opt/foo breaks the link',
			'A pipe between the two files',
			'A backup copy of /opt/foo at ~/bin/foo'
		],
		correct: 1,
		explain: 'Without `-s`, ln makes a hard link (same inode). With `-s` you get a symlink that can break if the target moves.'
	},
	{
		cmd: 'find . -type f -mtime -7 | xargs grep -l "ERROR"',
		prompt: 'What is this pipeline returning?',
		options: [
			'All files containing "ERROR", regardless of when modified',
			'Files modified in the last 7 days that contain "ERROR"',
			'Files modified more than 7 days ago that contain "ERROR"',
			'The string "ERROR" with timestamps'
		],
		correct: 1,
		explain: '`mtime -7` means "modified within the last 7 days." `grep -l` prints just filenames containing the match.'
	},
	{
		cmd: "awk -F: '{print $1}' /etc/passwd",
		prompt: 'What does this print?',
		options: [
			'Every user account name (the first colon-separated field of each line)',
			'Just the first line of the file',
			'The shell for each user (the last field)',
			'The user ID for each entry'
		],
		correct: 0,
		explain: '`-F:` sets colon as the field separator. `$1` is the first field — the username in /etc/passwd.'
	},
	{
		cmd: "sed -i.bak 's/foo/bar/g' file.txt",
		prompt: 'After this runs, what exists on disk?',
		options: [
			'Just file.txt, with foo → bar replacements',
			'file.txt with replacements AND file.txt.bak with the original',
			'A backup at file.txt~, original unchanged',
			'Nothing — sed wrote to stdout, not the file'
		],
		correct: 1,
		explain: '`-i.bak` rewrites the file in place and keeps the pre-edit copy at file.txt.bak. macOS sed requires the suffix; GNU sed allows just `-i`.'
	},
	{
		cmd: 'curl -sIL https://example.com',
		prompt: 'What does this output?',
		options: [
			'The HTML body of the page',
			'Just the response headers — silently, following redirects',
			'A measurement of latency only',
			'The TLS certificate chain'
		],
		correct: 1,
		explain: '`-s` silent (no progress meter), `-I` headers only (HEAD request), `-L` follow redirects. Great for "did this URL move?" checks.'
	},
	{
		cmd: 'lsof -i :3000',
		prompt: 'When do you reach for this?',
		options: [
			'To list open files in the /3000 directory',
			'To find which process is listening on (or connected to) port 3000',
			'To check the last 3000 syscalls',
			"To launch a server on port 3000"
		],
		correct: 1,
		explain: 'lsof -i shows network connections. The `:3000` filter narrows to that port. Classic answer to "address already in use".'
	},
	{
		cmd: 'nc -zv example.com 443',
		prompt: 'What does this verify?',
		options: [
			'That your local server is up on port 443',
			'Whether example.com\'s port 443 accepts a TCP connection, without sending any data',
			'The TLS certificate is valid',
			'That DNS resolves correctly'
		],
		correct: 1,
		explain: '`-z` is "zero-I/O mode" — just check the connection. `-v` makes it talk. Cheap firewall/reachability test.'
	},
	{
		cmd: 'git log --oneline --graph --decorate --all',
		prompt: 'What do you get?',
		options: [
			'Just the current branch\'s last 10 commits',
			'A condensed ASCII commit graph across all refs, with branch/tag names',
			'A diff for every commit',
			'A list of authors and counts'
		],
		correct: 1,
		explain: 'Best one-liner for "what is the actual shape of this repo." `--all` includes every ref, `--graph` draws the topology.'
	},
	{
		cmd: 'npm ci',
		prompt: 'How is this different from `npm install`?',
		options: [
			'It only installs dev dependencies',
			'It runs the CI test suite as well',
			'It deletes node_modules and installs exactly what\'s in package-lock.json — fails if lock and package.json disagree',
			'It installs globally instead of locally'
		],
		correct: 2,
		explain: '`ci` is "clean install for CI": deterministic, lockfile-only, faster, refuses to silently update versions. Right thing for build pipelines.'
	},
	{
		cmd: '>&2 echo "deploy failed"',
		prompt: 'What does the `>&2` do?',
		options: [
			'Repeats the echo twice',
			'Redirects the echo output to stderr instead of stdout',
			'Throws away the output entirely',
			'Sends it to a file named 2'
		],
		correct: 1,
		explain: '`>&2` means "redirect to fd 2 (stderr)". Useful when you want logs/errors that pipelines won\'t swallow with `> file`.'
	},
	{
		cmd: 'tail -f app.log | grep --line-buffered ERROR',
		prompt: 'What does `--line-buffered` accomplish?',
		options: [
			'Adds line numbers to the output',
			'Makes grep flush each matching line immediately instead of buffering, so the live tail actually shows up',
			'Limits output to one line per second',
			'Disables grep entirely; the pipe just passes through'
		],
		correct: 1,
		explain: 'By default grep block-buffers when its stdout is a pipe. `--line-buffered` flushes per line — required for live-following pipelines to feel live.'
	},
	{
		cmd: 'ssh -L 5432:localhost:5432 user@db.internal',
		prompt: 'What does this set up?',
		options: [
			'Logs you in as user and opens a shell',
			'Forwards your local port 5432 to db.internal\'s localhost:5432 over SSH — you can `psql -h localhost` from your machine',
			'Copies a file to port 5432 on the remote',
			'Disables port 5432 on the remote'
		],
		correct: 1,
		explain: 'Local port forwarding. Connect to localhost:5432 on your laptop, traffic goes through SSH to the remote\'s localhost:5432. Standard trick for "production database from your terminal."'
	},
	{
		cmd: 'trap "rm -f /tmp/lock" EXIT',
		prompt: 'What does this guarantee?',
		options: [
			'Deletes /tmp/lock immediately',
			'Runs `rm -f /tmp/lock` whenever the current shell or script exits — for any reason, including errors and signals',
			'Creates a watchdog process that runs every minute',
			'Prevents anyone else from creating /tmp/lock'
		],
		correct: 1,
		explain: '`trap ... EXIT` is the bash way to do "finally" — your cleanup runs whether the script succeeded, errored, or was Ctrl-C\'d. Lock-file scripts live or die on this.'
	}
];
