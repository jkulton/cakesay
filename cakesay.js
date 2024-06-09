export default async function(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const encodedMessageParam = url.searchParams.get("b64");
  const messageParam = url.searchParams.get("m");
  const path = url.pathname;
  let cakeMessage;

  if (encodedMessageParam) {
    cakeMessage = atob(encodedMessageParam);
  } else if (messageParam) {
    cakeMessage = messageParam;
  } else if (path !== "/") {
    cakeMessage = decodeURIComponent(path);

    if (cakeMessage[0] === "/") {
      cakeMessage = cakeMessage.slice(1);
    }
  }

  if (path === "/" && !cakeMessage) {
    return new Response(HELP);
  }

  return new Response(generateCake(cakeMessage));
}

function generateLine(text) {
  const start = "      MM ";
  const end = " CM";

  while ((start.length + end.length + text.length) < 42) {
    text = " " + text;

    if ((start.length + end.length + text.length) === 42) {
      break;
    }

    text = text + " ";

    if ((start.length + end.length + text.length) === 42) {
      break;
    }
  }

  return `${start}${text}${end}`;
}

function splitStringToLines(str, maxLineLength) {
  const words = str.trim().split(/\s+/);
  const lines = [];
  let currentLine = "";

  for (const word of words) {
    // if a single word is greater than maxLineLength, we need to split
    // the word across lines
    if (word.length > maxLineLength) {
      if (((maxLineLength - currentLine.length) < 2) && currentLine.length > 0) {
        lines.push(currentLine.trim());
        currentLine = "";
      }

      for (const char of word) {
        let spaceLeft = maxLineLength - currentLine.length;

        if (spaceLeft < 2) {
          if (spaceLeft === 1) currentLine += "-";

          lines.push(currentLine.trim());
          currentLine = char;
        } else {
          currentLine += char;
        }
      }

      currentLine += " ";
      // if the word would cause the line to overflow, we break to a new line
    } else if (word.length + 1 > (maxLineLength - currentLine.length)) {
      lines.push(currentLine.trim());
      currentLine = `${word} `;
      // otherwise, we just append the word and continue
    } else {
      currentLine = `${currentLine}${word} `;
    }
  }

  if (currentLine.length) {
    lines.push(currentLine.trim());
  }

  return lines;
}

function cake(content = "") {
  return `                          i.
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
      #M                                CM${content}
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
`;
}

function generateCake(message) {
  if (!message) { return cake(); }

  const lines = splitStringToLines(message, 24);
  const messageLines = lines.map(x => `\n${generateLine(x)}`).join("");

  return cake(messageLines);
}

const HELP = `                          i.
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
      MM             cakesay            CM
      MM Create an ascii cake w/message CM
      MM                                CM
      MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMCM
      MM                                CM
      MM  Three ways to create a cake:  CM
      MM                                CM
      MM          1. URL path           CM
      MM         /Some Message          CM
      MM                                CM
      MM        2. Query Param "m"      CM
      MM        ?m=Some%20Message       CM
      MM                                CM
      MM  3. Query Param "b64" (base64) CM
      MM          ?b64=SGVsbG8=         CM
      MM                                CM
      MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMCM
      MM                                CM
      MM   Many browsers allow typing   CM
      MM      paths with spaces, so     CM
      MM   Option 1 is often easiest.   CM
      MM                                CM
      MM    The above examples should   CM
      MM     work in any HTTP client    CM
      MM    (cakesay even works with    CM
      MM       client like curl!)       CM
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
`;
