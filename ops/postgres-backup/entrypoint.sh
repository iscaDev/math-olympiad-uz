#!/bin/sh
set -eu

if [ "${RESTORE_TEST:-0}" = "1" ]; then
  exec /usr/local/bin/restore-test.sh
fi
exec /usr/local/bin/backup.sh
