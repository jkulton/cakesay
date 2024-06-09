# cakesay

Create an ASCII cake with a message

## How to use

- **Message in URL path**
  - e.g. [https://jkulton-cakesay.web.val.run/Hello!](https://jkulton-cakesay.web.val.run/Hello!)
  - (Most browsers support typing spaces in URL paths, and will encode on submission. This is usually the easiest method.)
- **Message in URL param `m`**
  - e.g. [https://jkulton-cakesay.web.val.run?m=Hello!](https://jkulton-cakesay.web.val.run?m=Hello!)
- **base64 encoded message in URL param `b64`**
  - e.g. [https://jkulton-cakesay.web.val.run?b64=SGVsbG8=](https://jkulton-cakesay.web.val.run?b64=SGVsbG8=)

cakesay returns plain text, so you can use it with basically any HTTP client.

```sh
$ curl 'https://jkulton-cakesay.web.val.run/Hello!'
                          i.
                        .7.
                       .. :v
                      c:  .x
                       i.::
                        :
                       ..i..
                      #MMMMM
                      QM  AM
                      9M  ZM
                      6M  AM
                      2M  @MX#MM@1.
                      OM  tMMMMMMMMMM;
                 .X#MMMM  ;MMMMMMMMMMMMV
             CEMMMMMMMMMU7@MMMMMMMMMMMMM@
       .N@MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
      MMMMMMMMM@@#$BWWB#@@#$WWWQQQWWWWB#MM.
      MM                                ;M.
      $M                                EM
      WMO$@@@@@@@@@@@@@@@@@@@@@@@@@@@@#OMM
      #M                                CM
      MM             Hello!             CM
   .MMMM                                oMMMt
  1MO 6MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM iMM
 .M1  BM                                VM  ,Mt
1M    @M .............................. WM   M6
 MM   .A8OQWWWWWWWWWWWWWWWWWWWWWWWWWWWOAZ2  #M
  MM                                       MM.
   @MMY                                 VMME
     UMMMbi                         i8MMMt
       C@MMMMMbt;;i........i;XQMMMMMMMt
            ;ZMMMMMMMMMMMMMMMM@A;.
```
