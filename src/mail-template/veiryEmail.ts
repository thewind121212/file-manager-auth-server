
export function verifyEmailComposer(email: string, token: string) {

  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>JS Bin</title>
  </head>
  <body style="background-color: #f2f5f8">
    <div style="max-width: 700px; margin: 0 auto">
      <table
        align="center"
        role="presentation"
        cellspacing="0"
        cellpadding="0"
        border="0"
        width="100%"
        style="margin: auto"
      >
        <tbody>
          <tr>
            <td>
              <table
                align="center"
                role="presentation"
                cellspacing="0"
                cellpadding="0"
                border="0"
                width="100%"
                style="margin: auto"
              >
                <tbody>
                  <tr>
                    <td style="padding: 30px 0; text-align: center"></td>
                  </tr>
                  <tr>
                    <td
                      style="
                        height: 4px;
                        text-align: center;
                        background: rgb(255, 122, 89);
                        --darkreader-inline-bgimage: initial;
                        --darkreader-inline-bgcolor: #971e00;
                      "
                      data-darkreader-inline-bgimage=""
                      data-darkreader-inline-bgcolor=""
                    ></td>
                  </tr>
                  <tr>
                    <td
                      style="
                        background: rgb(255, 255, 255);
                        width: 100%;
                        padding: 40px 0;
                        min-width: 100%;
                        color: rgb(255, 255, 255);
                        --darkreader-inline-bgimage: initial;
                        --darkreader-inline-bgcolor: #181a1b;
                        --darkreader-inline-color: #e8e6e3;
                      "
                      data-darkreader-inline-bgimage=""
                      data-darkreader-inline-bgcolor=""
                      data-darkreader-inline-color=""
                    >
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/static-only-2ff95.appspot.com/o/UI%2Ftransparent_output%20(1).png?alt=media&token=44c61bbf-8e9c-4f0d-b73a-1e9c8dd68c55"
                        width="120"
                        height=""
                        alt="alt_text"
                        border="0"
                        style="
                          height: auto;
                          font-family: sans-serif;
                          font-size: 15px;
                          line-height: 15px;
                          color: rgb(85, 85, 85);
                          margin: auto;
                          display: block;
                          --darkreader-inline-color: #b2aca2;
                        "
                        class="CToWUd"
                        data-bit="iit"
                        data-darkreader-inline-color=""
                      />
                    </td>
                  </tr>
                  <tr>
                    <td
                      style="
                        height: 1px;
                        background: rgb(255, 255, 255);
                        --darkreader-inline-bgimage: initial;
                        --darkreader-inline-bgcolor: #181a1b;
                      "
                      data-darkreader-inline-bgimage=""
                      data-darkreader-inline-bgcolor=""
                    >
                      <div
                        style="
                          height: 1px;
                          max-width: 500px;
                          margin: auto;
                          background: rgb(234, 240, 246);
                          --darkreader-inline-bgimage: initial;
                          --darkreader-inline-bgcolor: #202325;
                        "
                        data-darkreader-inline-bgimage=""
                        data-darkreader-inline-bgcolor=""
                      ></div>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style="
                        background-color: rgb(255, 255, 255);
                        --darkreader-inline-bgcolor: #181a1b;
                      "
                      data-darkreader-inline-bgcolor=""
                    >
                      <table
                        role="presentation"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                        width="100%"
                        style="max-width: 500px; margin: auto"
                      >
                        <tbody></tbody>
                        <tbody>
                          <tr>
                            <td
                              style="
                                padding: 0;
                                font-family: sans-serif;
                                font-size: 14px;
                                line-height: 20px;
                                color: rgb(66, 91, 118);
                                --darkreader-inline-color: #97b0c5;
                              "
                              data-darkreader-inline-color=""
                            >
                              <h1
                                style="
                                  text-align: center;
                                  margin: 30px 0;
                                  font-family: 'Helvetica Neue', 'Lexend Deca',
                                    Arial, Helvetica, sans-serif;
                                  font-size: 24px;
                                  line-height: 30px;
                                  color: rgb(66, 91, 118);
                                  font-weight: bold;
                                  --darkreader-inline-color: #97b0c5;
                                "
                                data-darkreader-inline-color=""
                              >
                                Verify your email.
                              </h1>
                            </td>
                          </tr>
                          <tr
                            style="
                              width: 100vw;
                              max-width: 700px;
                              height: auto;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                            "
                          >
                          </tr>
                          <tr>
                            <td
                              style="
                                padding: 0;
                                font-family: 'Helvetica Neue', 'Lexend Deca',
                                  Arial, Helvetica, sans-serif;
                                font-size: 16px;
                                line-height: 24px;
                                color: rgb(66, 91, 118);
                                --darkreader-inline-color: #97b0c5;
                              "
                              data-darkreader-inline-color=""
                            >
                              <p style="text-align: center; margin: 0">
                                Click this button below to verify your
                                email: ${email}
                              </p>
              <p
              style="margin-left: auto; margin-right: auto; text-align: center; margin-top: 30px; margin-bottom: 30px;"
              >
                <a href="${process.env.FE_URL}/verify?v=${token}&e=${email}" 
                  style="display: inline-block; padding: 12px 20px; font-size: 16px; font-weight: bold; color: #ffffff; background-color: #FF7A59; text-decoration: none; border-radius: 5px; text-align: center;"
                
                >Verify Your Account</a>
              </p>
                              <p
                                style="
                                  margin: 10px 0 30px;
                                  font-size: 12px;
                                  line-height: 12px;
                                  text-decoration: none;
                                  display: block;
                                  text-align: center;
                                  color: rgb(81, 111, 144);
                                  --darkreader-inline-color: #88a4bc;
                                "
                                data-darkreader-inline-color=""
                              >
                                Verify Link will expire in 24 hours.
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td
                              aria-hidden="true"
                              height="50"
                              style="
                                font-size: 0;
                                line-height: 0;
                                display: block;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                display: none;
                                padding: 40px 60px 0;
                                font-family: 'Helvetica Neue', 'Lexend Deca',
                                  Arial, Helvetica, sans-serif;
                                font-size: 14px;
                                line-height: 24px;
                                color: rgb(45, 62, 80);
                                --darkreader-inline-color: #aec2d2;
                              "
                              data-darkreader-inline-color=""
                            ></td>
                          </tr>
                          <tr>
                            <td
                              aria-hidden="true"
                              height="50"
                              style="font-size: 0; line-height: 0"
                            >
                              &nbsp;
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                align="center"
                role="presentation"
                cellspacing="0"
                cellpadding="0"
                border="0"
                width="100%"
                style="margin: auto"
              >
                <tbody>
                  <tr>
                    <td
                      style="
                        padding: 20px 10%;
                        font-family: 'Helvetica Neue', 'Lexend Deca', Arial,
                          Helvetica, sans-serif;
                        font-size: 14px;
                        line-height: 24px;
                        text-align: center;
                        color: rgb(124, 152, 182);
                        --darkreader-inline-color: #83a1ba;
                      "
                      data-darkreader-inline-color=""
                    >
                      Not you? If you didn't request a verify to sign up for
                      Wliafdew File Manager, you can safely ignore this email. An account was
                      not created.
                    </td>
                  </tr>
                  <tr>
                    <td
                      style="
                        padding: 20px;
                        font-family: 'Helvetica Neue', 'Lexend Deca', Arial,
                          Helvetica, sans-serif;
                        font-size: 12px;
                        line-height: 24px;
                        text-align: center;
                        color: rgb(124, 152, 182);
                        --darkreader-inline-color: #83a1ba;
                      "
                      data-darkreader-inline-color=""
                    >
                      WliafDew, Inc.<br /><span
                        >72 Truong Quyen, 3nd Floor<br />Tp. Ho Chi Minh, VN
                        020319</span
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>
  `
}

