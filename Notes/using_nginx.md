# Notes on using nginx

## Check if nginx is running

Use:

```tasklist /FI "IMAGENAME eq nginx.exe"```

If nginx is running, this will give output similar to

```
Image Name                     PID Session Name        Session#    Mem Usage
========================= ======== ================ =========== ============
nginx.exe                    17316 Console                    3      7,900 K
nginx.exe                     9828 Console                    3      8,364 K
```

## Location of exe file on local machine

```C:\nginx-1.18.0```

## Stopping nginx

This ought to work...

```
C:\nginx-1.18.0\nginx -s stop
```

but...

**Gives an error and does not work!**

```
nginx: [alert] could not open error log file: CreateFile() "logs/error.log" failed (3: The system cannot find the path specified)
2021/01/15 13:00:36 [emerg] 10832#15472: CreateFile() "C:\Users\MartinVaughan\Documents\Development\GI Platform\Edease.github.io/conf/nginx.conf" failed (3: The system cannot find the path specified)
```

